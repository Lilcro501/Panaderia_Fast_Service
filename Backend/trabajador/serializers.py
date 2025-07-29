from rest_framework import serializers
from carrito.models import Factura
from carrito.models import Pedido



class PedidoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Factura
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'
        