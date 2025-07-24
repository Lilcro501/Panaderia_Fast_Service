from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.dateparse import parse_date, parse_time
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import permissions



from decimal import Decimal
from datetime import datetime
import json

# Django REST Framework
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# Modelos
from .models import Factura, Pedido, Producto, Categoria, Favorito
from usuarios.models import Usuario
from . models import Valoracion

# Serializadores
from .serializers import FavoritoSerializer
from .serializers import ValoracionSerializer

# Utilidades
from .utils import enviar_factura_por_correo



User = get_user_model()

@require_http_methods(["POST"])

# Crea una factura
#en el proceso de la factira se ingresan los productos y se restan de los productos para tener estos al tanto de que se ingresen en la base de datos
@csrf_exempt
def crear_factura(request):
    if request.method == 'POST':
        try:
            if 'multipart/form-data' in request.content_type:
                usuario_id = request.POST.get('id_usuario')
                metodo_pago = request.POST.get('metodo_pago')
                total = request.POST.get('total')
                direccion_entrega = request.POST.get('direccion_entrega')
                fecha_entrega = request.POST.get('fecha_entrega')
                notas = request.POST.get('informacion_adicional', '')
                metodo_entrega = request.POST.get('metodo_entrega', 'local')

                productos = []
                i = 0
                while f'productos[{i}][id_producto]' in request.POST:
                    productos.append({
                        'id_producto': request.POST[f'productos[{i}][id_producto]'],
                        'cantidad': request.POST[f'productos[{i}][cantidad]'],
                    })
                    i += 1

                comprobante = request.FILES.get('comprobante')

            else:
                data = json.loads(request.body)
                usuario_id = data.get('id_usuario')
                metodo_pago = data.get('metodo_pago')
                total = data.get('total')
                direccion_entrega = data.get('direccion_entrega')
                fecha_entrega = data.get('fecha_entrega')
                notas = data.get('informacion_adicional', '')
                metodo_entrega = data.get('metodo_entrega', 'local')
                productos = data.get('productos', [])
                comprobante = None

            if not usuario_id:
                return JsonResponse({'error': 'ID de usuario no recibido'}, status=400)

            usuario = Usuario.objects.get(id_usuario=usuario_id)

            factura = Factura.objects.create(
                usuario=usuario,
                fecha=timezone.now(),
                metodo_pago=metodo_pago,
                total=Decimal(total),
                direccion_entrega=direccion_entrega,
                fecha_entrega=datetime.strptime(fecha_entrega, "%Y-%m-%d").date(),
                notas=notas,
                comprobante=comprobante,
                metodo_entrega=metodo_entrega
            )

            for producto in productos:
                id_producto = int(producto['id_producto'])
                cantidad_comprada = int(producto['cantidad'])

                producto_db = Producto.objects.get(id_producto=id_producto)

                if producto_db.stock < cantidad_comprada:
                    return JsonResponse({
                        'error': f'Stock insuficiente para el producto \"{producto_db.nombre}\"'
                    }, status=400)

                producto_db.stock -= cantidad_comprada
                producto_db.save()

                subtotal = producto_db.precio * cantidad_comprada

                Pedido.objects.create(
                    producto=producto_db,
                    cantidad=cantidad_comprada,
                    subtotal=subtotal,
                    factura=factura
                )

            # Envía el correo después de crear los pedidos
            enviar_factura_por_correo(factura)

            return JsonResponse({
                'success': True,
                'factura_id': factura.id,
                'message': 'Factura y pedidos registrados correctamente'
            }, status=201)

        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
        except Producto.DoesNotExist:
            return JsonResponse({'error': 'Producto no encontrado'}, status=404)
        except Exception as e:
            print("⚠️ Error al crear factura:", e)
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


###########################################################################
#obtenemos los productos segun el parametro del id que se pase de la categoria

def obtener_productos_por_categoria(request, categoria_nombre):
    try:
        categoria = Categoria.objects.get(nombre__iexact=categoria_nombre)
        productos = Producto.objects.filter(id_categoria=categoria)

        data = []
        for producto in productos:
            data.append({
                'id': producto.id_producto,
                'nombre': producto.nombre,
                'precio': float(producto.precio),
                'descripcion': producto.descripcion,
                'imagen': f'/media/{producto.imagen}',
                'fecha_vencimiento': str(producto.fecha_vencimiento),
                'stock': producto.stock,
            })

        return JsonResponse(data, safe=False)
    
    except Categoria.DoesNotExist:
        return JsonResponse({'error': 'Categoría no encontrada'}, status=404)


#registra el pedido en la base de datos, que se realiza en el carrito de compras, y actualiza el stock del producto, y envia la factura por correo electronico
@csrf_exempt
def registrar_pedido(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            pedidos = data.get('pedidos', [])  # Lista de pedidos
            factura_id = data.get('factura_id')

            for item in pedidos:
                id_producto = item.get('id_producto')
                cantidad = item.get('cantidad')

                # Verificar existencia del producto
                producto = Producto.objects.get(id_producto=id_producto)

                if producto.stock < cantidad:
                    return JsonResponse({'error': f'Stock insuficiente para el producto ID {id_producto}'}, status=400)

                # Registrar pedido
                Pedido.objects.create(
                    id_producto=id_producto,
                    cantidad=cantidad,
                    facturas_id_factura=factura_id
                )

                # Actualizar el stock del producto
                producto.stock -= cantidad
                producto.save()

            return JsonResponse({'message': 'Pedidos registrados correctamente'}, status=201)

        except Producto.DoesNotExist:
            return JsonResponse({'error': 'Producto no encontrado'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


# Obtenermos el producto por id para poder tener los detalles del producto en el carrito de compras, a difencia de la funcion anterior, que obtiene todos los productos de una categoria en especifico
@csrf_exempt
def obtener_producto_por_id(request, id):
    try:
        # Busca explícitamente por id_producto (primary key)
        producto = Producto.objects.get(id_producto=id)
        
        producto_data = {
            'id_producto': producto.id_producto,  # Mantén la nomenclatura consistente
            'nombre': producto.nombre,
            'precio': float(producto.precio),
            'descripcion': producto.descripcion,
            'imagen': producto.imagen.url if producto.imagen else None,
            'fecha_vencimiento': producto.fecha_vencimiento.isoformat() if producto.fecha_vencimiento else None,
            'stock': producto.stock,
            'categoria': producto.id_categoria.nombre  # Incluye datos relacionados
        }
        return JsonResponse(producto_data)
    
    except Producto.DoesNotExist:
        return JsonResponse({'error': 'Producto no encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# Vista para listar y crear favoritos


class ListaCrearFavoritos(generics.ListCreateAPIView):
    serializer_class = FavoritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class EliminarFavorito(generics.DestroyAPIView):
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user)  # ✅ Filtra solo los favoritos del usuario


#vistas para los comentarios 


# Obtener comentarios de un producto específico
class ComentariosPorProductoView(generics.ListAPIView):
    serializer_class = ValoracionSerializer

    def get_queryset(self):
        producto_id = self.kwargs['producto_id']
        return Valoracion.objects.filter(id_producto_id=producto_id).order_by('-fecha_valoracion')

# Crear un nuevo comentario (requiere autenticación)
class CrearComentarioView(generics.CreateAPIView):
    serializer_class = ValoracionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(id_usuario=self.request.user)
