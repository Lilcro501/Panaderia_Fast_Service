# administrador/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from administrador.models import EstadoFactura, Pedido, DetalleFacturaHistorico

@receiver(post_save, sender=EstadoFactura)
def guardar_detalle_historico(sender, instance, created, **kwargs):
    """
    Cuando una factura pasa a 'completado', copiamos su información
    y la de sus productos a DetalleFacturaHistorico.
    """
    if instance.proceso_pedido.lower() != "completado":
        return  # Solo actuamos si está en 'completado'

    factura = instance.facturas_id_factura

    # Evitar duplicados si ya fue respaldada
    if DetalleFacturaHistorico.objects.filter(id_factura_original=factura.id_factura).exists():
        return

    pedidos = Pedido.objects.filter(facturas_id_factura=factura.id_factura)
    for pedido in pedidos:
        producto = pedido.id_producto  # ya es objeto Productos gracias a FK

        DetalleFacturaHistorico.objects.create(
            id_factura_original=factura.id_factura,  # si es FK usa factura directamente
            fecha_factura=factura.fecha,
            metodo_pago=factura.metodo_pago,
            total_compra=factura.total,
            direccion_entrega=factura.direccion_entrega,
            fecha_entrega=factura.fecha_entrega,
            comprobante_archivo=factura.comprobante_archivo,
            nombre_producto=producto.nombre,
            precio_unitario=producto.precio,
            cantidad=pedido.cantidad,
            subtotal=pedido.cantidad * producto.precio,
            categoria_producto=producto.id_categoria.nombre
        )
