
/* ~~~~~~~ Importar React y el useState para manejar cambios de estado en el componente  ~~~~~~~ */
import React, { useState } from 'react';

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

/* ~~~~~~~ Importación de íconos desde react-icons ~~~~~~~ */

/* ~~~~~~~ Icons de usuario y candado ~~~~~~~ */
import { FaUser, FaLock, FaUserLock, FaUserCheck  } from 'react-icons/fa'; 

/* ~~~~~~~ Icon de X (Salir) ~~~~~~~ */
import { IoMdClose } from 'react-icons/io'; 

/*importo la libreria de las rutas */

import { Link } from 'react-router-dom';

/* ~~~~~~~ Componente funcional AccedeAqui ~~~~~~~ */
export default function Registro() {
    /* ~~~~~~~ Redirección a la página principal al presionar X ~~~~~~~ */
    const salir = () => {
    window.location.href = '/';
    };

    return (
    <section className='Contenedor'>  

        {/* ~~~~~~~ Botón para cerrar el formulario ~~~~~~~ */ }
        <button className='Salir' onClick={salir}>
        <IoMdClose /> {/* Ícono de X */}
        </button>

        <h1 className='TituloAcceso'>Regístrate</h1>

        {/* ~~~~~~~ Campos de entrada ~~~~~~~ */ }
        <div className='Campo'>
            <FaUserCheck className='Icono'/> {/* Ícono de usuario*/}
            <input type='text' id='username' placeholder='Nombre de usuario'/>
        </div>
        <div className="Campo">
        <FaUser className="Icono" /> {/* Ícono de usuario */}
        <input type='email' id='correo' placeholder='Correo'/>
        </div>

        <div className="Campo">
            < FaLock className="Icono" /> {/* Ícono de candado */}
            <input type='password' id='password' placeholder='Contraseña'/>
        </div>
        
        <div className="Campo">
            < FaUserLock  className="Icono" /> {/* Ícono de candado con user*/}
            <input type='password' id='password' placeholder='Confirmar contraseña'/>
        </div>

        {/* ~~~~~~~ Otras opciones ~~~~~~~ */}
        <div className='Opciones'>
            <label> <input type='checkbox' id='check'/>Recordar mi contraseña </label>
        </div>
            

        <div className="EstiloAceptartyc">
            <label> <input type='checkbox' id='aceptartyc'/> Acepto los <strong>Términos y Condiciones</strong></label>
        </div>

        {/* ~~~~~~~ Botón para iniciar sesión ~~~~~~~ */}
        <Link to="/AccedeAqui">
        <button className='Continuar'>Registrarse</button>
        </Link>

        {/* ~~~~~~~ Enlace para usuarios no registrados ~~~~~~~ */}
        <p className="Registro"> ¿Ya estás registrado? <a href="AccedeAqui">Accede aquí</a> </p>
    </section>
    );
}
