# carrito/serializers.py
from rest_framework import serializers
from carrito.models import Factura, Pedido
from administrador.models import Cronograma #

class FacturaSerializer(serializers.ModelSerializer):
    clienteId = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Factura
        fields = ['id', 'clienteId', 'metodo_pago', 'metodo_entrega', 'total']


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

#cronograma
class CronogramaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cronograma
        fields = ['id_cronograma', 'usuario', 'cargo', 'actividades', 'horarios', 'fecha']