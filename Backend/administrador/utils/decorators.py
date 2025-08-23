from functools import wraps
from django.http import JsonResponse

def role_required(roles_permitidos):
    """
    Decorador para restringir acceso según el rol del usuario.
    Ejemplo: @role_required(["admin", "trabajador"])
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            user = request.user

            if not user.is_authenticated:
                return JsonResponse({"error": "No autenticado"}, status=401)

            if getattr(user, "rol", None) not in roles_permitidos:
                return JsonResponse({"error": "Acceso denegado"}, status=403)

            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator
