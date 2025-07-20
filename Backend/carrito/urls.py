from django.urls import path
from . import views
from .views import ListaCrearFavoritos, EliminarFavorito

urlpatterns = [
    # Crear factura
    path('crear-factura/', views.crear_factura, name='crear_factura'),

    # Productos por categoría
    path('productos/<str:categoria_nombre>/', views.obtener_productos_por_categoria),

    # Registrar pedido
    path('registrar-pedido/', views.registrar_pedido, name='registrar_pedido'),

    # Obtener producto por ID
    path('producto/<int:id>/', views.obtener_producto_por_id, name='obtener_producto_por_id'),

    # Favoritos
    path('favoritos/', ListaCrearFavoritos.as_view(), name='listar_crear_favoritos'),
    path('favoritos/<int:pk>/', EliminarFavorito.as_view(), name='eliminar_favorito'),
]
