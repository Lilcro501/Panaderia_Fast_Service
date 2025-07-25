from django.urls import path
from .views import (
    login_usuario,
    enviar_codigo_verificacion,
    verificar_codigo,
    cambiar_password,
    login_google,
    CustomTokenObtainPairView 
)
from .views import registrar_usuario

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView,  # Opcional: para cerrar sesión
)

urlpatterns = [
    # Vistas personalizadas sin JWT
    path('login/', login_usuario),
    path('registro/', registrar_usuario),
    path('enviar-codigo/', enviar_codigo_verificacion),
    path('verificar-codigo/', verificar_codigo),
    path('cambiar-password/', cambiar_password),

    # Autenticación con JWT personalizada
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),  # Opcional

    # Login con Google
    path('login/google/', login_google),
]
#.