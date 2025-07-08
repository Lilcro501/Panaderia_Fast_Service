
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';  /* ~~~~~~ Estilo del encabezado ~~~~~~ */
import logo from '../assets/images/logo_header.png'; /* ~~~~~~ Logo de la panadería ~~~~~~ */
import PerfilLogo from '../assets/icons/logo.png'; /* ~~~~~~ Ícono de perfil ~~~~~~ */


/* ~~~~~~ Encabezado constante ~~~~~~ */
const HeaderTrabajador = () => { 
    return (
    <header className="header shapedividers_com-5996">
        <div className="contenido-header">
            
            {/* ~~~~~~~~~~~~~ Logo ~~~~~~~~~~~~~ */}
            <div className="logo-container">
                <Link to='/Inicio'>
                    <img className="estilo-logo" src={logo} alt="logo-panaderia"/>
                </Link>
            </div>
            
            <div className='logo-container'>
                <Link to="/EditarPerfil">
                    <img src={PerfilLogo} className='estilo-logo-perfil' alt='perfillogo' />
                </Link>
            </div>
        </div>
    </header>
    );
};

/* ~~~~~~ Exportar el encabezado constante ~~~~~~ */
export default HeaderTrabajador;

