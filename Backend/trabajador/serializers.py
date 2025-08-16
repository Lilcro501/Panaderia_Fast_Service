# carrito/serializers.py
from rest_framework import serializers
from carrito.models import Factura, Pedido
from administrador.models import Cronograma #
from administrador.serializers import UsuarioSerializer 

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
class CronogramaTrabajadorSerializer(serializers.ModelSerializer):
    id_usuario = serializers.PrimaryKeyRelatedField(read_only=True)

    hora_inicio = serializers.SerializerMethodField()
    hora_fin = serializers.SerializerMethodField()
    fecha = serializers.SerializerMethodField()

    class Meta:
        model = Cronograma
        fields = [ 'id_usuario', 'titulo', 'descripcion', 'hora_inicio', 'hora_fin', 'fecha']

    def get_hora_inicio(self, obj):
        return obj.fecha_inicio.strftime("%H:%M") if obj.fecha_inicio else None

    def get_hora_fin(self, obj):
        return obj.fecha_fin.strftime("%H:%M") if obj.fecha_fin else None

    def get_fecha(self, obj):
        return obj.fecha_inicio.strftime("%d/%m/%Y") if obj.fecha_inicio else None
