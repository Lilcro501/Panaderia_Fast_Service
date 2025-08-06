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

# Terceros
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

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
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            
            if not email or not password:
                return JsonResponse({'error': 'Por favor, ingrese correo y contraseña'}, status=400)

            try:
                usuario = Usuario.objects.get(email=email)
            except Usuario.DoesNotExist:
                return JsonResponse({'error': 'Correo no registrado'}, status=404)

            if check_password(password, usuario.password):
                refresh = RefreshToken.for_user(usuario)
                return JsonResponse({
                    'mensaje': 'Inicio de sesión exitoso',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'nombre': usuario.nombre,
                    'apellido': usuario.apellido,
                    'rol': usuario.rol,
                    'id_usuario': usuario.id_usuario,
                    'email': usuario.email
                }, status=200)
            else:
                return JsonResponse({'error': 'Credenciales inválidas'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de datos inválido'}, status=400)
        except Exception as e:
            print(f"❌ Error en login_usuario: {str(e)}")
            return JsonResponse({'error': 'Error interno del servidor'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)



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
@csrf_exempt
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
        except Exception as e:
            print(f"❌ Error al cambiar contraseña: {str(e)}")
            return JsonResponse({'error': 'Error interno del servidor'}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

###################################################################################

###################################################################################


@csrf_exempt
def login_google(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            token = data.get('token')

            if not token:
                return JsonResponse({'error': 'Token de Google no proporcionado'}, status=400)

            try:
                idinfo = id_token.verify_oauth2_token(token, google_requests.Request())
                email = idinfo['email']
                nombre = idinfo.get('given_name', '')
                apellido = idinfo.get('family_name', '')

                # Buscar o crear usuario
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

                # Generar los tokens JWT
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
                }, status=200)

            except ValueError:
                return JsonResponse({'error': 'Token de Google inválido'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato de datos inválido'}, status=400)
        except Exception as e:
            print(f"❌ Error al verificar el token de Google: {str(e)}")
            return JsonResponse({'error': 'Error interno del servidor'}, status=500)

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



