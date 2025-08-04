# trabajador/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from carrito.models import Factura
from carrito.serializers import FacturaSerializer
from rest_framework import status
from carrito.models import Factura, Pedido, Producto
from .serializers import PedidoSerializer


@api_view(['GET'])
def listar_pedidos(request):
    facturas = Factura.objects.all().order_by('-fecha')
    serializer = FacturaSerializer(facturas, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_factura(request, id_factura):
    try:
        factura = Factura.objects.get(id=id_factura)
        pedidos = Pedido.objects.filter(factura=factura)

        productos = [{
            "nombre": pedido.producto.nombre,
            "cantidad": pedido.cantidad,
            "precio_unitario": float(pedido.producto.precio),
            "subtotal": float(pedido.subtotal),
            "estado": "comprado"
        } for pedido in pedidos]

        data = {
            "id_factura": factura.id,
            "id_usuario": factura.usuario.id,
            "fecha": factura.fecha,
            "metodo_pago": factura.metodo_pago,
            "total": float(factura.total),
            "direccion_entrega": factura.direccion_entrega,
            "fecha_entrega": factura.fecha_entrega,
            "notas": factura.notas,
            "comprobante": factura.comprobante.url if factura.comprobante else None,  # <- aquí ajustado
            "metodo_entrega": factura.metodo_entrega,
            "productos": productos
        }

        return Response(data, status=status.HTTP_200_OK)

    except Factura.DoesNotExist:
        return Response({"error": "Factura no encontrada"}, status=status.HTTP_404_NOT_FOUND)

