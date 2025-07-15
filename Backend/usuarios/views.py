from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, get_user_model
from django.http import JsonResponse
from django.utils.timezone import now
from django.contrib.auth.hashers import check_password, make_password
from .models import Usuario
from django.core.mail import send_mail, EmailMessage
from django.utils import timezone
from .models import CodigoVerificacion
import json
import random
Usuario = get_user_model()

###############################################################################
#vista para registrar un usuario
###############################################################################

@csrf_exempt
def registrar_usuario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("🔥 Datos recibidos del front:", data)

            if Usuario.objects.filter(email=data['email']).exists():
                return JsonResponse({'error': 'Correo ya registrado'}, status=400)

            usuario = Usuario.objects.create_user(
                email=data['email'],
                password=data['password'],
                nombre_usuario=data.get('nombre_usuario', ''),
                nombre=data.get('nombre', ''),
                apellido=data.get('apellido', ''),
                telefono=data.get('telefono', ''),
                direccion=data.get('direccion', ''),
                rol=data.get('rol', 'cliente'),
                fecha_registro=now()
            )

            return JsonResponse({'mensaje': 'Usuario creado exitosamente'}, status=201)

        except Exception as e:
            print("❌ Error en registrar_usuario:", str(e))
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

################################################################################
#vista para iniciar sesion
################################################################################
Usuario = get_user_model()

@csrf_exempt
def login_usuario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("📩 Email:", data.get('email'))
            print("🔒 Password:", data.get('password'))

            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'error': 'Faltan datos'}, status=400)

            try:
                usuario = Usuario.objects.get(email=email)
            except Usuario.DoesNotExist:
                return JsonResponse({'error': 'Correo no registrado'}, status=404)

            if check_password(password, usuario.password):
                login(request, usuario)
                return JsonResponse({
                    'mensaje': 'Inicio de sesión exitoso',
                    'nombre': usuario.nombre_usuario,
                    'rol': usuario.rol
                }, status=200)
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)

        except Exception as e:
            print("❌ Error en login_usuario:", e)
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
    return JsonResponse({'error': 'Método no permitido'}, status=405)

##############################################################################
#vista para enviar el codigo de verificacion
##################################################################################
@csrf_exempt
def enviar_codigo_verificacion(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({'error': 'El correo es obligatorio'}, status=400)

            # Generar código
            codigo = ''.join([str(random.randint(0, 9)) for _ in range(4)])

            # Guardar en base de datos
            CodigoVerificacion.objects.create(email=email, codigo=codigo)

            # Preparar correo (evitar tildes y ñ para asegurar compatibilidad ASCII)
            asunto = 'Codigo de verificacion'
            cuerpo = f'Tu codigo es: {codigo}'

            correo = EmailMessage(
                subject=asunto,
                body=cuerpo,
                from_email='tu_correo@gmail.com',  # Ajusta este correo en settings.py
                to=[email],
            )
            correo.content_subtype = 'plain'
            correo.encoding = 'utf-8'
            correo.send()

            return JsonResponse({'mensaje': 'Codigo enviado'}, status=200)

        except Exception as e:
            print("❌ Error al enviar código:", e)
            return JsonResponse({'error': str(e)}, status=500)

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

            print("📥 Verificando código:", codigo, "para", email)

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