from django.core.mail import EmailMessage
from django.template.loader import render_to_string

def enviar_factura_por_correo(factura):
    usuario = factura.usuario
    pedidos = factura.pedidos.all()

    subject = f"Factura #{factura.id} - Panadería Fast Service"
    to_email = usuario.email

    # Renderizar plantilla HTML para el correo
    message = render_to_string('email/factura.html', {
        'usuario': usuario,
        'factura': factura,
        'pedidos': pedidos,
    })

    email = EmailMessage(subject, message, to=[to_email])
    email.content_subtype = "html"  # Muy importante para enviar HTML

    # Opcional: Adjuntar archivo de comprobante si existe
    if factura.comprobante:
        email.attach_file(factura.comprobante.path)

    email.send()
