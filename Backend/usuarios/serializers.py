from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Usuario  # Asegúrate de que este sea el modelo de usuario personalizado

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agregar campos personalizados al token
        token['rol'] = user.rol
        token['id_usuario'] = user.id_usuario

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Incluir también los campos en la respuesta al cliente
        data['rol'] = self.user.rol
        data['id_usuario'] = self.user.id_usuario

        return data
