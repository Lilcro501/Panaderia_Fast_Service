# trabajador/urls.py
from django.urls import path
from .views import listar_pedidos, obtener_factura, notificar_pedido, historial_pedidos,listar_estados_pedidos, actualizar_estado_pedido, CronogramaMiUsuarioView

urlpatterns = [
    path('listar-pedidos/', listar_pedidos, name='listar_pedidos'),
    path('facturas/<int:id_factura>/', obtener_factura, name='obtener_factura'),
    path('notificar-pedido/', notificar_pedido, name="notificar_pedido"),
    path('historial-pedidos/', historial_pedidos, name='historial_pedidos'),
    path('estados-pedidos/', listar_estados_pedidos),
    path('actualizar-estado/',actualizar_estado_pedido, name="actualizar_estado_pedido"),
    path('cronograma/<int:id_usuario>/', CronogramaMiUsuarioView.as_view(), name='cronograma-trabajador'), # cronograma
]

