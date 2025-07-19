from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from django.core.mail import EmailMessage

def generar_factura_pdf(factura, pedidos):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setTitle(f"Factura_{factura.id}")  # Cambiado

    # Encabezado
    pdf.drawString(50, 750, f"Factura No. {factura.id}")  # Cambiado
    pdf.drawString(50, 735, f"Cliente: {factura.usuario.nombre} {factura.usuario.apellido}")
    pdf.drawString(50, 720, f"Correo: {factura.usuario.email}")
    pdf.drawString(50, 705, f"Fecha: {factura.fecha.strftime('%Y-%m-%d %H:%M')}")

    # Detalles de productos
    y = 670
    for pedido in pedidos:
        pdf.drawString(50, y, f"Producto ID: {pedido.id_producto} | Cantidad: {pedido.cantidad}")
        y -= 20

    pdf.drawString(50, y - 20, f"Total: ${factura.total}")
    pdf.save()

    buffer.seek(0)
    return buffer



def enviar_factura_por_correo(factura, pedidos):
    pdf_buffer = generar_factura_pdf(factura, pedidos)

    email = EmailMessage(
        subject='Tu factura de Panadería Fast Service',
        body='Gracias por tu compra. Adjuntamos tu factura en PDF.',
        from_email='tupanaderia@example.com',  # Cambia esto por un correo real
        to=[factura.usuario.email],
    )

    email.attach(f'Factura_{factura.id_factura}.pdf', pdf_buffer.read(), 'application/pdf')
    email.send()
