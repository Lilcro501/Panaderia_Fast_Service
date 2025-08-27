import React from 'react';
//importar las rutas 
import { Link } from 'react-router-dom';
import '../assets/styles/HeaderAdmin.css';  
import logo from '../assets/images/logo_header.png';
import BotonCerrarSesion from './BotonCerrarSesion';

const HeaderAdmin = () => {
    const numeroWhatsApp = "573001234567"; // Cambia al número que quieras
    const mensaje = "Hola, necesito asistencia"; // Mensaje por defecto
    const linkWhatsApp = `https://wa.me/${3126945009}?text=${encodeURIComponent(mensaje)}`;

    return (
        <header className="header shapedividers_com-5996">
            <div className="contenido-header">
                {/* LOGO */}
                <Link to='/PrincipalAdmin' className='container'>
                    <img src={logo} alt="logo-panaderia"  className="estilologo"/>
                </Link>

                {/* Enlace a WhatsApp */}
                <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="link-comunicacion">
                    Comunicación
                </a>

                <BotonCerrarSesion />
            </div>
        </header>
    );
};

export default HeaderAdmin;
