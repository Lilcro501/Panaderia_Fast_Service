from django.urls import path
from . import views

urlpatterns = [
    path('crear-factura/', views.crear_factura, name='crear_factura'),
    path('carritos/crear-factura/', views.crear_factura),
    path('productos/<str:categoria_nombre>/', views.obtener_productos_por_categoria),
    path('registrar-pedido/', views.registrar_pedido, name='registrar_pedido'),
]

