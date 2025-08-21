# trabajador/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from carrito.serializers import FacturaSerializer
from rest_framework import status
from carrito.models import Factura, Pedido, Producto
from .serializers import PedidoSerializer, CronogramaTrabajadorSerializer #
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
from usuarios.models import Usuario #
from rest_framework import permissions#
from administrador.models import DetalleFacturaHistorico
from decimal import Decimal
from datetime import datetime
from carrito.models import DetalleFactura


@api_view(['GET'])
#@permission_classes([IsAuthenticated])
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
    Actualiza el estado de un pedido (aceptar o rechazar), envía correo al cliente
    y guarda los productos en detalle_factura si el pedido fue aceptado.
    """
    data = request.data
    pedido_id = data.get("id_pedido")
    accion = data.get("accion")
    motivo = data.get("motivo", "")  # Solo se usa si es rechazado

    # Validación básica
    if not pedido_id or not accion:
        return Response({"error": "Faltan datos obligatorios."}, status=400)

    # Buscar la factura y su cliente
    factura = get_object_or_404(Factura, id=pedido_id)
    cliente = factura.usuario  # Asegúrate que 'usuario' sea el campo correcto

    # Definir estado según acción
    if accion == "aceptar":
        estado_pedido = "aceptado"
        proceso_pedido = "completado"
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
        proceso_pedido = "completado"
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

    # 🔹 Guardamos o actualizamos el estado de la factura
    estado_factura, creado = EstadoFactura.objects.get_or_create(
        factura=factura,
        defaults={
            "proceso_pedido": proceso_pedido,
            "estado_pedido": estado_pedido
        }
    )

    if not creado:
        estado_factura.proceso_pedido = proceso_pedido
        estado_factura.estado_pedido = estado_pedido
        estado_factura.save()

    # 📌 Si el pedido fue aceptado, guardamos los productos en detalle_factura
    if estado_pedido == "aceptado":
        pedidos = Pedido.objects.filter(factura=factura)
        for pedido in pedidos:
            # Evitar duplicados
            ya_existe = DetalleFactura.objects.filter(
                factura=factura,
                nombre_producto=pedido.nombre_producto
            ).exists()
            if not ya_existe:
                DetalleFactura.objects.create(
                    factura=factura,
                    id_producto=pedido.producto.id_producto if pedido.producto else None,
                    nombre_producto=pedido.nombre_producto,
                    precio_unitario=Decimal(pedido.precio_unitario),
                    cantidad=pedido.cantidad,
                    subtotal=Decimal(pedido.subtotal),
                    categoria_producto = pedido.producto.id_categoria.nombre if pedido.producto and pedido.producto.id_categoria else None

                )


    # Enviar correo al cliente
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



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def actualizar_estado_pedido(request):
    data = request.data
    print("📥 Datos recibidos en la request:", data)

    id_factura = data.get("id_factura")
    estado_pedido = data.get("estado_pedido")
    proceso_pedido = data.get("proceso_pedido")

    if not id_factura or not estado_pedido or not proceso_pedido:
        return Response({"error": "Faltan datos obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        factura = Factura.objects.get(id=id_factura)
        print("✅ Factura encontrada:", factura.id, factura.id_usuario)
    except Factura.DoesNotExist:
        print("❌ Factura no encontrada:", id_factura)
        return Response({"error": "Factura no encontrada."}, status=status.HTTP_404_NOT_FOUND)

    # 🔹 Guardamos o actualizamos el estado
    estado_factura, creado = EstadoFactura.objects.update_or_create(
        factura=factura,
        defaults={
            "proceso_pedido": proceso_pedido,
            "estado_pedido": estado_pedido
        }
    )
    print(f"✅ EstadoFactura {'creado' if creado else 'actualizado'}: {estado_factura.proceso_pedido}, {estado_factura.estado_pedido}")

    # 📌 Guardar en detalle_factura solo si el pedido fue aceptado o completado
    if estado_pedido.lower() in ["aceptado", "completado"]:
        pedidos = Pedido.objects.filter(factura=factura)
        print(f"📦 Número de pedidos asociados a la factura: {pedidos.count()}")

        for pedido in pedidos:
            print("🔹 Procesando pedido:", pedido.id, pedido.nombre_producto, pedido.cantidad, pedido.subtotal)

            # Evitar duplicados en detalle_factura
            ya_existe = DetalleFactura.objects.filter(
                factura=factura,
                nombre_producto=pedido.nombre_producto
            ).exists()
            print(f"   > Ya existe en detalle_factura?: {ya_existe}")

            if not ya_existe:
                detalle = DetalleFactura.objects.create(
                    factura=factura,
                    id_producto=pedido.id_producto,
                    nombre_producto=pedido.nombre_producto,
                    precio_unitario=Decimal(pedido.precio_unitario),
                    cantidad=pedido.cantidad,
                    subtotal=Decimal(pedido.subtotal),
                    categoria_producto=getattr(pedido.producto.id_categoria, 'nombre', None)
                )
                print(f"   ✅ Guardado en detalle_factura: {detalle.nombre_producto}")

    mensaje = "Estado creado correctamente." if creado else "Estado actualizado correctamente."
    print("🏁 Finalizando función:", mensaje)
    return Response({"mensaje": mensaje}, status=status.HTTP_200_OK)

#cronograma
@api_view(["GET"])
#@permission_classes([IsAuthenticated])
def historial_pedidos(request):
    """
    Retorna las facturas del usuario separadas en aceptadas y rechazadas,
    según el último estado registrado en EstadoFactura.
    """
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


class CronogramaMiUsuarioView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # solo usuarios autenticados

    def get(self, request, id_usuario):
        # Validar que el usuario existe y es trabajador
        try:
            usuario = Usuario.objects.get(id_usuario=id_usuario, rol='trabajador')
        except Usuario.DoesNotExist:
            return Response(
                {"error": "Usuario no encontrado o no es trabajador"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Opcional: solo permitir que el trabajador vea su propio cronograma o admins
        if request.user.id != usuario.id and not request.user.rol == 'admin':
            return Response({"error": "No autorizado"}, status=status.HTTP_403_FORBIDDEN)

        cronogramas = Cronograma.objects.filter(id_usuario=id_usuario)
        serializer = CronogramaTrabajadorSerializer(cronogramas, many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)

