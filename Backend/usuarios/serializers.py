from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Usuario

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agregar campos personalizados al token si lo deseas
        token['rol'] = user.rol
        token['nombre'] = user.nombre_usuario
        token['id_usuario'] = user.id_usuario

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data['rol'] = self.user.rol
        data['nombre'] = self.user.nombre_usuario
        data['id_usuario'] = self.user.id_usuario

        return data
