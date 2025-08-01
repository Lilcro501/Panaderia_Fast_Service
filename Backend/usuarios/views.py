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
# Locales
from .models import CodigoVerificacion, Usuario
from .serializers import CustomTokenObtainPairSerializer


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

# Decorador para desactivar la seguridad CSRF
@csrf_exempt
@api_view(['POST'])
def login_usuario(request):
    # Definimos el tipo de solicitud
    if request.method == 'POST':
        try:
            # Cargamos el JSON que se envió desde el front
            data = json.loads(request.body)
            # Imprimimos los datos para validar que datos se están ingresando
            print("Email:", data.get('email'))
            print(" Password:", data.get('password'))

            # Obtenemos el email y la password de la data 
            email = data.get('email')
            password = data.get('password')
            
            # Validación de que sí se hayan recibido ambos campos
            if not email or not password:
                return JsonResponse({'error': 'Faltan datos'}, status=400)

            try:
                usuario = Usuario.objects.get(email=email)
            except Usuario.DoesNotExist:
                return JsonResponse({'error': 'Correo no registrado'}, status=404)

            if check_password(password, usuario.password):
                # Generamos tokens para el usuario utilizando RefreshToken.for_user
                refresh = RefreshToken.for_user(usuario)

                # ✅ Retornamos todos los datos necesarios, incluyendo el id del usuario
                return JsonResponse({
                    'mensaje': 'Inicio de sesión exitoso',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'nombre': usuario.nombre,
                    'rol': usuario.rol,
                    'id_usuario': usuario.id_usuario
                }, status=200)
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)

        except Exception as e:
            print("❌ Error en login_usuario:", e)
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)



#----------------------------vista para enviar el codigo de verificacion-----------------------------------------

#decorador para desacrtivar la seguiridad
@csrf_exempt
#----------------------------------------- vista para enviar el digo de verificacion al usuario ------------------------------
def enviar_codigo_verificacion(request):
    #definir el metodo de la respuesta 
    if request.method == 'POST':
        try:
            #cargar el arrchivo json desde el frot
            data = json.loads(request.body)
            #obtener el valor de email
            email = data.get('email')
            #si no se ingresa un email valido
            if not email:
                #retornar un erorr en tal caso de que no se ingrese el correo
                return JsonResponse({'error': 'El correo es obligatorio'}, status=400)

            # Generar código aleatorio de 4 dígitos
            codigo = ''.join([str(random.randint(0, 9)) for _ in range(4)])
            
            # Guardar en base de datos
            CodigoVerificacion.objects.create(email=email, codigo=codigo)

            # Cuerpo HTML del mensaje
            #estructura del html para enviar el mensaje
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
                        <!-- Imagen centrada al final -->
                        <div style="text-align: center; margin-top: 30px;">
                            <img src="cid:logo_fast_service" alt="Panadería Logo" style="width: 120px;" />
                        </div>
                    </div>
                </body>
            </html>
            """

            # Crear el correo con HTML embebido
            #este permite enciar correos electronicos en formato html
            correo = EmailMultiAlternatives(
                subject='Código de Verificación',
                body='Tu código de verificación está en el mensaje HTML.',
                from_email='tu_correo@gmail.com',
                to=[email],
            )
            #adjuntamos el html al correo electronicp
            correo.attach_alternative(html_content, "text/html")

            # Adjuntar la imagen desde media/logo_header.png
            #Abrimos la imagen y la adjuntamos en en el html
            ruta_imagen = os.path.join(settings.MEDIA_ROOT, 'logo_header.png')
            with open(ruta_imagen, 'rb') as img:
                imagen = MIMEImage(img.read())
                imagen.add_header('Content-ID', '<logo_fast_service>')  # Usado en el src: cid:...
                imagen.add_header("Content-Disposition", "inline", filename="logo_header.png")
                correo.attach(imagen)
            #enviamos el correo electronico
            correo.send()
            #retornamos el mensaje de exito al momento de enviar el correo electronico
            return JsonResponse({'mensaje': 'Código enviado'}, status=200)
        #exepcion en tal caso de mostar un errror al momento de enviar el correo electronico
        except Exception as e:
            #mostrar menaje en la consola
            print("❌ Error al enviar código:", e)
            #retornar con un mennaje de error en el front
            return JsonResponse({'error': str(e)}, status=500)
    #retornar en en el front en tal caso de un metdo invalido
    return JsonResponse({'error': 'Método no permitido'}, status=405)

##################################################################################
#vista para verificar el codigo
##################################################################################

@csrf_exempt
def verificar_codigo(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            codigo = data.get('codigo')

            print("Verificando código:", codigo, "para", email)

            if not email or not codigo:
                return JsonResponse({'error': 'Datos incompletos'}, status=400)

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

        except Exception as e:
            print("❌ Error en verificación:", e)
            return JsonResponse({'error': str(e)}, status=500)

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
                return JsonResponse({'error': 'Datos incompletos'}, status=400)

            try:
                usuario = Usuario.objects.get(email=email)
            except Usuario.DoesNotExist:
                return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

            # Hashear la nueva contraseña
            usuario.password = make_password(nueva_password)
            usuario.save()

            return JsonResponse({'mensaje': 'Contraseña actualizada correctamente'}, status=200)

        except Exception as e:
            print("❌ Error al cambiar contraseña:", e)
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


###################################################################################
#
###################################################################################

@csrf_exempt
def login_google(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            token = data.get('token')

            if not token:
                return JsonResponse({'error': 'Token no proporcionado'}, status=400)

            # Verificar y decodificar el token
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request())
            print("🔎 idinfo:", idinfo)


            email = idinfo['email']
            nombre = idinfo.get('given_name', '')
            apellido = idinfo.get('family_name', '')

            # Buscar o crear usuario
            usuario, creado = Usuario.objects.get_or_create(
                email=email,
                defaults={
                    'nombre_usuario': email.split('@')[0],
                    'nombre': nombre,
                    'apellido': apellido,
                    'telefono': '',
                    'rol': 'cliente',
                    'fecha_registro': now(),
                    'is_active': True
                }
            )

            # Crear token JWT
            refresh = RefreshToken.for_user(usuario)

            return JsonResponse({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'nombre': usuario.nombre,
                'rol': usuario.rol,
                'id_usuario': usuario.id_usuario
            }, status=200)

        except Exception as e:
            print("❌ Error al verificar token de Google:", e)
            return JsonResponse({'error': 'Token inválido o error interno'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


