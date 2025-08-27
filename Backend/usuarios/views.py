# Estándar de Python
import json
import os
import random
from email.mime.image import MIMEImage

# Django
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model, login
from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import EmailMessage, EmailMultiAlternatives, send_mail
from django.http import JsonResponse
from django.utils import timezone
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt
from .utils import enviar_correo_bienvenida

# Terceros
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

import traceback
# Locales
from .models import CodigoVerificacion, Usuario
from .serializers import CustomTokenObtainPairSerializer
from .serializers import UsuarioSerializer

##################################################################################
# importamos el serializador
##################################################################################
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

###############################################################################

#Obtenemos el el modelo de usuario personalizado en la app
Usuario = get_user_model()

###############################################################################
#vista para registrar un usuario
###############################################################################

#Decorador para desactivar la seguridad contra el CRFS

#------------------------------------- VISTA DE REGISTRO DE USUARIO ---------------------------------

@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_usuario(request):
    #validar si el metodo de respuesta es un post
    if request.method == 'POST':
        try:
            #recibmos le cuerpo del JSON desde el front
            data = json.loads(request.body)
            #validamos de que los datos si llegaron correctamente
            print("🔥 Datos recibidos del front:", data)

            #validacion de correo electronico
            #validamos de que ese correo no este registrado, en tal caso de hacerlo devolvemos un error indicando de que ya existe
            if Usuario.objects.filter(email=data['email']).exists():
                return JsonResponse({'error': 'Correo ya registrado'}, status=400)
            #agreamos los campos al modelo de usuario para crearlo

            usuario = Usuario.objects.create_user(
                email=data['email'],
                password=data['password'],
                nombre=data.get('nombre', ''),
                apellido=data.get('apellido', ''),
                telefono=data.get('telefono', ''),
                rol=data.get('rol', 'cliente'),
                fecha_registro=now()
            )
            
            
            enviar_correo_bienvenida(usuario)

            # Emitir JWT
            #generamos tokens para el usuario recien creado utilizando  RefreshToken.for_user
            refresh = RefreshToken.for_user(usuario)
            #devolvemos un mensjae inidjcando de que se creo el usuario correctamente
            return JsonResponse({
                'mensaje': 'Usuario creado exitosamente',
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=201)
        #manejo de exepciones
        except Exception as e:
            print("❌ Error en registrar_usuario:", str(e))
            return JsonResponse({'error': str(e)}, status=500)
    #retornamos un json en tal caso de que haya un error
    return JsonResponse({'error': 'Método no permitido'}, status=405)



#------------------------vista para iniciar sesion---------------------------


#Decorador para desactivar la seguridad CRFS
#------------------------vista para iniciar sesion---------------------------

@api_view(['POST'])
@permission_classes([AllowAny])
def login_usuario(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Por favor, ingrese correo y contraseña'}, status=400)

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response({'error': 'Correo no registrado'}, status=404)

        if not check_password(password, usuario.password):
            return Response({'error': 'Contraseña incorrecta'}, status=401)

        # Generar tokens JWT
        refresh = RefreshToken.for_user(usuario)
        access_token = str(refresh.access_token)

        # Enviar refresh token en cookie HttpOnly
        response = Response({
            'mensaje': 'Inicio de sesión exitoso',
            'access': access_token,
            'nombre': usuario.nombre,
            'apellido': usuario.apellido,
            'rol': usuario.rol,
            'id_usuario': usuario.id_usuario,
            'email': usuario.email
        }, status=200)

        # Cookie HttpOnly
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,  # True si es HTTPS
            samesite='Lax', 
            max_age=7*24*60*60  # opcional, duración 7 días
        )

        return response

    except Exception as e:
        return Response({'error': f'Error interno del servidor: {str(e)}'}, status=500)

#----------------------------vista para enviar el codigo de verificacion-----------------------------------------

@csrf_exempt
def enviar_codigo_verificacion(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({'error': 'El correo es obligatorio'}, status=400)

            # ✅ Validar si el correo está registrado en la base de datos
            if not Usuario.objects.filter(email=email).exists():
                return JsonResponse({'error': 'El correo no está registrado'}, status=404)

            # Generar código aleatorio de 4 dígitos
            codigo = ''.join([str(random.randint(0, 9)) for _ in range(4)])
            
            # Guardar código en base de datos
            CodigoVerificacion.objects.create(email=email, codigo=codigo)

            # HTML del correo
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #333;">Verificación de Cuenta</h2>
                        <p>Hola, de parte de la panadería Fast Service:</p>
                        <p>Tu código de verificación es:</p>
                        <h1 style="color: #007bff; letter-spacing: 4px;">{codigo}</h1>
                        <p>Por favor, usa este código para completar tu proceso de verificación.</p>
                        <p style="color: #888; font-size: 0.9em;">Este código es válido por un tiempo limitado.</p>
                        <br>
                        <p>Gracias por usar nuestro servicio.</p>
                        <p>— Equipo de Panadería Fast Service</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <img src="cid:logo_fast_service" alt="Panadería Logo" style="width: 120px;" />
                        </div>
                    </div>
                </body>
            </html>
            """

            # Crear y enviar el correo
            correo = EmailMultiAlternatives(
                subject='Código de Verificación',
                body='Tu código de verificación está en el mensaje HTML.',
                from_email='tu_correo@gmail.com',  # Cambia esto por el correo real del remitente
                to=[email],
            )
            correo.attach_alternative(html_content, "text/html")

            # Adjuntar imagen del logo
            ruta_imagen = os.path.join(settings.MEDIA_ROOT, 'logo_header.png')
            with open(ruta_imagen, 'rb') as img:
                imagen = MIMEImage(img.read())
                imagen.add_header('Content-ID', '<logo_fast_service>')
                imagen.add_header("Content-Disposition", "inline", filename="logo_header.png")
                correo.attach(imagen)

            correo.send()
            return JsonResponse({'mensaje': 'Código enviado'}, status=200)

        except Exception as e:
            print("❌ Error al enviar código:", e)
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


##################################################################################
#vista para verificar el codigo
##################################################################################

@api_view(['POST'])
@permission_classes([AllowAny])
def verificar_codigo(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            codigo = data.get('codigo')

            if not email or not codigo:
                return JsonResponse({'error': 'Por favor, ingrese correo y código de verificación'}, status=400)

            try:
                verificacion = CodigoVerificacion.objects.get(
                    email=email,
                    codigo=codigo,
                    usado=False
                )
                verificacion.usado = True
                verificacion.save(update_fields=['usado'])
                return JsonResponse({'mensaje': 'Código verificado correctamente'}, status=200)

            except CodigoVerificacion.DoesNotExist:
                return JsonResponse({'error': 'Código incorrecto o ya usado'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de datos inválido'}, status=400)
        except Exception as e:
            print(f"❌ Error en verificación: {str(e)}")
            return JsonResponse({'error': 'Error interno del servidor'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

##################################################################################
#vista para cambiar el password del usuario
##################################################################################
@permission_classes([AllowAny])
def cambiar_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            nueva_password = data.get('nueva_password')

            if not email or not nueva_password:
                return JsonResponse({'error': 'Por favor, ingrese correo y nueva contraseña'}, status=400)

            if len(nueva_password) < 8:
                return JsonResponse({'error': 'La contraseña debe tener al menos 8 caracteres'}, status=400)

            try:
                usuario = Usuario.objects.get(email=email)
                usuario.password = make_password(nueva_password)
                usuario.save(update_fields=['password'])
                return JsonResponse({'mensaje': 'Contraseña actualizada correctamente'}, status=200)

            except Usuario.DoesNotExist:
                return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de datos inválido'}, status=400)
        except ValueError as e:
            print(f"❌ Error de validación de token Google: {str(e)}")
            return JsonResponse({'error': f'Token de Google inválido: {str(e)}'}, status=401)


    return JsonResponse({'error': 'Método no permitido'}, status=405)

###################################################################################

###################################################################################

CLIENT_ID = "tu-client-id.apps.googleusercontent.com"
@csrf_exempt
@api_view(['POST'])
def login_google(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            token = data.get('token')

            if not token:
                return JsonResponse({'error': 'Token de Google no proporcionado'}, status=400)

            try:
                # Aquí usamos el CLIENT_ID exacto que pusiste en React
                idinfo = id_token.verify_oauth2_token(
                    token,
                    google_requests.Request(),
                    settings.GOOGLE_CLIENT_ID
                )

                email = idinfo['email']
                nombre = idinfo.get('given_name', '')
                apellido = idinfo.get('family_name', '')

                usuario, creado = Usuario.objects.get_or_create(
                    email=email,
                    defaults={
                        'nombre': nombre,
                        'apellido': apellido,
                        'telefono': '',
                        'rol': 'cliente',
                        'fecha_registro': now(),
                        'is_active': True,
                        'is_staff': False,
                    }
                )

                refresh = RefreshToken.for_user(usuario)

                return JsonResponse({
                    'mensaje': 'Inicio de sesión con Google exitoso',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'nombre': usuario.nombre,
                    'apellido': usuario.apellido,
                    'rol': usuario.rol,
                    'id_usuario': usuario.id_usuario,
                    'email': usuario.email
                })

            except ValueError as e:
                print(f"❌ Error validando token Google: {e}")
                return JsonResponse({'error': f'Token inválido: {e}'}, status=401)

        except Exception as e:
            print(f"❌ Error en login_google: {e}")
            return JsonResponse({'error': 'Error interno'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


#----------------------------- Vista para actualizar  y obtener los datos del usuario -----------------------------



class UsuarioDetalleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)

    def put(self, request):
        usuario = request.user
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_usuario(request, id_usuario):
    try:
        usuario = Usuario.objects.get(pk=id_usuario)
        usuario.delete()
        return Response({'mensaje': 'Usuario eliminado correctamente'}, status=200)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)
    except Exception as e:
        print("❌ Error al eliminar usuario:", str(e))
        return Response({'error': 'Error interno del servidor'}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"mensaje": "Cierre de sesión exitoso"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


###################################################################################
# formulario de reclamo /manifiesto consumidor/
###################################################################################

@api_view(['POST'])
@permission_classes([AllowAny])
def enviar_manifiesto_consumidor(request):
    try:
        usuario = request.user  
        user_email = usuario.email if usuario.is_authenticated else None

        data = request.data
        nombres = data.get("Nombres")
        telefono = data.get("telefono")
        tipo_documento = data.get("tipo_documento")
        numero_documento = data.get("numero_documento")
        email = data.get("email")
        direccion = data.get("direccion")
        descripcion = data.get("descripcion")
        solucion = data.get("solucion")
        comprobante = request.FILES.get("comprobante")  # archivo adjunto

        mensaje_html = f"""
        <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Manifiesto del consumidor</title>
</head>
<body style="margin:0; padding:0; background-color:#f3e5d7; font-family: Arial, sans-serif;">

  <table align="center" width="600" cellpadding="0" cellspacing="0" style="border:1px solid #ddd; background-color:#ffffff; border-radius:10px; overflow:hidden;">
    
    <!-- Encabezado con logo -->
    <tr style="background-color:#5c4033; color:white;">
      <td align="center" style="padding:20px;">
        <h2 style="margin:0;">Panadería La Orquídea</h2>
      </td>
    </tr>

    <!-- Título -->
    <tr>
      <td align="center" style="padding:20px; background-color:#d7ccc8;">
        <h3 style="margin:0; color:#3e2723;">📋 Manifiesto del consumidor reclamante</h3>
      </td>
    </tr>

    <!-- Contenido -->
    <tr>
      <td style="padding:20px; color:#3e2723; font-size:14px; line-height:1.6;">
        <p><strong>Nombre y Apellidos:</strong> {nombres}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>
        <p><strong>Tipo de Documento:</strong> {tipo_documento}</p>
        <p><strong>N° Documento:</strong> {numero_documento}</p>
        <p><strong>Correo:</strong> {email}</p>
        <p><strong>Dirección:</strong> {direccion}</p>

        <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">

        <p><strong>Descripción del problema:</strong></p>
        <p style="background:#f9f5f0; padding:10px; border-left:4px solid #8d6e63;">{descripcion}</p>

        <p><strong>Solución esperada:</strong></p>
        <p style="background:#f9f5f0; padding:10px; border-left:4px solid #5c4033;">{solucion}</p>
      </td>
    </tr>

    <!-- Pie -->
    <tr>
      <td align="center" style="background-color:#8d6e63; color:white; padding:15px; font-size:12px;">
        © 2025 Panadería La Orquídea - Todos los derechos reservados
      </td>
    </tr>
  </table>

</body>
</html>

        """

        destinatarios = ["fservice28.076@gmail.com"]

        email_obj = EmailMessage(
            subject="Nuevo Manifiesto del Consumidor",
            body=mensaje_html,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=destinatarios,
            reply_to=[user_email] if user_email else None,
        )
        email_obj.content_subtype = "html"

        # Adjuntar comprobante si lo hay
        if comprobante:
            email_obj.attach(comprobante.name, comprobante.read(), comprobante.content_type)

        email_obj.send(fail_silently=False)

        return Response({"success": True, "message": "Manifiesto enviado correctamente"})

    except Exception as e:
        tb = traceback.format_exc()
        print("Error en enviar_manifiesto_consumidor:", tb)
        return Response({"success": False, "error": str(e), "trace": tb}, status=400)