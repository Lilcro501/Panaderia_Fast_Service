# trabajador/urls.py
from django.urls import path
from .views import listar_pedidos, obtener_factura

urlpatterns = [
    path('listar-pedidos/', listar_pedidos, name='listar_pedidos'),
    path('facturas/<int:id_factura>/', obtener_factura, name='obtener_factura'),
]

