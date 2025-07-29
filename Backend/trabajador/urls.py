from django.urls import path
from .views import listar_factura
from . import views


urlpatterns = [
    #vista para traer todas las facturas
    path('facturas/<int:id_factura>/', views.listar_factura, name='obtener_factura'),
]

