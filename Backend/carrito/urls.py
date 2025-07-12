from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.obtener_carrito),  # ejemplo: /api/carrito/items/
]
