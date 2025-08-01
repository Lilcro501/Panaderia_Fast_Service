"""
URL configuration for orrquidea project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


#-----------------------Importaciones-------------------------
#admin: modulo para el pande de administracion de django
from django.contrib import admin
#con este moldulo se definen las rutas URL e incluir configuraciones de otras urls 

from django.urls import path, include

#este modulo envia respuestas en formato JSON
from django.http import JsonResponse

#manejo de archivos estaticos y multimedia
from django.conf import settings
from django.conf.urls.static import static


def home(request):
    return JsonResponse({"mensaje": "Django funcionando correctamente 🔥"})

urlpatterns = [
    path('', home),  # Ruta raíz
    path('admin/', admin.site.urls),
    path('api/', include('administrador.urls')),
    #este modulo incluye todas las rutas de la app carrito
    path('api/carrito', include('carrito.urls')),  # Esto expone todo lo de carrito en /api/
    #esta es la app de usuarios
    path('api/usuarios/', include('usuarios.urls')),
    path('api/', include('trabajador.urls')),
]

#Configuracion para archivos multimedia
#esto permite que se puedan ver las imagenes en el navegador
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)