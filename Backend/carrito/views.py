from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.dateparse import parse_date, parse_time
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

import json
from .models import Factura, Producto, Categoria


@csrf_exempt  # Temporal para desarrollo; mejor usar autenticación en producción
@require_http_methods(["POST"])

def crear_factura(request):
    try:
        #eesta funcion toma el cuerpo del json y lo convierte en un objeto
        data = json.loads(request.body)
        #aca se crea un nuevo objeto en la base de datos usando el modelo de factura
        factura = Factura.objects.create(
            metodo_pago=data.get('metodo_pago'),  # Debes enviarlo desde React
            total=data.get('total'),              # También debes enviarlo
            cedula=data.get('cedula'),
            municipio=data.get('municipio'),      # Puedes usar "sector" en React y renombrarlo acá
            direccion_entrega=data.get('direccion'),
            apartamento=data.get('apartamento'),
            fecha_entrega=parse_date(data.get('fecha_entrega')),
            hora_entrega=parse_time(data.get('hora')),
            notas=data.get('informacion_adicional'),
            comprobante_archivo=data.get('comprobante_archivo')  # Este debe ser una cadena (por ahora)
        )
        #aca se devuelve una respuesta JSON con un mensaje de validacion de que se creo de manera correcta la factura
        return JsonResponse({'message': 'Factura creada correctamente', 'factura_id': factura.id_factura}, status=201)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def obtener_productos_por_categoria(request, categoria_nombre):
    try:
        categoria = Categoria.objects.get(nombre__iexact=categoria_nombre)
        productos = Producto.objects.filter(id_categoria=categoria)

        data = []
        for producto in productos:
            data.append({
                'id': producto.id_producto,
                'nombre': producto.nombre,
                'precio': float(producto.precio),
                'descripcion': producto.descripcion,
                'imagen': f'/media/{producto.imagen}',
                'fecha_vencimiento': str(producto.fecha_vencimiento),
            })

        return JsonResponse(data, safe=False)
    
    except Categoria.DoesNotExist:
        return JsonResponse({'error': 'Categoría no encontrada'}, status=404)
        