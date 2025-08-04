
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/Header.css';
import logo from '../assets/images/logo_header.png';
import carritoIcon from '../assets/icons/icono-carrito.svg';
import PerfilLogo from '../assets/icons/logo.png';
import { FaRegUserCircle } from "react-icons/fa";
import ModalCarrito from './ModalCarrito'; // 👈 importar el modal

const Header = () => {
  const [mostrarModal, setMostrarModal] = useState(false); // 👈 estado para modal

  return (
    <header className="header shapedividers_com-5996">
      <div className="contenido-header">
        <div className="logo-container">
          <Link to="/Home"><img src={logo} alt="logo-panaderia" className="estilo-logo" /></Link>
        </div>

        <div className="barra-navegacion">
          
          <nav className="menu-secundario">
            <ul className="lista-info">
              <Link to="/Conocenos" className='sin-subrayado'><li>Conócenos</li></Link>
              <Link to="/CalificarExperiencia" className='sin-subrayado'><li>Calificar Experiencia</li></Link>
              <li onClick={() => (window.location.href = "/Favoritos")}>Favoritos</li>

            </ul>
          </nav>
        </div>

        <div className='logo-container'>
          <Link to="/PerfilUsuario">
            <img src={PerfilLogo} className='estilo-logo-perfil' alt='perfillogo' />
          </Link>
        </div>

        <div className="icono-carrito">
          <img
            src={carritoIcon}
            alt="Carrito"
            onClick={() => setMostrarModal(true)} // 👈 mostrar modal
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Modal del carrito */}
      <ModalCarrito visible={mostrarModal} onClose={() => setMostrarModal(false)} />
    </header>
  );
};

export default Header;
