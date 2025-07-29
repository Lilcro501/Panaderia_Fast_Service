from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from carrito.models import Factura as FacturaCarrito
from carrito.models import Factura, Pedido
from .serializers import PedidoSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.

#--------------------------------VISTA PARA TRAER LAS FACTURAS----------------------------
#definimos el metodo htpp para establecer que puede manejar la vista


@api_view(['GET'])
def listar_factura(request):
    try:
        factura = Factura.objects.get(id_factura=id_factura)
        pedidos = Pedido.objects.filter(factura=factura)

        productos = [
            {
                "id": p.producto.id_producto,
                "nombre": p.producto.nombre,
                "precio_unitario": float(p.producto.precio),
                "cantidad": p.cantidad
            }
            for p in pedidos
        ]

        comprobante_url = request.build_absolute_uri(factura.comprobante.url) if factura.comprobante else None

        return Response({
            "id_factura": factura.id_factura,
            "productos": productos,
            "comprobante": comprobante_url
        })

    except Factura.DoesNotExist:
        return Response({"error": "Factura no encontrada"}, status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Si usas autenticación
def listar_pedidos(request, id_factura):
    try:
        pedidos = Pedido.objects.filter(factura_id=id_factura)
        serializer = PedidoSerializer(pedidos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
