from django.urls import path
from .views import login_usuario, registrar_usuario, enviar_codigo_verificacion, verificar_codigo, cambiar_password

urlpatterns = [
    path('login/', login_usuario),
    path('registro/', registrar_usuario),
    path('enviar-codigo/', enviar_codigo_verificacion),
    path('verificar-codigo/', verificar_codigo),
    path('cambiar-password/', cambiar_password)
]



