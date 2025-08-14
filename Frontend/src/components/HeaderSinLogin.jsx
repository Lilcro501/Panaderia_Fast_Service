
import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/Header.css';  /* ~~~~~~ Estilo del encabezado ~~~~~~ */
import logo from '../assets/images/logo_header.png'; /* ~~~~~~ Logo de la panadería ~~~~~~ */
import carritoIcon from '../assets/icons/icono-carrito.svg'; /* ~~~~~~ Icon del carrito de compras ~~~~~~ */

/* ~~~~~~ Encabezado constante ~~~~~~ */
const HeaderSinLogin = () => { 
  return (
    <header className="header shapedividers_com-5996">
      <div className="contenido-header">

        {/* ~~~~~~~~~~~~~ Logo ~~~~~~~~~~~~~ */}
        <div className="logo-container">
          <Link to='/'>
            <img className="estilo-logo" src={logo} alt="logo-panaderia" />
          </Link>
        </div>

        {/* ~~~~~~~~~~~~~~~~ Barra de buscador ~~~~~~~~~~~~~~~~ */}
        <div className="barra-navegacion">

          {/* ~~~~~~~~~~~~~~~~ Lista de navegación superior ~~~~~~~~~~~~~~~~ */}
          <nav className="menu-secundario">
            <ul className="lista-info">
              <Link className='formato-link' to="/Conocemos">Conocenos</Link>
              <Link className='formato-link' to="/AccedeAqui">Accede aqui</Link>
            </ul>
          </nav>
        </div>

        {/* ~~~~~~~~~~~~~~~~ Icon del carrito ~~~~~~~~~~~~~~~~ */}
        <div className="icono-carrito">
          <img src={carritoIcon} alt="Carrito" />
        </div>

      </div>
    </header>
  );
};

/* ~~~~~~ Exportar el encabezado constante ~~~~~~ */
export default HeaderSinLogin;

