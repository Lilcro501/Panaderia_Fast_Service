
/* ~~~~~~~ Importar React y el useState para manejar cambios de estado en el componente  ~~~~~~~ */
import React from 'react';

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

// se importa la para navegar entre paginas
import { Link } from 'react-router-dom';

/* ~~~~~~~ Importación de íconos desde react-icons ~~~~~~~ */

/* ~~~~~~~ Icons de usuario y candado ~~~~~~~ */
import { FaUser, FaLock } from 'react-icons/fa'; 

/* ~~~~~~~ Icon de X (Salir) ~~~~~~~ */
import { IoMdClose } from 'react-icons/io'; 

/* ~~~~~~~ Componente funcional AccedeAqui ~~~~~~~ */
export default function AccedeAqui() {

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

        <h1 className='TituloAcceso'>Inicia sesión</h1>

        {/* ~~~~~~~ Campos de entrada ~~~~~~~ */ }
        <div className="Campo">
        <FaUser className="Icono" /> {/* Ícono de usuario */}
        <input type='email' id='correo' placeholder='Correo'/>
        </div>
        
        <div className="Campo">
            < FaLock className="Icono" /> {/* Ícono de candado */}
            <input type='password' id='password' placeholder='Contraseña'/>
        </div>

        {/* ~~~~~~~ Otras opciones ~~~~~~~ */}
        <div className="Opciones">
        <label> <input type='checkbox' id='check'/>Recordar mi contraseña </label>

        {/* ~~~~~~~ Enlace para recuperar contraseña ~~~~~~~ */}
        <Link to="/OlvidoContraseña">Olvidate tu contraseña</Link>
        </div>

        {/* ~~~~~~~ Botón para iniciar sesión ~~~~~~~ */}
        <Link to="/">
        <button className='Continuar'>Iniciar sesión</button>
        </Link>

        {/* ~~~~~~~ Enlace para usuarios no registrados ~~~~~~~ */}
        <p className="Registro"> ¿No estás registrado? <a href="Registro">Regístrate</a> </p>
    </section>
    );
}
