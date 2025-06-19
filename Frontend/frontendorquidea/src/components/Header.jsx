// src/components/Header.jsx
import React from 'react';
import '../assets/styles/Header.css';  // Ajusta el path según dónde pongas el CSS
import logo from '../assets/images/logo_header.png';
import carritoIcon from '../assets/icons/icono-carrito.svg';
// Si usas Bootstrap Icons vía CDN no hace falta importarlo aquí

const Header = () => {
  return (
    <header className="header shapedividers_com-5996">
      <div className="contenido-header">

        {/* ~~~~~~~~~~~~~ Logo ~~~~~~~~~~~~~ */}
        <div className="logo-container">
          <img src={logo} alt="logo-panaderia" className="estilo-logo" />
        </div>

        {/* ~~~~~~~~~~~~~~~~ Barra de buscador ~~~~~~~~~~~~~~~~ */}
        <div className="barra-navegacion">
          <form className="buscador">
            <input type="text" id="buscar" placeholder="" />
            <button type="submit" className="lupa">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* ~~~~~~~~~~~~~~~~ Lista de navegación al costado ~~~~~~~~~~~~~~~~ */}
          <nav className="menu-secundario">
            <ul className="lista-info">
              <li><a href="#">Conócenos</a></li>
              <li><a href="#">Calificar experiencia</a></li>
              <li><a href="#">Favoritos</a></li>
            </ul>
          </nav>
        </div>

        {/* ~~~~~~~~~~~~~~~~ Carrito ~~~~~~~~~~~~~~~~ */}
        <div className="icono-carrito">
          <img src={carritoIcon} alt="Carrito" />
        </div>

      </div>
    </header>
  );
};

export default Header;
