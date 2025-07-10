
import React from 'react'

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

import { useNavigate } from 'react-router-dom';

/* ~~~~~~~ Icon de X (Salir) ~~~~~~~ */
import { IoMdClose } from 'react-icons/io'; 
import { FaUser } from 'react-icons/fa'; 

//importar las rutas
import { Link } from 'react-router-dom';


export default function OlvidoContraseña() {

    /* ~~~~~~~ Redirección a la página principal al presionar X ~~~~~~~ */
    const salir = () => {
    window.location.href = '/';
    };

    const navigate = useNavigate();

    const PaginaCodigo = () => {
    navigate('/IngresarCodigo');};
    return (
        <section className='Contenedor'>  
    
            {/* ~~~~~~~ Botón para cerrar el formulario ~~~~~~~ */ }
            <button className='Salir' onClick={salir}>
            <IoMdClose /> {/* Ícono de X */}
            </button>
    
            <h1 className='TituloAcceso'>Olvido contraseña</h1>

            <p>No te preocupes, ingresa tu correo electrónico y te ayudaremos a recuperarla </p>
            {/* ~~~~~~~ Campos de entrada ~~~~~~~ */ }
            <div className="Campo">
                <FaUser className="Icono" /> {/* Ícono de usuario */}
                <input type='email' id='correo' placeholder='Correo'/>
            </div>
            {/* ~~~~~~~ Botón para continuar ~~~~~~~ */}
            <Link to="/IngresarCodigo">
            <button className='Continuar'> Enviar código </button>
            </Link>
        </section>
        );
}
