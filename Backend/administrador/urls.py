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
    listar_facturas,
    productos_por_categoria,
    ventas_por_fecha
)

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'cronograma', CronogramaViewSet)
#router.register(r'usuarios', UsuarioViewSet)
router.register(r'valoraciones', ValoracionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('estadisticas/', EstadisticasView.as_view(), name='estadisticas'),
    path('facturas/', listar_facturas),
    path('productos_por_categoria/', productos_por_categoria, name='productos_por_categoria'),
    path('ventas_por_fecha/', ventas_por_fecha)
    ]
