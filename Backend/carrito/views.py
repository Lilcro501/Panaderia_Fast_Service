from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.dateparse import parse_date, parse_time
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

import json
from .models import Factura, Producto, Categoria, Pedido
from usuarios.models import Usuario




@csrf_exempt  # Temporal para desarrollo; mejor usar autenticación en producción
@require_http_methods(["POST"])
@csrf_exempt
def crear_factura(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            usuario_id = data.get('id_usuario')
            usuario = Usuario.objects.get(id=usuario_id)

            factura = Factura.objects.create(
                id_usuario=usuario,
                fecha=datetime.now(),  # Puedes cambiar si quieres que el frontend la envíe
                metodo_pago=data.get('metodo_pago'),
                total=data.get('total'),
                cedula=data.get('cedula'),
                direccion_entrega=data.get('direccion_entrega'),
                fecha_entrega=parse_date(data.get('fecha_entrega')),
                notas=data.get('notas', ''),
                comprobante_archivo=data.get('comprobante_archivo', '')
            )

            return JsonResponse({
                'message': 'Factura creada correctamente',
                'factura_id': factura.id_factura
            }, status=201)

        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

###########################################################################

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
                'stock': producto.stock,
            })

        return JsonResponse(data, safe=False)
    
    except Categoria.DoesNotExist:
        return JsonResponse({'error': 'Categoría no encontrada'}, status=404)


#registra el pedido en la base de datos
@csrf_exempt
def registrar_pedido(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            pedidos = data.get('pedidos', [])  # Lista de pedidos
            factura_id = data.get('factura_id')

            for item in pedidos:
                id_producto = item.get('id_producto')
                cantidad = item.get('cantidad')

                # Verificar existencia del producto
                producto = Producto.objects.get(id_producto=id_producto)

                if producto.stock < cantidad:
                    return JsonResponse({'error': f'Stock insuficiente para el producto ID {id_producto}'}, status=400)

                # Registrar pedido
                Pedido.objects.create(
                    id_producto=id_producto,
                    cantidad=cantidad,
                    facturas_id_factura=factura_id
                )

                # Actualizar el stock del producto
                producto.stock -= cantidad
                producto.save()

            return JsonResponse({'message': 'Pedidos registrados correctamente'}, status=201)

        except Producto.DoesNotExist:
            return JsonResponse({'error': 'Producto no encontrado'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


