
/* ~~~~~~~ Importación de React y UseState para manejar estados ~~~~~~~ */
import React, { useState } from 'react';

/* ~~~~~~~ Importación de hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

/* ~~~~~~~ Importación de Link para navegación y useNavigate para redirecciones ~~~~~~~ */
import { Link, useNavigate } from 'react-router-dom';

/* ~~~~~~~ Importación de íconos de usuario y candado ~~~~~~~ */
import { FaUser, FaLock } from 'react-icons/fa';

/* ~~~~~~~ Ícono para botón de cerrar (X) ~~~~~~~ */
import { IoMdClose } from 'react-icons/io';

export default function AccedeAqui() {
    /* ~~~~~~~ Redirección a otras rutas ~~~~~~~ */
    const navigate = useNavigate();

    /* ~~~~~~~ Función para salir y volver a la página principal ~~~~~~~ */
    const salir = () => {
    window.location.href = '/';
    };

    /* ~~~~~~~ Estados para manejar el correo y la contraseña ~~~~~~~ */
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [enviado, setEnviado] = useState(false); /* ~~~~~~~  ~~~~~~~ */
    // Bandera para mostrar validaciones al hacer submit


    /* ~~~~~~~ Expresiones para validar  ~~~~~~~ */

    /* ~~~~~~~ Formato de correo electrónico ~~~~~~~ */
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ^               Inicio de la cadena
    // (?=.*\d)        Al menos un número
    // [A-Za-z\d]{6,}  Letras y números, mínimo 6 caracteres
    // $                Fin de la cadena

    /* ~~~~~~~ Formato de la contraseña ~~~~~~~ */
    /* ~~~~~~~ Mínimo 6 caracteres, con al menos una letra y un número ~~~~~~~ */
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    /* ~~~~~~~ Validaciones usando las expresiones anteriores ~~~~~~~ */
    const CorreoValido = regexCorreo.test(correo);
    const PasswordValida = regexPassword.test(password);

    /* ~~~~~~~ Función que se ejecuta al enviar el formulario ~~~~~~~ */
    const handleSubmit = (e) => {
    e.preventDefault();  /* ~~~~~~~ Evita el envío del formulario y la recarga de la página ~~~~~~~ */
    setEnviado(true);/* ~~~~~~~  Marca el formulario como enviado para buscar y mostrar errores ~~~~~~~ */

    /* ~~~~~~~ Si alguna de las validaciones no se cumple entonces vuelve ~~~~~~~ */
    if (!CorreoValido || !PasswordValida) return;
        navigate('/');
    };

    return (
    <section className='Contenedor'>
        <form onSubmit={handleSubmit} noValidate>

            {/* ~~~~~~~ Botón para cerrar y volver a la página principal ~~~~~~~ */}
            <button className='Salir' type="button" onClick={salir}>
                <IoMdClose />
            </button>

            <br/><br/>
            {/* ~~~~~~~ Título del formulario ~~~~~~~ */}
            <h1 className='TituloAcceso'>Inicia sesión</h1>

            {/* ~~~~~~~ Correo electrónico ~~~~~~~ */}
            <div className={`Campo form-control ${!CorreoValido && enviado ? 'is-invalid' : ''}`}>
                <FaUser className="Icono" />
                <input type='email' id='correo' placeholder='Correo' value={correo}
                onChange={(e) => setCorreo(e.target.value)} required />
            </div>
        
            {/* ~~~~~~~ Mensaje de error - correo no es válido ~~~~~~~ */}
            {!CorreoValido && enviado && (
                <div className="invalid">Por favor, ingresa un correo válido</div>
            )}

            {/* ~~~~~~~ Contraseña ~~~~~~~ */}
            <div className={`Campo form-control ${!PasswordValida && enviado ? 'is-invalid' : ''}`}>
                <FaLock className="Icono" />
                <input type='password' id='password' placeholder='Contraseña' value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {/* ~~~~~~~ Mensaje de error - contraseña no válida ~~~~~~~ */}
            {!PasswordValida && enviado && (
                <div className="invalid">
                Contraseña incorrecta
                </div>
            )}

            {/* ~~~~~~~ Sección inferior con opciones adicionales ~~~~~~~ */}
            <div className="Opciones">
                {/* ~~~~~~~ Checkbox para recordar contraseña ~~~~~~~ */}
                <label className='Label'>
                    <input type='checkbox' id='check' name='check' />
                    Recordar contraseña
                </label>

                {/* ~~~~~~~ Enlace para recuperar contraseña si la olvidó ~~~~~~~ */}
                <Link to="/OlvidoContraseña">¿Olvidaste tu contraseña?</Link>
            </div>

            {/* ~~~~~~~ Botón para enviar el formulario ~~~~~~~ */}
            <button className='Continuar' type='submit'>Iniciar sesión</button>

            {/* ~~~~~~~ Enlace para registrarse si no tiene cuenta ~~~~~~~ */}
            <p className="Registro">
                ¿No estás registrado? <Link to="/Registro">Regístrate</Link>
            </p>
        </form>
    </section>
    );
}
