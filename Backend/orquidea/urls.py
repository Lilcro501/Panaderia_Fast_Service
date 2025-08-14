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
    path('api/administrador/', include('administrador.urls')),
    #este modulo incluye todas las rutas de la app carrito
    path('api/carrito/', include('carrito.urls')),  # Esto expone todo lo de carrito en /api/
    #esta es la app de usuarios
    path('api/usuarios/', include('usuarios.urls')),
    path('api/trabajador/', include('trabajador.urls')),
    
]

#Configuracion para archivos multimedia
#esto permite que se puedan ver las imagenes en el navegador
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

