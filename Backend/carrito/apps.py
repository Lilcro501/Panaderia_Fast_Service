#---------------------importaciones---------------------
#importamos la app config para configuara las aplicacion de django
from django.apps import AppConfig

#definimos un clase llamda carritoConfig que hereda de AppConfig, para configurar la aplicacion de carrito
class CarritoConfig(AppConfig):
    #especificamos el tipo campo que se utilzara para los campos de clave primaria en el modelo por defecto
    default_auto_field = 'django.db.models.BigAutoField'
    #definimos el nombre de la aplicacion
    name = 'carrito'
