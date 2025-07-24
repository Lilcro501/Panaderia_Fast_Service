"""
WSGI config for orrquidea project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

#------------------------importaciones-------------------
#importamos el modulo os para interacturar con el sistema operativo
import os
#esta linea importa la funcion desde el modul, esta funcion se utilza para obtemer la aplicacion ASGI,
from django.core.wsgi import get_wsgi_application

#establecemos la variable de entorno
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'orquidea.settings')

#se llama para crear una instancia de la aplicacion ASGI, esta instancia se le asiganara a la variable , que es la que el servidor utilizara para manejar las solicitudes entrantes
application = get_wsgi_application()