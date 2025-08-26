#importaciones
#importamos este modulo para extender la funcionalidad, para asi poder manejar la creacion de tokens como acceso y refreesco cuando el usuario se autentica 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Usuario  # Asegúrate de que este sea el modelo de usuario personalizado
from django.contrib.auth import authenticate


#heredamos el tokenobtainpairserializer, para perzonalizar el comportamiento del serializador para la obtencion de tokens

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError({'error': 'Debe ingresar email y contraseña'})

        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError({'error': 'Email o contraseña incorrectos'})
        if not user.is_active:
            raise serializers.ValidationError({'error': 'La cuenta está inactiva. Contacte al administrador'})

        # Obtenemos el token estándar
        data = super().validate(attrs)

        # Añadimos información adicional
        data['rol'] = user.rol
        data['id_usuario'] = user.id_usuario
        data['nombre'] = f"{user.nombre} {user.apellido}"  # <-- usamos los campos directamente

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['rol'] = user.rol
        token['id_usuario'] = user.id_usuario
        token['nombre'] = f"{user.nombre} {user.apellido}"  # <-- opcional para el token
        return token




class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Campo solo para escritura

    class Meta:
        model = Usuario
        fields = [
            'id_usuario',
            'email',
            'password',
            'nombre',
            'apellido',
            'telefono',
            'rol',
            'fecha_registro'
        ]

    def create(self, validated_data):
        # Encriptar la contraseña
        validated_data['password'] = make_password(validated_data['password'])
        # Establecer la fecha actual
        validated_data['fecha_registro'] = timezone.now()
        # Puedes establecer los siguientes campos si no vienen del frontend
        validated_data['is_active'] = True
        validated_data['is_staff'] = True if validated_data['rol'] != 'cliente' else False
        return Usuario.objects.create(**validated_data)
