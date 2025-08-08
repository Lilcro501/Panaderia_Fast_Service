from django.core.mail import EmailMessage
from django.template.loader import render_to_string

# Función para enviar correo de bienvenida al usuario registrado
def enviar_correo_bienvenida(usuario):
    subject = "¡Bienvenido a Panadería Fast Service!"
    to_email = usuario.email

    # Renderizar plantilla HTML para el correo de bienvenida
    message = render_to_string('email/bienvenida.html', {
        'usuario': usuario,
    })

    email = EmailMessage(subject, message, to=[to_email])
    email.content_subtype = "html"  # Indicamos que es HTML
    email.send()
