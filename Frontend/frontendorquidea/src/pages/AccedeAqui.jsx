
import React from 'react';
import '../assets/styles/AccedeAqui.css';

export default function AccedeAqui() {
    const salir = () => {
        /* ~~~~~~ Redirección a la página de inicio ~~~~~~ */
        window.location.href = '/';
    };

    return (
        <section className='Contenedor'>
            <button className='Salir' onClick={salir}> X </button>
            <h1 className='IniciarSesion'>Iniciar sesión</h1>
            
            <input type='email' id='correo' placeholder='Correo'/>
            <br/>
            <input type='password' id='password' placeholder='Contraseña'/>
            <br/>
            <input type='checkbox' id='check'/>
            <label>Recordar mi contraseña</label>

            <a href='#'>Olvidaste tu contraseña?</a>
            <button className='Iniciar'> Iniciar sesión</button>
            
        </section> 
    );
}

