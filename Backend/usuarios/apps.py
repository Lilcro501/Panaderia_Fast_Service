#importaciones de los modulos
#Importamos la clase base del modulo app config
from django.apps import AppConfig



#creamos una subclase heredada de Usuarios.config
# esta calse contrendra toda la configuracion especifica para nuestra aplicacion de usuarios
class UsuariosConfig(AppConfig):
    #default_auto_field: especifica el tipo de campo que django usara ára las claves primarias autoincrementales
    default_auto_field = 'django.db.models.BigAutoField'
    #esta propiedad indica a django como encontrar la aplicacion "name "
    name = 'usuarios'
