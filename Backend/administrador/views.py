from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from .models import Pedido, Productos, Facturas
from django.db.models.functions import TruncMonth
from .serializers import (CategoriaSerializer, ProductoSerializer, CronogramaSerializer,UsuarioSerializer,ValoracionSerializer)
from .models import Categorias,Productos,Cronograma,Usuarios,Valoraciones,Facturas
from .serializers import FacturaSerializer
import cloudinary.uploader
import re
from cloudinary.uploader import destroy as cloudinary_destroy
# Create your views here.






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

class ProductoUpdateView(APIView):
    def put(self, request, pk):
        try:
            producto = Productos.objects.get(id_producto=pk)
            data = request.data.copy()
            
            # Si hay una nueva imagen
            if 'file' in request.FILES:
                file = request.FILES['file']
                categoria = producto.id_categoria
                folder_name = f"productos/{categoria.nombre.lower()}"
                
                # Subir nueva imagen
                upload_result = cloudinary.uploader.upload(
                    file,
                    folder=folder_name
                )
                data['imagen'] = upload_result['secure_url']
                
                # Opcional: Eliminar la imagen anterior de Cloudinary
                # (implementar lógica para extraer public_id y eliminarla)
            
            # Actualizar otros campos
            for field in ['nombre', 'precio', 'stock', 'fecha_vencimiento', 'imagen', 'id_categoria_id']:
                if field in data:
                    setattr(producto, field, data[field])
            
            producto.save()
            return Response({'message': 'Producto actualizado'}, status=status.HTTP_200_OK)
            
        except Productos.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
        instance = self.get_object()

        # Intenta eliminar la imagen de Cloudinary si existe
        public_id = getattr(instance, 'imagen_public_id', None)
        if public_id:
            cloudinary_destroy(public_id)

        # Elimina el producto de la base de datos
        self.perform_destroy(instance)
        return Response({"detalle": "Producto eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)


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

class ValoracionViewSet(viewsets.ModelViewSet):
    queryset = Valoraciones.objects.all()
    serializer_class = ValoracionSerializer

class EstadisticasView(APIView):
    def get(self, request):
        # Producto más vendido
        producto_mas_vendido = (
            Pedido.objects.values('id_producto__nombre')
            .annotate(total_vendidos=Sum('cantidad'))
            .order_by('-total_vendidos')
            .first()
        )

        # Filtrar facturas con fecha válida
        facturas_validas = Facturas.objects.exclude(
            Q(fecha__isnull=True) | Q(fecha='0000-00-00 00:00:00')
        )

        # Ganancias por mes con control de errores
        ganancias_por_mes = (
            Facturas.objects
            .exclude(fecha__isnull=True)  # Evitar facturas sin fecha
            .annotate(mes=TruncMonth('fecha'))
            .values('mes')
            .annotate(total=Sum('total'))
            .order_by('mes')
        )

        return Response({
            "producto_mas_vendido": producto_mas_vendido,
            "ganancias_por_mes": list(ganancias_por_mes),
        })


@api_view(['GET'])
def listar_facturas(request):
    facturas = Facturas.objects.all().order_by('-fecha')
    serializer = FacturaSerializer(facturas, many=True)
    return Response(serializer.data)
