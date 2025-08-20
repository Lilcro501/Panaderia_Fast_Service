from django.db import models

class Usuarios(models.Model):
    ROLES = (
        ('cliente', 'Cliente'),
        ('trabajador', 'Trabajador'),
        ('admin', 'Administrador'),
    )
    id_usuario = models.AutoField(primary_key=True)
    email = models.CharField(unique=True, max_length=150)
    rol = models.CharField(max_length=10, blank=True, null=True)
    password = models.CharField(max_length=255)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    fecha_registro = models.DateTimeField(blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_active = models.IntegerField(blank=True, null=True)
    is_staff = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

    class Meta:
        managed = False
        db_table = 'usuarios'

class Cronograma(models.Model):
    id_cronograma = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuarios, models.DO_NOTHING, db_column='id_usuario')
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()

    def __str__(self):
        return self.titulo

    class Meta:
        managed = False
        db_table = 'cronograma'

class Categorias(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'categorias'

class Productos(models.Model):
    id_producto = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(Categorias, models.DO_NOTHING, db_column='id_categoria')
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField(blank=True, null=True)
    imagen = models.URLField(max_length=255, blank=True, null=True)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    stock = models.IntegerField()
    fecha_actualizacion = models.DateField(blank=True, null=True)
    imagen_public_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} ({self.id_categoria.nombre})"

    class Meta:
        managed = False
        db_table = 'productos'


class Valoraciones(models.Model):
    id_valoracion = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuarios, models.DO_NOTHING, db_column='id_usuario')
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE, db_column='id_producto')
    comentario = models.TextField(blank=True, null=True)
    fecha_valoracion = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.id_usuario.nombre} - {self.id_producto.nombre}"

    class Meta:
        managed = False
        db_table = 'valoraciones'


class Facturas(models.Model):
    id_factura = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='id_usuario')
    fecha = models.DateTimeField()
    metodo_pago = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    direccion_entrega = models.CharField(max_length=255)
    fecha_entrega = models.DateField()
    notas = models.TextField(blank=True, null=True)
    comprobante_archivo = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Factura #{self.id_factura} - {self.id_usuario.nombre}"

    class Meta:
        managed = False
        db_table = 'facturas'
    
    # Relación inversa si lo necesitas
    @property
    def estado(self):
        from .models import Estado  # Importación dentro del método
        return Estado.objects.filter(facturas=self).first()
    
    @property
    def Estado(self):
        from .models import Estado # o el nombre correcto de tu modelo estado
        return Estado.objects.filter(facturas_id_factura=self.id_factura).first()


class Pedido(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey('Productos', models.DO_NOTHING, db_column='id_producto', blank=True, null=True)
    nombre_producto = models.CharField(max_length=255)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    cantidad = models.IntegerField()
    fecha_agregado = models.DateTimeField(blank=True, null=True)
    facturas_id_factura = models.ForeignKey('Facturas', models.DO_NOTHING, db_column='facturas_id_factura')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        producto = self.id_producto.nombre if self.id_producto else "Producto eliminado"
        return f"Pedido #{self.id_carrito} - {producto} x {self.cantidad}"
    
    class Meta:
        managed = False
        db_table = 'pedido'

class EstadoFactura(models.Model):
    PROCESO_PEDIDO_CHOICES = [
        ('preparando', 'Preparando'),
        ('empaquetando', 'Empaquetando'),
        ('en entrega', 'En entrega'),
        ('completado', 'Completado'),
    ]
    ESTADO_PEDIDO_CHOICES = [
        ('por validar', 'Por validar'),
        ('aceptado', 'Aceptado'),
        ('Rechazado', 'Rechazado'),
    ]
    id_estado = models.AutoField(primary_key=True)
    proceso_pedido = models.CharField(max_length=20,choices=PROCESO_PEDIDO_CHOICES)
    estado_pedido = models.CharField(max_length=20,choices=ESTADO_PEDIDO_CHOICES)
    facturas_id_factura = models.ForeignKey('Facturas', models.DO_NOTHING, db_column='facturas_id_factura')

    def __str__(self):
        return f"Estado #{self.id_estado} - {self.proceso_pedido} / {self.estado_pago}"

    class Meta:
        managed = False
        db_table = 'estado_factura'



class DetalleFacturaHistorico(models.Model):
    id_factura_historico = models.AutoField(primary_key=True)

    # Datos clave de la factura
    id_factura_original = models.ForeignKey('Facturas', models.DO_NOTHING, db_column='id_factura_original', blank=True, null=True)
    fecha_factura = models.DateTimeField()
    metodo_pago = models.CharField(max_length=50)
    total_compra = models.DecimalField(max_digits=10, decimal_places=2)
    direccion_entrega = models.CharField(max_length=255, blank=True, null=True)
    fecha_entrega = models.DateField(blank=True, null=True)
    comprobante_archivo = models.CharField(max_length=255, blank=True, null=True)

    # Datos clave del producto
    nombre_producto = models.CharField(max_length=255)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    categoria_producto = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'detalle_factura_historico'

    def __str__(self):
        return f"Histórico Factura {self.id_factura_original} - {self.nombre_producto}"


class Favoritos(models.Model):
    usuario = models.ForeignKey('Usuarios', models.DO_NOTHING)
    producto = models.ForeignKey('Productos', models.DO_NOTHING)
    fecha_agregado = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'favoritos'


