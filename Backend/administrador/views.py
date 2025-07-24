from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, api_view 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from .models import Pedido, Productos, Facturas
from django.db.models.functions import TruncMonth
from .serializers import (CategoriaSerializer, ProductoSerializer, CronogramaSerializer,UsuarioSerializer,ValoracionSerializer)
from .models import Categorias,Productos,Cronograma,Usuarios,Valoraciones
from .models import Facturas, Estado
from .serializers import FacturaSerializer
# Create your views here.

class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Productos.objects.all() 
    
    def get_queryset(self):
        queryset = Productos.objects.all()
        nombre_categoria = self.request.query_params.get('categoria')
        if nombre_categoria:
            queryset = queryset.filter(id_categoria__nombre__iexact=nombre_categoria)
        return queryset


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
