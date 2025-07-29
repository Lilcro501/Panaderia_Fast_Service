from django.urls import path
from .views import listar_factura, listar_pedidos
from . import views

urlpatterns = [
    #vista para traer todas las facturas
    path('listas_facturas/', views.listar_factura, name='lista_facturas'),
    path('facturas/<int:id_factura>/pedidos/', listar_pedidos, name='listar_pedidos'),
]