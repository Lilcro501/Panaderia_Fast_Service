# administrador/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet,
    ProductoViewSet,
    CronogramaViewSet,
    UsuarioViewSet,
    ValoracionViewSet,
    EstadisticasView, 
    listar_facturas
)

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'cronograma', CronogramaViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'valoraciones', ValoracionViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/estadisticas/', EstadisticasView.as_view(), name='estadisticas'),
    path('api/facturas/', listar_facturas),]
