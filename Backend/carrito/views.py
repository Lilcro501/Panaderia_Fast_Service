from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.dateparse import parse_date, parse_time
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import get_user_model


from decimal import Decimal
from datetime import datetime
import json

# Django REST Framework
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# Modelos
from .models import Factura, Pedido, Producto, Categoria, Favorito
from usuarios.models import Usuario

# Serializadores
from .serializers import FavoritoSerializer

# Utilidades
from .utils import enviar_factura_por_correo


User = get_user_model()

@require_http_methods(["POST"])

@csrf_exempt
def crear_factura(request):
    if request.method == 'POST':
        try:
            # Procesar datos del formulario
            if 'multipart/form-data' in request.content_type:
                usuario_id = request.POST.get('id_usuario')
                metodo_pago = request.POST.get('metodo_pago')
                total = request.POST.get('total')
                direccion_entrega = request.POST.get('direccion_entrega')
                fecha_entrega = request.POST.get('fecha_entrega')
                notas = request.POST.get('informacion_adicional', '')

                # Leer productos de FormData
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
                # Para pruebas JSON
                data = json.loads(request.body)
                usuario_id = data.get('id_usuario')
                metodo_pago = data.get('metodo_pago')
                total = data.get('total')
                direccion_entrega = data.get('direccion_entrega')
                fecha_entrega = data.get('fecha_entrega')
                notas = data.get('informacion_adicional', '')
                productos = data.get('productos', [])
                comprobante = None

            # Validación
            if not usuario_id:
                return JsonResponse({'error': 'ID de usuario no recibido'}, status=400)

            usuario = Usuario.objects.get(id_usuario=usuario_id)

            # Crear factura
            factura = Factura.objects.create(
                usuario=usuario,
                fecha=timezone.now(),
                metodo_pago=metodo_pago,
                total=Decimal(total),
                direccion_entrega=direccion_entrega,
                fecha_entrega=datetime.strptime(fecha_entrega, "%Y-%m-%d").date(),
                notas=notas,
                comprobante=comprobante
            )

            # Crear registros en pedido (uno por producto)
            for producto in productos:
                Pedido.objects.create(
                    id_producto=int(producto['id_producto']),
                    cantidad=int(producto['cantidad']),
                    facturas_id_factura=factura.id
                )

            return JsonResponse({
                'success': True,
                'factura_id': factura.id,
                'message': 'Factura y pedidos registrados correctamente'
            }, status=201)

        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


###########################################################################

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user, activo=True)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class EliminarFavorito(generics.DestroyAPIView):
    queryset = Favorito.objects.all()
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user)
