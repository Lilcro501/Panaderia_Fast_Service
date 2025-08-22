from django.db import models


# Create your models here.

#---------------------------------MODELO DE ESTADO DE FACTURA------------------------------

class EstadoFactura(models.Model):
    id_estado = models.AutoField(primary_key=True)
    proceso_pedido = models.CharField(max_length=50)
    estado_pedido = models.CharField( max_length=50)
    
    factura = models.ForeignKey(
        "carrito.Factura",
        on_delete=models.CASCADE,
        related_name="estados",
        db_column="facturas_id_factura"
    )


    class Meta:
        db_table = "estado_factura"
        managed = False


