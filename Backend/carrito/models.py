# Importaciones estándar de Django
from django.conf import settings
from django.http import JsonResponse

# Importaciones de Django relacionadas con bases de datos
from django.db import models
from trabajador.models import EstadoFactura

# Importación del modelo de usuario de Django 
from django.contrib.auth.models import User 

#---------------------------MODELO DE FACTURA------------------
#definimos el Modelo de factura, que hereda el models.model 
#para asi interactuar con la base de datos e integrarlo a ORM
class Factura(models.Model):
    #Definimos los campos del modelo, con sus respectivos tipos de datos y restricciones
    id = models.AutoField(primary_key=True, db_column='id_factura')
    # otros campos...

    #definimos el campo de usuario definido en settings
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,db_column='id_usuario' )
    #definimos el tipo de dato para la fecha
    #el auto_now_add=True, significa que la fecha se establecera automaticamente
    fecha = models.DateTimeField(auto_now_add=True)
    #definimos el tipo de dato para el metodo de pago
    metodo_pago = models.CharField(max_length=50)
    #definimos el tipo de dato para el total
    total = models.DecimalField(max_digits=10, decimal_places=2)
    #definimos el tipo de dato para la direccion de entrega
    direccion_entrega = models.CharField(max_length=255)
    #definimos el tipo de dato para la fecha de entrega
    fecha_entrega = models.DateField()
    #definimos el tipo de dato para las notas
    #el blank=True, significa que el campo puede estar vacio
    #el null=True, significa que el campo puede tener un valor nulo
    notas = models.TextField(blank=True, null=True)
    #definimos el tipo de dato para el comprobante
    #el upload_to='comprobantes/', significa que el archivo se subira a la carpeta comprobantes
    #el blank=True, significa que el campo puede estar vacio
    #el null=True, significa que el campo puede tener un valor nulo
    comprobante = models.FileField( upload_to='comprobantes/',blank=True,null=True,db_column='comprobante_archivo')
    #definimos el tipo de dato para el estado
    #el default='pendiente', significa que el estado por defecto sera local
    METODOS_ENTREGA = [
        ('local', 'En tienda'),
        ('domicilio', 'Domicilio'),
    ]
    metodo_entrega = models.CharField(max_length=10,choices=METODOS_ENTREGA,default='local')
    #definimos un metodo para representar la instancia del modelo como una cadena, en este caso el nombre del usuario y el id de la factura
    def __str__(self):
        return f'Factura #{self.id} - {self.usuario.username}'
    #definimos con las clase meta(metadatos) para deefinir el nombre de la tabla de la base de datos sobre el modelo
    class Meta:
        db_table = 'facturas'
#-------------------------------------------------------------------------------------------------------------------

#---------------------------MODELO DE CATEGORIAS------------------
#definimos el Modelo de categorias, que hereda el models.model
#para asi interactuar con la base de datos e integrarlo a ORM
class Categoria(models.Model):
    #definimos los campos del modelo, con sus respectivos tipos de datos y restricciones
    #definimos campo del id de la catoegoria
    id_categoria = models.IntegerField(primary_key=True)
    #definimos el campo de nombre de la categoria
    nombre = models.CharField(max_length=50, unique=True)
    # Definir la clase Meta para especificar el nombre de la tabla en la base de datos
    class Meta:
        #para quie django no modifque la tabla
        managed = False
        #referencia de la tabla de la base de datos
        db_table = 'categorias'
    #definimos el metodo para retornar el nombre del la categoria
    def __str__(self):
        return self.nombre


#---------------------------MODELO DE PRODUCTOS------------------
#modelo de los productos para que react los renderice segun la categoria que se elija en el front

#creamos el modelo dede productos para conectar el modelo con la base de datos
class Producto(models.Model):
    #definimos los campos del modelo, con sus respectivos tipos de datos y restricciones
    id_producto = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    #definimos el campo de imagen del producto
    #definimos el directorio donde se guardaran las imagenes de los productos
    #tener en cuenta que la ruta aun no esta bien definida
    imagen = models.ImageField(upload_to='productos/')
    fecha_vencimiento = models.DateField()
    stock = models.IntegerField()
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, db_column='id_categoria')

    #referencia de la calse de metadatos para conectar con la base de datos
    class Meta:
        managed = False  # Django no intentará crear ni modificar esta tabla
        db_table = 'productos'  # Esta es la tabla en la base de datos

    #retornamos el nombre del producto como una cadena
    def __str__(self):
        return self.nombre
#-------------------------------------------------------------------------

#---------------------------MODELO DE CARRITO------------------
#definimos el modelo de pedido/carrito para conectarlo con la tabla en la base de datos

class Pedido(models.Model):
    id_carrito = models.AutoField(primary_key=True)

    producto = models.ForeignKey(
        Producto,
        on_delete=models.SET_NULL,
        null=True,

        db_column='id_producto'
    )

    nombre_producto = models.CharField(max_length=255)  # copia del nombre del producto
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)  # copia del precio actual

    cantidad = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    fecha_agregado = models.DateTimeField(auto_now_add=True)

    factura = models.ForeignKey(
        Factura,
        on_delete=models.CASCADE,
        related_name='pedidos',
        db_column='facturas_id_factura'
    )

    class Meta:
        db_table = 'pedido'
        managed = False

#-------------------------------------------------------------------------


#---------------------------MODELO DE FAVORITOS------------------
# modelo de favoritos para que react los renderice segun el usuario que se elija en el front
class Favorito(models.Model):
    #definimos los campos del modelo, con sus respectivos tipos de datos y restricciones
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha_agregado = models.DateTimeField(auto_now_add=True)

    #conectamos con la base de datos
    class Meta:
        db_table = 'favoritos' 
        #estos campos en la bae de datos deben ser unicos
        unique_together = ('usuario', 'producto')

#-------------------------------------------------------------------------

#---------------------------MODELO DE VALORACION------------------
#Creamos el modelo de valoracion para los comentarios y las calificaciones de cada producto
class Valoracion(models.Model):
    #defimoos los campor que va a tener el modelo
    id_valoracion = models.AutoField(primary_key=True)
    #definmos el campo de la clave foranea de usuario
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL,db_column='id_usuario',  on_delete=models.CASCADE)
    #defimos el campo de la clave foranea de producto
    id_producto = models.ForeignKey(Producto,db_column='id_producto', on_delete=models.CASCADE) 
    puntuacion = models.IntegerField()
    comentario = models.TextField()
    fecha_valoracion = models.DateTimeField(auto_now_add=True)
    #conectamos con la base de datos con la tabla valoraciones
    class Meta:
        db_table = 'valoraciones'
        #para que django no modifique la tabla
        managed = False  
    #definimos el metodo para retornar el nombre del usuario y el nombre del producto
    def __str__(self):
        #retornamos el nombre del usuario y el nombre del producto
        return f'{self.id_usuario.username} -> {self.id_producto.nombre} ({self.puntuacion})'

#----------------------------------------------------------------------------------#


