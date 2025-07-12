from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def obtener_carrito(request):
    data = {
        "productos": [
            {"nombre": "Pan de queso", "precio": 2500},
            {"nombre": "Galleta", "precio": 1000},
        ]
    }
    return JsonResponse(data)
