#----------------Importaciones ----------------------

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
from rest_framework import permissions

# Modelos
from .models import Factura, Pedido, Producto, Categoria, Favorito
from usuarios.models import Usuario
from . models import Valoracion
from trabajador.models import EstadoFactura

# Serializadores
from .serializers import FavoritoSerializer
from .serializers import ValoracionSerializer

# Utilidades
from .utils import enviar_factura_por_correo


#obtenemos el modelo de usuario que estamos utilzando con django
User = get_user_model()

#decorador para verificar que el usuario este autenticado
#metodo de seguridad
@require_http_methods(["POST"])

# Crea una factura
#en el proceso de la factura se ingresan los productos y se restan de los productos para tener estos al tanto de que se ingresen en la base de datos
#decorador para deshabilitar la proteccion contra ataques CSRF
@csrf_exempt
def crear_factura(request):
    #metodo de respuesta en este cao es post
    if request.method == 'POST':
        try:
            #verificamos el tipo de contenido de la solicitud, si es multipart/form-data es porque viene del formulario de la pagina web, validamos si se esta enviando un comprobante junto a los datos del formulario
            if 'multipart/form-data' in request.content_type:
                # Obténemos los datos de la solicitud que hace el formulario 
                usuario_id = request.POST.get('id_usuario')
                metodo_pago = request.POST.get('metodo_pago')
                total = request.POST.get('total')
                direccion_entrega = request.POST.get('direccion_entrega')
                fecha_entrega = request.POST.get('fecha_entrega')
                notas = request.POST.get('informacion_adicional', '')
                metodo_entrega = request.POST.get('metodo_entrega', 'local')

                # Creamos una lista vacia para que se almacenen los productos quue llegan en la soliciud, estos se guardan como diccionarios en la lista productos
                productos = []
                i = 0
                while f'productos[{i}][id_producto]' in request.POST:
                    productos.append({
                        'id_producto': request.POST[f'productos[{i}][id_producto]'],
                        'cantidad': request.POST[f'productos[{i}][cantidad]'],
                    })
                    i += 1
                #obtenemos el comprobante de pago si lo hay
                comprobante = request.FILES.get('comprobante')
            # en tal caso de qie no venga el comprobante de pago, se obtienen los datos de la solicitud que viene en formato json
            else:
                # Parseamos los datos JSON de la solicitud
                data = json.loads(request.body)
                #obtenemos los valores de la solicitud que esta realizando el frontend
                usuario_id = data.get('id_usuario')
                metodo_pago = data.get('metodo_pago')
                total = data.get('total')
                direccion_entrega = data.get('direccion_entrega')
                fecha_entrega = data.get('fecha_entrega')
                notas = data.get('informacion_adicional', '')
                metodo_entrega = data.get('metodo_entrega', 'local')
                #obtenemos los productos que se van a comprar
                productos = data.get('productos', [])
                #el comprobante de pago no viene en la solicitud
                comprobante = None

            # validamos que si se haya recibido el id del usuario, en tal caso de que no lo haya encintrado lanzara un eror  400(Bad request)  
            if not usuario_id:
                return JsonResponse({'error': 'ID de usuario no recibido'}, status=400)
            #obtenemos el usuario correspondiente al id que se le paso en la solicitud
            usuario = Usuario.objects.get(id_usuario=usuario_id)
            #creamos la factura 
            #llamando el modelo y alamcenadolo como un objeto
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

            EstadoFactura.objects.create(
                factura=factura,
                estado_pago="pendiente",
                proceso_pedido="preparando"
            )
            #procesamos los productos que se van a comprar
            for producto in productos:
                #obtenemos el id del producto
                id_producto = int(producto['id_producto'])
                #obtenemos la cantidad de productos que se van a comprar
                cantidad_comprada = int(producto['cantidad'])
                #obtenemos el id del producto correspondiete el al que se envio en la solicitud
                producto_db = Producto.objects.get(id_producto=id_producto)
                # Verificar si hay suficiente stock
                if producto_db.stock < cantidad_comprada:
                    return JsonResponse({
                        #lanzamos un mensaje de erorr en tal caso de que la cantidad sea mayor al stock que hay en la base de datos
                        'error': f'Stock insuficiente para el producto \"{producto_db.nombre}\"'
                    }, status=400)
                #restamos la cantidad comprada en el stock por la cantidad comprada
                producto_db.stock -= cantidad_comprada
                #guardamos los cambios en la base de datos
                producto_db.save()
                #obtenemos el subttoal del producto
                subtotal = producto_db.precio * cantidad_comprada

                #creamos el pedido
                Pedido.objects.create(
                    producto=producto_db,
                    cantidad=cantidad_comprada,
                    subtotal=subtotal,
                    factura=factura
                )

            # Envíamos el correo despues de crear la factura
            enviar_factura_por_correo(factura)

            return JsonResponse({
                'success': True,
                'factura_id': factura.id,
                'message': 'Factura y pedidos registrados correctamente'
            }, status=201)
        #manejo de errores
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
        except Producto.DoesNotExist:
            return JsonResponse({'error': 'Producto no encontrado'}, status=404)
        except Exception as e:
            print("⚠️ Error al crear factura:", e)
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


#-----------------------------------------------------------------------------------------------------------------
#vista para obtener los productos por categoria
#obtenemos los productos segun el parametro del id que se pase de la categoria


def obtener_productos_por_categoria(request, categoria_nombre):
    try:
        categoria = Categoria.objects.get(nombre__iexact=categoria_nombre.strip())
        productos = Producto.objects.filter(id_categoria=categoria)

        data = [{
            'id': producto.id_producto,
            'nombre': producto.nombre,
            'precio': float(producto.precio),
            'descripcion': producto.descripcion,
            'imagen': f'/media/{producto.imagen}',
            'fecha_vencimiento': str(producto.fecha_vencimiento),
            'stock': producto.stock,
        } for producto in productos]

        return JsonResponse(data, safe=False)
    
    except Categoria.DoesNotExist:
        return JsonResponse({'error': 'Categoría no encontrada'}, status=404)



#------------------------------------------------------------------------------------------------
#obtenemos lod productos por id
# Obtenermos el producto por id para poder tener los detalles del producto en el carrito de compras, a difencia de la funcion anterior, que obtiene todos los productos de una categoria en especifico
#decorador para deshabilitar la proteccion contra ataques CSRF
@csrf_exempt
#
def obtener_producto_por_id(request, id):
    #manejo de exepciones
    try:
        # Busca explícitamente por id_producto (primary key)
        producto = Producto.objects.get(id_producto=id)
        #obtenemos los valores de ese producto en especifico segun el id
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
        #devolvemos una respuesta json con el producto
        return JsonResponse(producto_data)
    #manejp de expeciones
    except Producto.DoesNotExist:
        return JsonResponse({'error': 'Producto no encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

#---------------------------------------------------
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
        return Favorito.objects.filter(usuario=self.request.user)  

#vistas para los comentarios 
# Obtener comentarios de un producto específico
#Definimos la clase, que hereda generics.ListAPIView, que es una vista genérica que proporciona una lista de objetos.
# se especializa paara manejar solicitudes GET.
#proporcionar paginacion automatica, implementar filtro basicos

class ComentariosPorProductoView(generics.ListAPIView):
    #especificamos el serializador que se va a utilizar para serializar los objetos
    serializer_class = ValoracionSerializer
    #extraemos el parametro de id_producto realizando una filtracion en las valoraciones
    def get_queryset(self):
        producto_id = self.kwargs['producto_id']
        #ordenamos por fecha de valoracion 
        return Valoracion.objects.filter(id_producto_id=producto_id).order_by('-fecha_valoracion')

# Crear un nuevo comentario
#creamos una api para qeu se manejen solicitudes tipo POST
class CrearComentarioView(generics.CreateAPIView):
    #llamamos al serializador que se va a utilzar
    serializer_class = ValoracionSerializer
    #validamos si esta autenticado el usuario
    permission_classes = [permissions.IsAuthenticated]
    #customizacion del guardado, para  que se llene el id_usario con la valoracion (serializer) sin necesidad de soliictarlo desde el font
    def perform_create(self, serializer):
        serializer.save(id_usuario=self.request.user)

#----------------------------------------------------------------------------------------------------------
