from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El correo es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('rol', 'admin')
        return self.create_user(email, password, **extra_fields)


class Usuario(AbstractBaseUser):
    ROLES = (
        ('cliente', 'Cliente'),
        ('trabajador', 'Trabajador'),
        ('admin', 'Administrador'),
    )

    id_usuario = models.AutoField(primary_key=True)  # debe coincidir con tu base de datos
    email = models.EmailField(unique=True, max_length=150)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    rol = models.CharField(max_length=20, choices=ROLES)
    fecha_registro = models.DateTimeField()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido', 'rol']

    objects = UsuarioManager()

    def __str__(self):
        return f"{self.email} ({self.rol})"
    
    @property
    def id(self):
        return self.id_usuario


    class Meta:
        db_table = 'usuarios'
        managed = False  # ⚠️ Para no modificar tu tabla existente
    


#modelo para la verficacion del correo con los 4 dgitos

class CodigoVerificacion(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField()
    codigo = models.CharField(max_length=4)
    creado = models.DateTimeField()
    usado = models.BooleanField(default=False)

    class Meta:
        db_table = 'codigo_verificacion'
        managed = False  # importante: no tocar con makemigrations

    def __str__(self):
        return f'{self.email} - {self.codigo} - {"Usado" if self.usado else "Activo"}'

