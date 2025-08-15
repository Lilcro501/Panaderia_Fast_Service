# trabajador/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from carrito.serializers import FacturaSerializer
from rest_framework import status
from carrito.models import Factura, Pedido, Producto
from .serializers import PedidoSerializer, CronogramaSerializer #
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.db.models import OuterRef, Subquery
from trabajador.models import EstadoFactura
from django.db.models.functions import Coalesce
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import EmailMultiAlternatives
from rest_framework.views import APIView #
from administrador.models import Cronograma #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_pedidos(request):
    # Subquery: obtener el último estado de cada factura (ordenado por id_estado descendente)
    ultimos_estados = EstadoFactura.objects.filter(
        factura=OuterRef('pk')
    ).order_by('-id_estado')

    # Anotar campos del último estado a la factura
    facturas_con_estado = Factura.objects.annotate(
        estado_pedido_anotado=Subquery(ultimos_estados.values('estado_pedido')[:1]),
        proceso_pedido_anotado=Subquery(ultimos_estados.values('proceso_pedido')[:1]),
    ).filter(
        estado_pedido_anotado='por validar'
    ).order_by('-fecha')

    serializer = FacturaSerializer(facturas_con_estado, many=True)
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
            "precio_unitario": float(pedido.precio_unitario),
            "subtotal": float(pedido.subtotal),
            "estado": "comprado"
        } for pedido in pedidos]


        usuario = factura.usuario  
        datos_usuario = {
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "email": usuario.email,
            "telefono": usuario.telefono,
        }

        data = {
            "id_factura": factura.id,
            "usuario": datos_usuario,  # <- Aquí se incluyen los datos del cliente
            "fecha": factura.fecha,
            "metodo_pago": factura.metodo_pago,
            "total": float(factura.total),
            "direccion_entrega": factura.direccion_entrega,
            "fecha_entrega": factura.fecha_entrega,
            "notas": factura.notas,
            "comprobante": request.build_absolute_uri(factura.comprobante.url) if factura.comprobante else None,

            "metodo_entrega": factura.metodo_entrega,
            "productos": productos
        }

        return Response(data, status=status.HTTP_200_OK)

    except Factura.DoesNotExist:
        return Response({"error": "Factura no encontrada"}, status=status.HTTP_404_NOT_FOUND)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def notificar_pedido(request):
    """
    Actualiza el estado de un pedido (aceptar o rechazar) y envía una notificación por correo al cliente.
    """
    data = request.data
    pedido_id = data.get("id_pedido")
    motivo = data.get("motivo", "")
    accion = data.get("accion")

    # Validación básica
    if not pedido_id or not accion:
        return Response({"error": "Faltan datos obligatorios."}, status=400)

    # Buscar la factura y su cliente
    factura = get_object_or_404(Factura, id=pedido_id)
    cliente = factura.usuario  # Asegúrate que 'usuario' sea el campo correcto

    # Definir estado según acción
    if accion == "aceptar":
        estado_pedido = "aceptado"
        proceso_pedido = "preparando"
        estado_pago = "pago"
        mensaje_texto = "Tu pedido ha sido aceptado. Pronto estará en camino."
        mensaje_html = f"""
            <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #2e8b57;">¡Pedido aceptado!</h2>
                    <p>Hola <strong>{cliente.nombre}</strong>,</p>
                    <p>Tu pedido ha sido <strong>aceptado</strong> y ahora está en proceso de preparación.</p>
                    <p>Muy pronto lo recibirás. ¡Gracias por elegirnos!</p>
                    <p style="margin-top:20px;">Atentamente,<br>Panadería Fast Service</p>
                </body>
            </html>
        """
    elif accion == "rechazar":
        estado_pedido = "rechazado"
        proceso_pedido = "preparando"
        estado_pago = "cancelado"
        mensaje_texto = f"Tu pedido fue rechazado por el siguiente motivo: {motivo}"
        mensaje_html = f"""
            <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #b22222;">Pedido rechazado</h2>
                    <p>Hola <strong>{cliente.nombre}</strong>,</p>
                    <p>Lamentamos informarte que tu pedido ha sido <strong>rechazado</strong>.</p>
                    <p><strong>Motivo:</strong> {motivo}</p>
                    <p>Si tienes dudas, no dudes en contactarnos.</p>
                    <p style="margin-top:20px;">Atentamente,<br>Panadería Fast Service</p>
                </body>
            </html>
        """
    else:
        return Response({"error": "Acción inválida. Usa 'aceptar' o 'rechazar'."}, status=400)

    # Crear nuevo estado en la base de datos
    EstadoFactura.objects.create(
        factura=factura,
        proceso_pedido=proceso_pedido,
        estado_pedido=estado_pedido
    )

    # Enviar correo al cliente (texto + HTML)
    asunto = "Actualización de tu pedido"
    email = EmailMultiAlternatives(
        subject=asunto,
        body=mensaje_texto,
        from_email="noreply@panaderiafastservice.com",
        to=[cliente.email]
    )
    email.attach_alternative(mensaje_html, "text/html")
    email.send()

    return Response({
        "mensaje": f"Pedido {accion} correctamente.",
        "estado_guardado": {
            "proceso_pedido": proceso_pedido,
            "estado_pedido": estado_pedido
        }
    }, status=200)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def historial_pedidos(request):
    # Subconsulta: último estado por factura
    ultimos_estados = EstadoFactura.objects.filter(
        factura=OuterRef('pk')
    ).order_by('-id_estado')

    facturas = Factura.objects.annotate(
        estado_pedido=Subquery(ultimos_estados.values('estado_pedido')[:1])
    )

    aceptados = facturas.filter(estado_pedido="aceptado").order_by('-fecha')
    rechazados = facturas.filter(estado_pedido="rechazado").order_by('-fecha')

    serializer_aceptados = FacturaSerializer(aceptados, many=True)
    serializer_rechazados = FacturaSerializer(rechazados, many=True)

    return Response({
        "aceptados": serializer_aceptados.data,
        "rechazados": serializer_rechazados.data
    })


@api_view(['GET'])
def historial_pedidos(request):
    # Subconsulta: obtener el último estado de cada factura
    ultimo_estado = EstadoFactura.objects.filter(
        factura=OuterRef('pk')
    ).order_by('-id_estado')

    facturas = Factura.objects.annotate(
        estado_pedido=Subquery(ultimo_estado.values('estado_pedido')[:1]),
        proceso_pedido=Subquery(ultimo_estado.values('proceso_pedido')[:1]),
    )

    data = []
    for factura in facturas:
        data.append({
            "id": factura.id,
            "cliente": f"{factura.usuario.nombre} {factura.usuario.apellido}",
            "clienteId": factura.usuario.id,
            "fecha": factura.fecha.strftime("%I:%M:%S %p - %d/%m/%Y"),
            "estado": factura.estado_pedido
        })
    return Response(data)


@api_view(['GET'])
def listar_estados_pedidos(request):
    ultimos_estados = EstadoFactura.objects.filter(
        factura=OuterRef('pk')
    ).order_by('-id_estado')

    facturas_con_estado = Factura.objects.annotate(
        estado_pedido=Subquery(ultimos_estados.values('estado_pedido')[:1]),
        proceso_pedido=Subquery(ultimos_estados.values('proceso_pedido')[:1])
    ).filter(estado_pedido='por validar') 

    data = [
        {
            'id': f.id,
            'fecha': f.fecha.strftime("%I:%M:%S %p - %d/%m/%Y"),
            'estado': f.estado_pedido,
            'cliente_id': f.usuario.id
        }
        for f in facturas_con_estado
    ]
    
    return Response(data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def actualizar_estado_pedido(request):
    data = request.data
    print("Datos recibidos:", request.data)
    id_factura = data.get("id_factura")
    proceso_pedido = data.get("proceso_pedido")

    if not id_factura or not proceso_pedido:
        return Response({"error": "Faltan datos obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        factura = Factura.objects.get(id=id_factura)
    except Factura.DoesNotExist:
        return Response({"error": "Factura no encontrada."}, status=status.HTTP_404_NOT_FOUND)

    nuevo_estado = EstadoFactura.objects.create(
        factura=factura,
        proceso_pedido=proceso_pedido,
        estado_pedido="por validar"  # Valor fijo
    )

    return Response({"mensaje": "Estado actualizado correctamente."}, status=status.HTTP_200_OK)


#cronograma
class CronogramaMiUsuarioView(APIView):
    def get(self, request, id_usuario):
        try:
            cronogramas = Cronograma.objects.filter(id_usuario=id_usuario)
            serializer = CronogramaSerializer(cronogramas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cronograma.DoesNotExist:
            return Response(
                {"error": "No se encontró cronograma para este usuario"},
                status=status.HTTP_404_NOT_FOUND
            )