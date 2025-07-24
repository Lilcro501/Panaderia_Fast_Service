from rest_framework import serializers
#importacion de modelos para los serializadoires de la app
from .models import Favorito, Producto, Valoracion 
from usuarios.models import Usuario
from rest_framework import serializers


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id_producto', 'nombre', 'precio', 'descripcion', 'imagen', 'stock']

class FavoritoSerializer(serializers.ModelSerializer):
    producto_detalle = ProductoSerializer(source='producto', read_only=True)

    class Meta:
        model = Favorito
        fields = ['id', 'producto', 'producto_detalle']
        extra_kwargs = {
            'producto': {'required': True},
        }




class UsuarioComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario  # Asegúrate de importar correctamente tu modelo Usuario
        fields = ['nombre', 'apellido']



class ValoracionSerializer(serializers.ModelSerializer):
    usuario = UsuarioComentarioSerializer(source='id_usuario', read_only=True)
    id_producto = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), write_only=True
    )

    class Meta:
        model = Valoracion
        fields = [
            'id_valoracion',
            'comentario',
            'puntuacion',
            'fecha_valoracion',
            'usuario',
            'id_producto'
        ]

    def create(self, validated_data):
        request = self.context.get('request')
        usuario = request.user 
        producto = validated_data.pop('id_producto')

        validated_data.pop('id_usuario', None)

        return Valoracion.objects.create(
            id_usuario=usuario,
            id_producto=producto,
            **validated_data
        )
