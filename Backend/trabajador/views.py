from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from carrito.models import Factura as FacturaCarrito
from .serializers import FacturaSerializer
from carrito.models import Factura, Pedido

# Create your views here.

#--------------------------------VISTA PARA TRAER LAS FACTURAS----------------------------
#definimos el metodo htpp para establecer que puede manejar la vista


@api_view(['GET'])
def listar_factura(request, id_factura):
    try:
        factura = Factura.objects.get(id=id_factura)
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


