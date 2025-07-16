from django.urls import path

from .views import (
    login_usuario,
    registrar_usuario,
    enviar_codigo_verificacion,
    verificar_codigo,
    cambiar_password,
    login_google
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,    # Login con JWT
    TokenRefreshView,       # Renovar access token
    TokenBlacklistView      # Logout (requiere blacklist configurado)
)

urlpatterns = [
    #vistas personalizadas (sin JWT)
    path('login/', login_usuario),
    path('registro/', registrar_usuario),
    path('enviar-codigo/', enviar_codigo_verificacion),
    path('verificar-codigo/', verificar_codigo),
    path('cambiar-password/', cambiar_password),
    

    # Autenticación con JWT
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),  # Opcional
    path('login/google/', login_google),
]

