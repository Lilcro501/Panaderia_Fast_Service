
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';
import logo from '../assets/images/logo_header.png';
import carritoIcon from '../assets/icons/icono-carrito.svg';
import PerfilLogo from '../assets/icons/logo.png';
import ModalCarrito from './ModalCarrito';
import { FaUser, FaHeart } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";

const Header = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <header className="header shapedividers_com-9705">
      <div className="contenido-header">
        {/* Logo a la izquierda */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo-panaderia" className="estilo-logo" />
          </Link>
        </div>

        {/* Navegación centrada */}
        <nav className="barra-navegacion">
          <ul className="lista-info">
            <li>
              <Link to="/Conocenos" className="header-btn">
                <FaUser style={{ marginRight: '8px' }} />
                Conócenos
              </Link>
            </li>
            <li>
              <Link to="/CalificarExperiencia" className="header-btn">
                <BsEmojiSmileFill style={{ marginRight: '8px' }} />
                Calificar Experiencia
              </Link>
            </li>
            <li onClick={() => (window.location.href = "/Favoritos")}> 
              <FaHeart style={{ marginRight: '8px' }} />
              Favoritos
            </li>
          </ul>
        </nav>

        {/* Perfil y carrito a la derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5em' }}>
          <Link to="/PerfilUsuario">
            <img src={PerfilLogo} className="estilo-logo-perfil" alt="perfil-logo" />
          </Link>
          <div className="icono-carrito">
            <img
              src={carritoIcon}
              alt="Carrito"
              onClick={() => setMostrarModal(true)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
      {/* Modal del carrito */}
      <ModalCarrito visible={mostrarModal} onClose={() => setMostrarModal(false)} />
    </header>
  );
};

export default Header;