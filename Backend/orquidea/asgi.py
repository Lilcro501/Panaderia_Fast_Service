"""
ASGI config for orrquidea project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""



#importamos el modulo de os
import os
#importa la funcion de este modulo, se utilza para obtener la aplicacion ASGI
from django.core.asgi import get_asgi_application

#aca se establece la variable de entorno que le dice a django donde encontrar la configuracion de la aplicacion
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'orquidea.settings')
#se llama para crear una instancia, se asigna en una variable, que es la de que el servidor utilzara para utilzar para manejar solicitudes entrantes
application = get_asgi_application()
