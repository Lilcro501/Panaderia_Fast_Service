from django.utils import timezone
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Categorias, Cronograma, Productos, Usuarios, Valoraciones, Facturas, Pedido

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    id_categoria = CategoriaSerializer(read_only=True)  # Para GET
    id_categoria_id = serializers.PrimaryKeyRelatedField(  # Para POST/PUT
        source='id_categoria',
        queryset=Categorias.objects.all(),
        write_only=True
    )

    class Meta:
        model = Productos
        fields = [
            'id_producto',
            'id_categoria',       # Para mostrar el objeto completo (GET)
            'nombre',
            'precio',
            'descripcion',
            'imagen',
            'fecha_vencimiento',
            'stock',
            'fecha_actualizacion',
            'imagen_public_id',
            'id_categoria_id'     # Para enviar solo el ID (POST/PUT)
        ]

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id_usuario', 'email', 'nombre', 'apellido', 'telefono', 'rol']

    def create(self, validated_data):
        validated_data['rol'] = 'trabajador'
        validated_data['password'] = make_password('clave123')  # contraseña por defecto
        validated_data['fecha_registro'] = timezone.now()
        validated_data['is_active'] = 1
        validated_data['is_staff'] = 1
        return Usuarios.objects.create(**validated_data)

class CronogramaSerializer(serializers.ModelSerializer):
    usuario_detalle = UsuarioSerializer(source='id_usuario', read_only=True)
    id_usuario = serializers.PrimaryKeyRelatedField(queryset=Usuarios.objects.all())

    hora_inicio = serializers.SerializerMethodField()
    hora_fin = serializers.SerializerMethodField()
    fecha = serializers.SerializerMethodField()

    class Meta:
        model = Cronograma
        fields = '__all__'
        extra_kwargs = {
            'id_usuario': {'required': True, 'allow_null': False}
        }

    def get_hora_inicio(self, obj):
        return obj.fecha_inicio.strftime("%H:%M") if obj.fecha_inicio else None

    def get_hora_fin(self, obj):
        return obj.fecha_fin.strftime("%H:%M") if obj.fecha_fin else None

    def get_fecha(self, obj):
        return obj.fecha_inicio.strftime("%d/%m/%Y") if obj.fecha_inicio else None


class ValoracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valoraciones
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(source='id_usuario.nombre', read_only=True)

    class Meta:
        model = Facturas
        fields = ['id_factura', 'cliente', 'fecha', 'total']

class PedidoSerializer(serializers.ModelSerializer):
    id_producto = ProductoSerializer()  # Anida nombre del producto

    class Meta:
        model = Pedido
        fields = ['id_producto', 'cantidad', 'subtotal']