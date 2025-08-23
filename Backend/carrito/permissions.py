from rest_framework.permissions import BasePermission

class EsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == "ADMIN"

class EsTrabajador(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == "TRABAJADOR"

class EsCliente(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == "cliente"