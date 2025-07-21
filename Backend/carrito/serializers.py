from rest_framework import serializers
from .models import Favorito
from .models import Producto

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

