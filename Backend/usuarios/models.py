#--------------Imporaciones de modulos----------
#importamos models para obtener las clases y funciones necesarias para definir modelos de la base de datos

from django.db import models
#AbstractBaseUser: esta clase se utilza como base para crear un modelo de usuario personalizado, este proporciona funcionalidad basica de autenticacion, como el manejo de contraseñas

# BaseUser Manager: Esta clase se utiliza para crear un administrador de usuarios personalizados, facilita la creacion de usuarios y la gestion de ligica realcionada con la creacion de usuarios

#PermissionsMixin: esta clase se utilza para agregar funcionalidades de permisos a un modelo de usuarioo, permite gestionar grupos y permisos de manera mas sencilla
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# se importa el modulo de django que proporciona funcuones para trabajr con fechas y horas en relacion a las fechas horarias
from django.utils import timezone

#en esta clase heredamos BaseUsreManager para poder utilzar funcionalidades basicas de gestion de usuarios que proporciona django
class UsuarioManager(BaseUserManager):
    #definimos el metodo create_user para crear un nuevo usuario 
    def create_user(self, email, password=None, **extra_fields):
        #validamos de que se haya ingresado un correo 
        if not email:
            #en tal caso de que no se ingrese lanzara el siguiente error
            raise ValueError('El correo es obligatorio')
        #normalize_email, lo utilzamos para pasar el correo a un formato estandar (minusculas)
        email = self.normalize_email(email)
        #en creamos un  nuevo modelo de usuario, que se asocia al adminstrador,, utilzando el correo electronico y los otros campos adicionales
        user = self.model(email=email, **extra_fields)
        ##establecemos la contraseña, primero hasheamos la contraeña para que se mande encriptada a la base de datos ¿
        user.set_password(password)
        # se guarda la instancia de la base de datos utilzando en metetodo 
        user.save(using=self._db)
        return user
    #definimos el metodo crear_superuser, que contendra todos lo permisos
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('rol', 'admin')
        return self.create_user(email, password, **extra_fields)



#creamos el modelo de usuario con los atributos definidos enla tabla de la base de datos

class Usuario(AbstractBaseUser):
    #definimos los roles de los usuarios que van a ingresar
    ROLES = (
        ('cliente', 'Cliente'),
        ('trabajador', 'Trabajador'),
        ('admin', 'Administrador'),
    )
    #definimos los atributos de la tabla de modelo
    id_usuario = models.AutoField(primary_key=True)  # debe coincidir con tu base de datos
    email = models.EmailField(unique=True, max_length=150)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    rol = models.CharField(max_length=20, choices=ROLES)
    fecha_registro = models.DateTimeField()
    #validamos si el usuuario esta activo
    is_active = models.BooleanField(default=True)
    #en este campo validamos si el usuario tiene permisos de acceso al pande de administracion
    is_staff = models.BooleanField(default=False)
    #campo en el cual se utilzara para la autenticacion
    USERNAME_FIELD = 'email'
    #campos requeridos al momento de ingresar datos en el modelo
    REQUIRED_FIELDS = ['nombre', 'apellido', 'rol']

    #este se asigna a al gestor perzonalizado en el cual se encargara de la creacion e instancias de usuario
    objects = UsuarioManager()
    #metodo de representacion
    #aca definimos como se representara el objeto usuario
    def __str__(self):
        return f"{self.email} ({self.rol})"
    #propiedad adicional, que devuelve el id del usuario, permite accede al id del usuario atravez de usuario.id
    @property
    def id(self):
        return self.id_usuario

    #hacemos referncia a la tabla y realizamos el ajuste para que django no haga ninguna modificacion en la tabla de la base de datos
    class Meta:
        db_table = 'usuarios'
        managed = False  
    


#modelo para la verficacion del correo con los 4 dgitos
#validamos el numero de verificacion que tiene el usuario para que este se pueda alamcenar y no volver a ser utilizado
class CodigoVerificacion(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField()
    codigo = models.CharField(max_length=4)
    creado = models.DateTimeField()
    usado = models.BooleanField(default=False)
    #definimos el modelo de con la clase de metadatos, conectandolo con la tabla ya establecida en la base de datos
    class Meta:
        #hacemos refencia a la tabla de la base de datos
        db_table = 'codigo_verificacion'
        #no realizar ninguna modificacion de este
        managed = False

    def __str__(self):
        return f'{self.email} - {self.codigo} - {"Usado" if self.usado else "Activo"}'

