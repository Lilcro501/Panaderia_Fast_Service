#vistas admin
from django.shortcuts import render
from rest_framework import viewsets, status,generics
from rest_framework.response import Response
from rest_framework.decorators import action, api_view 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Func
from django.db.models.functions import TruncMonth,TruncDate
from .serializers import (CategoriaSerializer, ProductoSerializer, CronogramaSerializer,UsuarioSerializer,ValoracionSerializer,PedidoSerializer)
from .models import Categorias,Productos,Cronograma,Usuarios,Valoraciones,Facturas,Pedido, EstadoFactura
from .serializers import FacturaSerializer
import cloudinary.uploader
from cloudinary.uploader import destroy as cloudinary_destroy
from usuarios.models import Usuario
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .utils.decorators import role_required
from django.utils.decorators import method_decorator
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from carrito.models import DetalleFactura
from django.db.models import F



class ProductoCreateView(APIView):
    def post(self, request):
        try:
            data = request.data.copy()
            
            # Obtener la categoría
            categoria_id = data.get('id_categoria_id')
            categoria = Categorias.objects.get(id_categoria=categoria_id)
            
            # Subir imagen a Cloudinary en la carpeta correspondiente
            if 'file' in request.FILES:
                file = request.FILES['file']
                folder_name = f"productos/{categoria.nombre.lower()}"
                
                upload_result = cloudinary.uploader.upload(file,folder=folder_name)
                data['imagen'] = upload_result['secure_url']
                data['imagen_public_id'] = upload_result['public_id']
            
            # Crear el producto
            producto = Productos.objects.create(
                nombre=data.get('nombre'),
                precio=data.get('precio'),
                descripcion=data.get('descripcion'),
                stock=data.get('stock'),
                fecha_vencimiento=data.get('fecha_vencimiento'),
                imagen=data.get('imagen'),
                imagen_public_id=data.get('imagen_public_id'),
                id_categoria=categoria
            )
            
            return Response({
                'id': Productos.id_producto,
                'nombre': producto.nombre,
                'imagen': producto.imagen
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProductoUpdateView(generics.UpdateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer

    def update(self, request, *args, **kwargs):
        producto = self.get_object()
        nueva_imagen = request.FILES.get("imagen")

        if nueva_imagen:
            # 1️⃣ Eliminar imagen anterior en Cloudinary
            if producto.imagen_public_id:
                cloudinary.uploader.destroy(producto.imagen_public_id)

            # 2️⃣ Subir nueva imagen
            upload_data = cloudinary.uploader.upload(
                nueva_imagen,
                folder="productos"
            )

            producto.imagen = upload_data.get("secure_url")
            producto.imagen_public_id = upload_data.get("public_id")

        producto.nombre = request.data.get("nombre", producto.nombre)
        producto.precio = request.data.get("precio", producto.precio)
        producto.descripcion = request.data.get("descripcion", producto.descripcion)

        producto.save()
        serializer = self.get_serializer(producto)
        return Response(serializer.data)



class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Productos.objects.all() 
    
    def get_queryset(self):
        queryset = Productos.objects.all()
        nombre_categoria = self.request.query_params.get('categoria')
        if nombre_categoria:
            queryset = queryset.filter(id_categoria__nombre__iexact=nombre_categoria)
        return queryset
    
    def destroy(self, request, *args, **kwargs):
        producto = self.get_object()

        pedidos_relacionados = Pedido.objects.filter(id_producto=producto.id_producto)

        if pedidos_relacionados.exists():
            facturas_ids = pedidos_relacionados.values_list('facturas_id_factura', flat=True)

            # Traer todos los estados relacionados para depuración
            estados_facturas = EstadoFactura.objects.filter(
                facturas_id_factura__in=facturas_ids
            ).values('proceso_pedido', 'estado_pedido')

            print("DEBUG -> Estados encontrados:", list(estados_facturas))

            fases_bloqueo = ['preparando', 'empaquetando', 'en entrega']

            # 🔹 Bloqueo si está en proceso activo
            if EstadoFactura.objects.filter(
                facturas_id_factura__in=facturas_ids,
                proceso_pedido__in=fases_bloqueo
            ).exists():
                return Response(
                    {"error": "No se puede eliminar este producto porque está asociado a pedidos en proceso."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # 🔹 Bloqueo si algún pedido está aún "por validar"
            if EstadoFactura.objects.filter(
                facturas_id_factura__in=facturas_ids,
                estado_pedido='por validar'
            ).exists():
                return Response(
                    {"error": "No se puede eliminar este producto porque tiene pedidos en estado 'por validar'."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ✅ Si todos están en 'completado' y estado_pedido es 'aceptado' o 'rechazado', se permite

        # 🔹 Elimina imagen en Cloudinary si existe
        public_id = getattr(producto, 'imagen_public_id', None)
        if public_id:
            cloudinary_destroy(public_id)

        producto.delete()
        return Response({"message": "Producto eliminado con éxito"}, status=status.HTTP_200_OK)


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categorias.objects.all()
    serializer_class = CategoriaSerializer

class CronogramaViewSet(viewsets.ModelViewSet):
    queryset = Cronograma.objects.all()
    serializer_class = CronogramaSerializer
    @action(detail=False, methods=['get'], url_path='trabajadores')
    def trabajadores(self, request):
        trabajadores_cronograma = Cronograma.objects.filter(id_usuario__rol='trabajador')
        serializer = self.get_serializer(trabajadores_cronograma, many=True)
        return Response(serializer.data)


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=['get'], url_path='trabajadores')
    def trabajadores(self, request):
        trabajadores = Usuarios.objects.filter(rol='trabajador')
        serializer = self.get_serializer(trabajadores, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email y contraseña requeridos'}, status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=False, methods=['post'], url_path='registro')
    def registro(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()
            return Response({'mensaje': 'Usuario registrado con éxito'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.get(email=email)
            if usuario.check_password(password):
                # ✅ Generar tokens JWT
                refresh = RefreshToken.for_user(usuario)
                access = str(refresh.access_token)

                return Response({
                    'mensaje': 'Login exitoso',
                    'access': access,
                    'refresh': str(refresh),
                    'rol': usuario.rol,
                    'id_usuario': usuario.id,
                    'nombre': usuario.nombre
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuarios.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='registro')
    def registro(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()
            return Response({'mensaje': 'Usuario registrado con éxito'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ValoracionViewSet(viewsets.ModelViewSet):
    queryset = Valoraciones.objects.all()
    serializer_class = ValoracionSerializer

    def get_queryset(self):
        producto_id = self.request.query_params.get("producto_id")
        if producto_id:
            return Valoraciones.objects.filter(id_producto=producto_id)
        return super().get_queryset()

@api_view(['GET'])
def listar_facturas(request):
    facturas = Facturas.objects.all().order_by('-fecha')
    serializer = FacturaSerializer(facturas, many=True)
    return Response(serializer.data)


class EstadisticasView(APIView):
    def get(self, request):
        try:
            # 🔹 Producto más vendido
            producto_data = (
                DetalleFactura.objects
                .values('nombre_producto')
                .annotate(total_vendidos=Sum('cantidad'))
                .order_by('-total_vendidos')
                .first()
            )

            producto_mas_vendido = {
                'nombre': producto_data['nombre_producto'],
                'cantidad': producto_data['total_vendidos']
            } if producto_data else {'nombre': 'Sin datos', 'cantidad': 0}

            # 🔹 Ganancias por mes
            ganancias_data = (
                DetalleFactura.objects
                .values('factura_id', 'factura__fecha', 'factura__total')
                .distinct()  # evita duplicar la misma factura
                .annotate(mes=TruncMonth('factura__fecha'))
                .values('mes')
                .annotate(total_mes=Sum('factura__total'))
                .order_by('mes')
            )

            ganancias_por_mes = [
                {
                    'mes': item['mes'].strftime('%Y-%m') if item['mes'] else 'N/A',
                    'total': float(item['total_mes']) if item['total_mes'] else 0
                } for item in ganancias_data
            ]

            return Response({
                'producto_mas_vendido': producto_mas_vendido,
                'ganancias_por_mes': ganancias_por_mes
            }, status=status.HTTP_200_OK)

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def productos_por_categoria(request):
    categoria_id = request.GET.get('categoria_id')
    
    if not categoria_id:
        return Response({'error': 'categoria_id es requerido'}, status=400)

    productos = Productos.objects.filter(id_categoria=categoria_id)

    productos_data = []
    max_vendidos = {'nombre': '', 'cantidad': 0}

    for producto in productos:
        total_vendidos = Pedido.objects.filter(id_producto=producto).aggregate(total=Sum('cantidad'))['total'] or 0
        productos_data.append({
            'nombre': producto.nombre,
            'cantidad_vendida': total_vendidos,
        })
        if total_vendidos > max_vendidos['cantidad']:
            max_vendidos = {'nombre': producto.nombre, 'cantidad': total_vendidos}

    return Response({
        'productos': productos_data,
        'mas_vendido': max_vendidos
    })

@api_view(['GET'])
def ventas_por_fecha(request):
    fecha = request.GET.get('fecha')  # formato: '2025-07-29'
    if not fecha:
        return Response({'error': 'Fecha no proporcionada'}, status=400)
    
    pedidos = Pedido.objects.annotate(
        fecha_sin_hora=TruncDate('factura__fecha')
    ).filter(fecha_sin_hora=fecha).values(
        'id_producto__nombre'
    ).annotate(
        total_vendidos=Sum('cantidad'),
        total_ganancia=Sum('subtotal')
    ).order_by('-total_vendidos')

    return Response(pedidos)
