from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet,
    ProductoViewSet,
    CronogramaViewSet,
    UsuarioViewSet,
    ValoracionViewSet,
    EstadisticasView, 
    listar_facturas,
    productos_por_categoria,
    ventas_por_fecha
)

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet, basename='categorias')
router.register(r'productos', ProductoViewSet, basename='productos')
router.register(r'cronograma', CronogramaViewSet, basename='cronograma')
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')
router.register(r'valoraciones', ValoracionViewSet, basename='valoraciones')

urlpatterns = [
    path('', include(router.urls)),

    # Endpoints adicionales personalizados
    path('estadisticas/', EstadisticasView.as_view(), name='estadisticas'),
    path('facturas/', listar_facturas, name='facturas'),
    path('productos-por-categoria/', productos_por_categoria, name='productos_por_categoria'),
    path('ventas-por-fecha/', ventas_por_fecha, name='ventas_por_fecha'),
]
