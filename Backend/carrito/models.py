from django.db import models
from django.http import JsonResponse
from django.db import models
from django.db import models
from django.contrib.auth.models import User  # o tu modelo de usuarios
from django.conf import settings


# Create your models here.




#creo el modelo de la factura para que se alacene en la base de datos y la reciba desde el front
#se define los datos que va a recibir y el tipo de datos que va hacer   

class Factura(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_column='id_usuario'  # 👈 muy importante
    )
    fecha = models.DateTimeField(auto_now_add=True)
    metodo_pago = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    direccion_entrega = models.CharField(max_length=255)
    fecha_entrega = models.DateField()
    notas = models.TextField(blank=True, null=True)
    comprobante = models.FileField(
        upload_to='comprobantes/',
        blank=True,
        null=True,
        db_column='comprobante_archivo'  # 👈 esto también
    )

    def __str__(self):
        return f'Factura #{self.id} - {self.usuario.username}'

    class Meta:
        db_table = 'facturas'


#modelo de las categorias de producots para que react los renderice segun la categoria que se elija en el front

class Categoria(models.Model):
    id_categoria = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        managed = False
        db_table = 'categorias'

    def __str__(self):
        return self.nombre

#modelo de los productos para que react los renderice segun la categoria que se elija en el front

class Producto(models.Model):
    id_producto = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos/')
    fecha_vencimiento = models.DateField()
    stock = models.IntegerField()
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, db_column='id_categoria')

    class Meta:
        managed = False  # Django no intentará crear ni modificar esta tabla
        db_table = 'productos'  # Esta es la tabla real en tu base de datos

    def __str__(self):
        return self.nombre
        
#.......
#logica del carrito de compras 
#.......

# inventario/models.py
class Pedido(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    id_producto = models.IntegerField()
    cantidad = models.IntegerField()
    fecha_agregado = models.DateTimeField(auto_now_add=True)
    facturas_id_factura = models.IntegerField(null=True, blank=True)  # Factura aún no generada

    class Meta:
        db_table = 'pedido'
        managed = False

