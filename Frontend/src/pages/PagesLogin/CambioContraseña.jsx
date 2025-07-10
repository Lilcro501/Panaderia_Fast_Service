
import React from 'react'

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

import { useNavigate } from 'react-router-dom';

/* ~~~~~~~ Icon de X (Salir) ~~~~~~~ */
import { IoMdClose } from 'react-icons/io'; 
import { FaUserLock, FaUnlockAlt } from 'react-icons/fa'; 


export default function CambioContraseña() {

    /* ~~~~~~~ Redirección a la página principal al presionar X ~~~~~~~ */
    const salir = () => {
    window.location.href = '/';
    };

    const navigate = useNavigate();

    const PaginaCodigo = () => {
    navigate('/');};
    return (
        <section className='Contenedor'>  
    
            {/* ~~~~~~~ Botón para cerrar el formulario ~~~~~~~ */ }
            <button className='salirboton' onClick={salir}>
                <IoMdClose /> {/* Ícono de X */}
            </button>

            <h1 className='TituloAcceso'>Cambio contraseña</h1>

            <p>No te preocupes, ingresa tu correo electrónico y te ayudaremos a recuperarla </p>
            {/* ~~~~~~~ Campos de entrada ~~~~~~~ */ }
            <div className="Campo">
                <FaUnlockAlt className="Icono" /> {/* Ícono de candado */}
                <input type='password' id='password' placeholder='Contraseña nueva'/>
            </div>

            <div className="Campo">
                < FaUserLock  className="Icono" /> {/* Ícono de candado con user*/}
                <input type='password' id='password' placeholder='Confirmar contraseña'/>
            </div>
            
            <div className="Opciones">
            <label> <input type='checkbox' id='check'/>Recordar mi contraseña </label>
            </div>

            {/* ~~~~~~~ Botón para continuar ~~~~~~~ */}
            <button className='Continuar' onClick={PaginaCodigo}> Enviar código </button>

        </section>
        );
}
