from django.urls import path
from . import views
from .views import ListaCrearFavoritos, EliminarFavorito
from.views import ComentariosPorProductoView, CrearComentarioView, ComentarioDetalleView, enviar_encuesta

urlpatterns = [
    # Crear factura
    path('crear-factura/', views.crear_factura, name='crear_factura'),

    # Productos por categoría
    path('productos_categoria/<str:categoria_nombre>/', views.obtener_productos_por_categoria),

    # Obtener producto por ID
    path('producto/<int:id>/', views.obtener_producto_por_id, name='obtener_producto_por_id'),

    # Favoritos
    path('favoritos/', ListaCrearFavoritos.as_view(), name='listar_crear_favoritos'),
    path('favoritos/<int:pk>/', EliminarFavorito.as_view(), name='eliminar_favorito'),

    #comentarios 
    path('producto/<int:producto_id>/comentarios/', ComentariosPorProductoView.as_view(), name='comentarios-producto'),
    path('comentarios/', CrearComentarioView.as_view(), name='crear-comentario'),
    path('comentarios/<int:pk>/', ComentarioDetalleView.as_view(), name='detalle-comentario'),

    path('encuesta/', enviar_encuesta, name='enviar_encuesta'),
]