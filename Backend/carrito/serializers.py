# importacion de serializers
from rest_framework import serializers

#importaciones de Modelos 
from .models import Favorito, Producto, Valoracion, Factura
from usuarios.models import Usuario

#serializador de producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        #Indicamos el modelo que se va a serializar
        model = Producto
        #organizaos de manera explicita los campos delmodelo que estaran en la serializacion
        fields = ['id_producto', 'nombre', 'precio', 'descripcion', 'imagen', 'stock']

    def get_imagen(self, obj):
        if obj.imagen:
            try:
                # Si es CloudinaryField, .url devuelve la URL Cloudinary
                return obj.imagen.url  
            except:
                # Si es ImageField local, construimos la URL completa
                request = self.context.get('request')
                if request is not None:
                    return request.build_absolute_uri(obj.imagen.url)
                return obj.imagen.url
        return None
    
#serializador de Favorito
#En este serializador, estamos utilizando el serializador estamos convirtiendo las instancias de medelo en un json
class FavoritoSerializer(serializers.ModelSerializer):
    #en este llamamos el serializador de producto para que se pueda mostrar en el json de la ap
    producto_detalle = ProductoSerializer(source='producto', read_only=True)

    #especificamos a que modelo esta asociado
    class Meta:
        model = Favorito
        #inclumos todos los campos del modelo para la serializacion
        fields = ['id', 'producto', 'producto_detalle']
        #aca especificamos que el campo de producto es obligatorio
        extra_kwargs = {'producto': {'required': True},}

#serializador para los usuarios en los  comentarios y calificaciones de los productos en la ap
class UsuarioComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        #Utilizamos el modelo Usuario
        model = Usuario 
        #especificamos los campos que queremos en el serializador
        fields = ['id','nombre', 'apellido']

#serializador para los cometarios y calificaciones de los productos en la ap
class ValoracionSerializer(serializers.ModelSerializer):
    id_producto = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all()  # Permite que se envíe el ID del producto
    )
    usuario = UsuarioComentarioSerializer(source='id_usuario', read_only=True)

    class Meta:
        model = Valoracion
        fields = [
            'id_valoracion',
            'comentario',
            'fecha_valoracion',
            'usuario',
            'id_producto',
        ]

    def create(self, validated_data):
        # Obtener usuario autenticado desde request
        request = self.context.get('request')
        usuario = request.user if request else None

        # Validación extra por si falta id_producto
        producto = validated_data.get('id_producto')
        if not producto:
            raise serializers.ValidationError({'id_producto': 'Este campo es obligatorio.'})

        # Crear la instancia con el usuario y producto
        return Valoracion.objects.create(
            id_usuario=usuario,
            id_producto=producto,
            comentario=validated_data.get('comentario'),
        )


#--------------------------------serializador para la factuta-trabajador -------------------------------------

class FacturaSerializer(serializers.ModelSerializer):
    clienteId = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Factura
        fields = ['id', 'clienteId', 'metodo_pago', 'metodo_entrega', 'total']
    