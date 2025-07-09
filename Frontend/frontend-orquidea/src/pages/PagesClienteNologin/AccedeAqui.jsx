
// ~~~~~~~ Importación de React y useState para manejar estado interno ~~~~~~~
import React, { useState } from 'react';

// ~~~~~~~ Hoja de estilos personalizada ~~~~~~~
import '../../assets/styles/Acceso.css';

// ~~~~~~~ Importación para navegación entre rutas ~~~~~~~
import { Link } from 'react-router-dom';

// ~~~~~~~ Íconos desde react-icons ~~~~~~~
import { FaUser, FaLock } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export default function AccedeAqui() {
    // ~~~~~~~ Hook para redirigir al inicio al presionar la X ~~~~~~~
    const salir = () => {
    window.location.href = '/';
    };

    // ~~~~~~~ Estados para los campos del formulario ~~~~~~~
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [enviado, setenviado] = useState(false);      // Bandera para mostrar errores al tocar el formulario
    const [validado, setValidado] = useState(false);  // Bandera para mostrar éxito

    // ~~~~~~~ Función de validación y manejo del envío del formulario ~~~~~~~
    const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de página
    setenviado(true);

    // Expresiones regulares para validaciones
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*\d)[A-Za-z\d]{6,}$/; // Mínimo 6 caracteres, al menos una letra y un número
    // ^ Inicio de la cadena
    // (?=.*\d)              // Al menos un número
    // [A-Za-z\d]{6,}        // Letras y números, mínimo 6 caracteres
    // $                    // Fin de la cadena

    const CorreoValido = regexCorreo.test(correo);
    const PasswordValida = regexPassword.test(password);

    if (!CorreoValido) {
        alert("El correo no es válido");
        return;
    }

    if (!PasswordValida) {
        alert("La contraseña debe tener al menos 6 caracteres, incluyendo letras y números");
        return;
    }

    setValidado(true);
    alert("Inicio de sesión exitoso");
    };

    return (
    <section className='Contenedor'>
        <form onSubmit={handleSubmit} noValidate>
        {/* Botón para cerrar */}
        <button className='Salir' type="button" onClick={salir}>
            <IoMdClose />
        </button>

        {/* Título del formulario */}
        <h1 className='TituloAcceso'>Inicia sesión</h1>

        {/* Campo de correo */}
        <div className={`Campo form-control ${!correo && enviado ? 'is-invalid' : correo && validado ? 'is-valid' : ''}`}>
            <FaUser className="Icono" />
            <input
            type='email'
            id='correo'
            placeholder='Correo'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            />
            {!correo && enviado && <div className="invalid-feedback">Por favor, ingresa un correo válido</div>}
        </div>

        {/* Campo de contraseña */}
        <div className={`Campo form-control ${!password && enviado ? 'is-invalid' : password && validado ? 'is-valid' : ''}`}>
            <FaLock className="Icono" />
            <input
            type='password'
            id='password'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            {!password && enviado && <div className="invalid-feedback">Ingresa una contraseña válida.</div>}
        </div>

        {/* Opciones extra */}
        <div className="Opciones">
            <label>
            <input type='checkbox' id='check' name='check' />
            Recordar mi contraseña
            </label>
            <Link to="/OlvidoContraseña">¿Olvidaste tu contraseña?</Link>
        </div>

        {/* Botón para enviar el formulario */}
        <button className='Continuar' type='submit'>Iniciar sesión</button>

        {/* Enlace para registro */}
        <p className="Registro">
            ¿No estás registrado? <Link to="/Registro">Regístrate</Link>
        </p>
        </form>
    </section>
    );
}
