from django.core.mail import EmailMessage
from django.template.loader import render_to_string

#este moulo proporciona funcionalidades extras para utilzar en diferentes partes de la aplicacion

#defimos una funcion para enviar un correo electronico con la factura al usuario que realizo la compra con los detalles de la factura y su total
def enviar_factura_por_correo(factura):
    #obtenemos los datos del usuario
    usuario = factura.usuario
    #obtenemos los pedidos asiciados a la factura 
    pedidos = factura.pedidos.all()

    #definimos el asunto
    subject = f"Factura #{factura.id} - Panadería Fast Service"
    #definimos el destinatario del correo electronico que sera el correo del usuario
    to_email = usuario.email

    # Renderizar plantilla HTML para el correo
    #en esta linea generamos el contenido del correo electronico con la plantilla html y los datos de la factur
    message = render_to_string('email/factura.html', {
        'usuario': usuario,
        'factura': factura,
        'pedidos': pedidos,
    })  

    #creamos una instancia de EmailMessage para enviar el correo electronico con el contenido y el destinatario
    email = EmailMessage(subject, message, to=[to_email])
    #especificamos que el contenido del correo es html
    email.content_subtype = "html" 

    # Adjuntar comprobante si está disponible
    if factura.comprobante:
        email.attach_file(factura.comprobante.path)
    #enviamos el correo electronico
    email.send()
