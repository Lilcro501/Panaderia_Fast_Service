// src/components/Header.jsx
import React from 'react';
//importar las rutas 
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';  // Ajusta el path según dónde pongas el CSS
import logo from '../assets/images/logo_header.png';
import carritoIcon from '../assets/icons/icono-carrito.svg';
// Si usas Bootstrap Icons vía CDN no hace falta importarlo aquí
 import { FaRegUserCircle } from "react-icons/fa";
 import PerfilLogo from "../assets/icons/logo.png"



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
            <input type="text" id="buscar" placeholder="buscar" />
            <button type="submit" className="lupa">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* ~~~~~~~~~~~~~~~~ Lista de navegación al costado ~~~~~~~~~~~~~~~~ */}
          <nav className="menu-secundario">
            <ul className="lista-info">
              <li><a href="#">Conócenos</a></li>
                  <Link to="/CalificarExperiencia" className='sin-subrayado'><li>Calificar Experiencia</li></Link>
              <li><a href="#">Favoritos</a></li>
            </ul>
          </nav>
        </div>
        <div className='logo-container'>
          <Link to="/Perfil/usuario">
          <img src={PerfilLogo} className='estilo-logo-perfil' alt='perfillogo'></img></Link>
          
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
