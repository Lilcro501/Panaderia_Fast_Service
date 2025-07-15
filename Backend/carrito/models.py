from django.db import models
from django.http import JsonResponse

# Create your models here.




#creo el modelo de la factura para que se alacene en la base de datos y la reciba desde el front
#se define los datos que va a recibir y el tipo de datos que va hacer   

class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    id_usuario = models.IntegerField(blank=True, null=True)  # O usar ForeignKey si quieres vincularlo a un usuario
    fecha = models.DateTimeField(auto_now_add=True)
    metodo_pago = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    cedula = models.CharField(max_length=20)
    municipio = models.CharField(max_length=100)
    direccion_entrega = models.CharField(max_length=255)
    apartamento = models.CharField(max_length=100, blank=True, null=True)
    fecha_entrega = models.DateField()
    hora_entrega = models.TimeField()
    notas = models.TextField(blank=True, null=True)
    comprobante_archivo = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False  # Importante: Django no debe modificar esta tabla
        db_table = 'facturas'



#creamos el modelo del detalle de los productos para que se se almacene en el carrito de compras
class detalle_factura(models.Model):
    id_detalle_factura = models.AutoField(primary_key=True)
    id_factura = models.IntegerField(blank=True, null=True)  # O usa ForeignKey si quieres vincularlo a una factura
    id_producto = models.IntegerField(blank=True, null=True)  # O usa ForeignKey si quieres vincularlo a un producto
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False  # Importante: Django no debe modificar esta tabla
        db_table = 'detalle_factura'

class Categoria(models.Model):
    id_categoria = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        managed = False
        db_table = 'categorias'

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos/')
    fecha_vencimiento = models.DateField()
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, db_column='id_categoria')

    class Meta:
        managed = False  # ❗ Django no intentará crear ni modificar esta tabla
        db_table = 'productos'  # ❗ Esta es la tabla real en tu base de datos

    def __str__(self):
        return self.nombre
        