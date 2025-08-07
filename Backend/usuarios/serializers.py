#importaciones
#importamos este modulo para extender la funcionalidad, para asi poder manejar la creacion de tokens como acceso y refreesco cuando el usuario se autentica 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Usuario  # Asegúrate de que este sea el modelo de usuario personalizado

#heredamos el tokenobtainpairserializer, para perzonalizar el comportamiento del serializador para la obtencion de tokens
#creamos un serializador para
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    #decorador para indicar que es un metodo de la clase
    @classmethod
    #obtenemos el toquen JWT basico para el usuario autenticado
    def get_token(cls, user):
        token = super().get_token(user)

        # Agregamos campós personalizados al toquen
        token['rol'] = user.rol
        token['id_usuario'] = user.id_usuario
        #devolvemos el token pero con los campos perzonalizados
        return token
    #este metodo lo utilzamos para validar las credenciales del usuario
    def validate(self, attrs):
        data = super().validate(attrs)

        # Incluir también los campos en la respuesta que se le enviara al cliente
        data['rol'] = self.user.rol
        data['id_usuario'] = self.user.id_usuario
        #retornamos data, en el cual ahira incluimos los campos perzonalizados junsto con el token de acceso y refresco
        return dat


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
