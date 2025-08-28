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
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMessage

from django.views.decorators.cache import cache_page
from django.core.cache import cache

from .models import Producto

from decimal import Decimal
from datetime import datetime
import json
import random

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
from .serializers import ProductoSerializer

# Utilidades
from .utils import enviar_factura_por_correo

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .permissions import EsAdmin, EsTrabajador, EsCliente


from django.contrib.auth.models import User


from rest_framework.response import Response
from django.core.mail import EmailMessage
from django.conf import settings

import traceback

#obtenemos el modelo de usuario que estamos utilzando con django
User = get_user_model()

#decorador para verificar que el usuario este autenticado
#metodo de seguridad
@require_http_methods(["POST"])

# Crea una factura
#en el proceso de la factura se ingresan los productos y se restan de los productos para tener estos al tanto de que se ingresen en la base de datos
#decorador para deshabilitar la proteccion contra ataques CSRF

@api_view(['POST'])
@permission_classes([IsAuthenticated, EsCliente])
def crear_factura(request):
    if request.method == 'POST':
        try:
            # Identificamos el usuario logueado
            usuario = request.user  
            # ---- Caso multipart/form-data ----
            if 'multipart/form-data' in request.content_type:
                metodo_pago = request.POST.get('metodo_pago')
                total = request.POST.get('total')
                direccion_entrega = request.POST.get('direccion_entrega')
                fecha_entrega = request.POST.get('fecha_entrega')
                notas = request.POST.get('informacion_adicional', '')
                metodo_entrega = request.POST.get('metodo_entrega', 'local')
                telefono_usuario = request.POST.get('telefono_usuario') or request.POST.get('telefono')

                productos = []
                i = 0
                while f'productos[{i}][id_producto]' in request.POST:
                    productos.append({
                        'id_producto': request.POST[f'productos[{i}][id_producto]'],
                        'cantidad': request.POST[f'productos[{i}][cantidad]'],
                    })
                    i += 1

                comprobante = request.FILES.get('comprobante')

            # ---- Caso JSON ----
            else:
                data = json.loads(request.body)
                metodo_pago = data.get('metodo_pago')
                total = data.get('total')
                direccion_entrega = data.get('direccion_entrega')
                fecha_entrega = data.get('fecha_entrega')
                notas = data.get('informacion_adicional', '')
                metodo_entrega = data.get('metodo_entrega', 'local')
                telefono_usuario = data.get('telefono_usuario') or data.get('telefono')
                productos = data.get('productos', [])
                comprobante = None

            print("📦 Datos recibidos para factura:")
            print("Usuario:", usuario.id, usuario.email)
            print("Teléfono:", telefono_usuario)
            print("Método pago:", metodo_pago)
            print("Total:", total)
            print("Dirección:", direccion_entrega)
            print("Fecha entrega:", fecha_entrega)
            print("Notas:", notas)
            print("Método entrega:", metodo_entrega)
            print("Productos:", productos)


            # ---- Guardar teléfono en el usuario ----
            if telefono_usuario:
                usuario.telefono = telefono_usuario
                usuario.save()

                usuario_refrescado = Usuario.objects.get(pk=usuario.pk)
                print(f"Teléfono guardado en DB: {usuario_refrescado.telefono}")

            # ---- Crear factura ----
            factura = Factura.objects.create(
                usuario=usuario,
                fecha=timezone.now(),
                metodo_pago=metodo_pago,
                total=Decimal(total),
                direccion_entrega=direccion_entrega,
                fecha_entrega=datetime.strptime(fecha_entrega, "%Y-%m-%d").date() if fecha_entrega else None,
                notas=notas,
                comprobante=comprobante,
                metodo_entrega=metodo_entrega
            )

            # Estado inicial
            EstadoFactura.objects.create(
                factura=factura,
                proceso_pedido="preparando",
                estado_pedido="por validar"
            )

            # ---- Registrar pedidos y actualizar stock ----
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
                    nombre_producto=producto_db.nombre,
                    precio_unitario=producto_db.precio,
                    cantidad=cantidad_comprada,
                    subtotal=subtotal,
                    factura=factura
                )

            # Enviar correo
            enviar_factura_por_correo(factura)

            return JsonResponse({
                'success': True,
                'factura_id': getattr(factura, 'id_factura', factura.id),
                'telefono_usuario': usuario.telefono,
                'message': 'Factura y pedidos registrados correctamente'
            }, status=201)

        except Exception as e:
            print("Error al crear factura:", e)
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)



#-----------------------------------------------------------------------------------------------------------------
#vista para obtener los productos por categoria
#obtenemos los productos segun el parametro del id que se pase de la categoria


api_view(['GET'])
@permission_classes([IsAuthenticated, EsAdmin])
def obtener_productos_por_categoria(request, categoria_nombre):
    try:
        categoria = Categoria.objects.get(nombre__iexact=categoria_nombre.strip())
        productos = Producto.objects.filter(id_categoria=categoria)

        data = [{
            'id': producto.id_producto,
            'nombre': producto.nombre,
            'precio': float(producto.precio),
            'descripcion': producto.descripcion,
            'imagen': producto.imagen,
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
@api_view(['GET'])
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
            'imagen': producto.imagen if producto.imagen else None,
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
class ComentarioDetalleView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Valoracion.objects.all()
    serializer_class = ValoracionSerializer
    lookup_field = 'pk'


# Mapeo de preguntas con emojis
PREGUNTAS = {
    "pregunta1": "⭐ Percepción general del servicio",
    "pregunta2": "🤝 Amabilidad y atención",
    "pregunta3": "🥐 Calidad del producto",
    "pregunta4": "⚡ Agilidad en tu pedido"
}

# Mapeo de calificaciones con emojis
CALIFICACIONES = {
    0: "😡 Muy mala",
    1: "🙁 Mala",
    2: "🙂 Buena",
    3: "🤩 Excelente"
}

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enviar_encuesta(request):
    try:
        usuario = request.user  
        user_email = usuario.email if usuario.is_authenticated else None

        data = request.data
        experiencia = data.get("experiencia", {})
        calificaciones = experiencia.get("calificaciones", {})
        respuestas = experiencia.get("respuestas", {})
        recomendacion = data.get("recomendacion", {})

        # Formatear calificaciones con emojis
        calificaciones_html = ""
        for key, valor in calificaciones.items():
            texto_pregunta = PREGUNTAS.get(key, key)
            calificaciones_html += f"""
            <tr>
              <td style="border:1px solid #ddd; background:#f9f9f9; width:50%;"><strong>{texto_pregunta}</strong></td>
              <td style="border:1px solid #ddd;">{CALIFICACIONES.get(valor, valor)}</td>
            </tr>
            """

        # Formatear respuestas de texto
        respuestas_html = ""
        for key, valor in respuestas.items():
            texto_pregunta = PREGUNTAS.get(key, key)
            respuestas_html += f"""
            <tr>
              <td style="border:1px solid #ddd; background:#f9f9f9; width:50%;"><strong>{texto_pregunta}</strong></td>
              <td style="border:1px solid #ddd;">{valor}</td>
            </tr>
            """

        mensaje_html = f"""
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Nueva Encuesta Recibida</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f8f5f2; font-family: Arial, sans-serif;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" 
                 style="border:1px solid #ddd; background-color:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Encabezado -->
            <tr style="background-color:#6F4E37; color:white;">
              <td align="center" style="padding:20px;">
                <h2 style="margin:0;">🥖 Nueva Encuesta Recibida</h2>
              </td>
            </tr>

            <!-- Datos de usuario -->
            <tr>
              <td style="padding:20px; color:#333; font-size:14px; line-height:1.6;">
                <p><strong>Usuario:</strong> {user_email or 'Anónimo'}</p>
              </td>
            </tr>

            <!-- Calificaciones -->
            <tr>
              <td style="padding:20px;">
                <h3 style="color:#6F4E37; margin-bottom:10px;">Calificaciones</h3>
                <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                  {calificaciones_html}
                </table>
              </td>
            </tr>

            <!-- Respuestas -->
            <tr>
              <td style="padding:20px;">
                <h3 style="color:#6F4E37; margin-bottom:10px;">Respuestas</h3>
                <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                  {respuestas_html}
                </table>
              </td>
            </tr>

            <!-- Recomendación -->
            <tr>
              <td style="padding:20px;">
                <h3 style="color:#6F4E37; margin-bottom:10px;">Recomendación</h3>
                <p><strong>Puntuación:</strong> {recomendacion.get('puntuacion')}</p>
                <p><strong>Comentario:</strong> {recomendacion.get('comentario')}</p>
              </td>
            </tr>

            <!-- Pie -->
            <tr>
              <td align="center" style="background-color:#f1f1f1; color:#777; padding:15px; font-size:12px;">
                Enviado automáticamente desde <strong>Panadería Fast Service</strong> ☕
              </td>
            </tr>
          </table>
        </body>
        </html>
        """

        destinatarios = ["fservice28.076@gmail.com"]

        email = EmailMessage(
            subject="Nueva encuesta recibida",
            body=mensaje_html,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=destinatarios,
            reply_to=[user_email] if user_email else None,
        )
        email.content_subtype = "html"
        email.send(fail_silently=False)

        return Response({"success": True, "message": "Encuesta enviada correctamente"})

    except Exception as e:
        tb = traceback.format_exc()
        print("Error en enviar_encuesta:", tb)
        return Response({"success": False, "error": str(e), "trace": tb}, status=400)





@api_view(["GET"])
@permission_classes([AllowAny])
def productos_aleatorios(request):
    """
    Retorna N productos aleatorios de la base de datos,
    excluyendo los que tienen stock = 0
    """
    cantidad = int(request.GET.get("cantidad", 10))  # cantidad opcional en query param
    
    # ✅ Filtramos solo productos disponibles
    productos = list(Producto.objects.filter(stock__gt=0))

    # ✅ Tomamos aleatoriamente la cantidad solicitada o el máximo disponible
    seleccionados = random.sample(productos, min(cantidad, len(productos)))

    serializer = ProductoSerializer(seleccionados, many=True)
    return Response(serializer.data)
