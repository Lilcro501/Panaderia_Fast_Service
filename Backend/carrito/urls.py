from django.urls import path
from . import views

urlpatterns = [
    #creamos la ulr para crear la factura
    path('crear-factura/', views.crear_factura, name='crear_factura'),
    #creamos la url para obtener los productos por categoria
    path('productos/<str:categoria_nombre>/', views.obtener_productos_por_categoria),
    #creamos la url para registrar el pedido
    path('registrar-pedido/', views.registrar_pedido, name='registrar_pedido'),
    #creamos la url para obtener los productos por id
    path('producto/<int:id>/', views.obtener_producto_por_id, name='obtener_producto_por_id'),
    
]

