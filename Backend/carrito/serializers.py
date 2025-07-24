# importacion de serializers
from rest_framework import serializers

#importaciones de Modelos 
from .models import Favorito, Producto, Valoracion 
from usuarios.models import Usuario



#serializador de producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        #Indicamos el modelo que se va a serializar
        model = Producto
        #organizaos de manera explicita los campos delmodelo que estaran en la serializacion
        fields = ['id_producto', 'nombre', 'precio', 'descripcion', 'imagen', 'stock']

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
        fields = ['nombre', 'apellido']

#serializador para los cometarios y calificaciones de los productos en la ap
class ValoracionSerializer(serializers.ModelSerializer):
    #representamos el usuario que realizo el comentario o calificacion
    #source='id_usuario' indica que el campo 'usuario' se obtendra del campo 'id_usuario' del modelo Valoracion
    #read_only=True indica que el campo solo se utiliza para lectura y no se espera que se incluya en la entrada de datos al crear una nueva instancia de Valoracion
    usuario = UsuarioComentarioSerializer(source='id_usuario', read_only=True)
    #representamos el producto al que se le hizo el comentario o calificacion
    #PrimaryKeyRelatedField indica que el campo se relaciona con otro modelo, en este caso, con el modelo Producto
    #queryset=Producto.objects.all() especifica que solo se permitiran valores que pertenezcan al modelo Producto
    id_producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all(), write_only=True)

    #especificamos el modelo que se va a serializar
    class Meta:
        model = Valoracion
        #definimos los campos que se van a serializar
        fields = [
            'id_valoracion',
            'comentario',
            'puntuacion',
            'fecha_valoracion',
            'usuario',
            'id_producto'
        ]
    #este metodo se llama cuando se crea una nueva instancia de Valoracion, se utiliza para personalizar la creacion de la instancia
    def create(self, validated_data):
        #obtenemos el usuario autenticado a partir del contexto de la solicitud
        request = self.context.get('request')
        #obtenemos el usuario autenticado
        usuario = request.user 
        #obtenemos el producto asociado a la valoracion a partir de los datos validados
        producto = validated_data.pop('id_producto')
        #eliminamos el campo 'id_usuario' de los datos validados, ya que no es necesario en la creacion de la instancia
        validated_data.pop('id_usuario', None)
        #creamos una nueva instancia de Valoracion con los datos validados y el usuario autenticado
        #el metodo create se encarga de guardar la nueva instancia en la base de datos
        return Valoracion.objects.create(
            id_usuario=usuario,
            id_producto=producto,
            **validated_data
        )
