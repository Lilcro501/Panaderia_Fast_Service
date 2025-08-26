import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/Header.css';
import logo from '../assets/images/logo_header.png';
import carritoIcon from '../assets/icons/icono-carrito.svg';
import icono from '../assets/icons/icono-perfil.png';

import ModalCarrito from './ModalCarrito';
import { FaHeart } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useCarrito } from '../context/CarritoContext'; // ajusta la ruta si tu archivo está en otra carpeta

const Header = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  // obtener carrito desde el contexto
  const carritoCtx = useCarrito();
  const carrito = carritoCtx?.carrito ?? [];

  // cantidad total sumando la propiedad quantity de cada item
  const totalProductos = carrito.reduce((acc, item) => acc + (item.quantity || 0), 0);

  // animación "bump" cuando cambia la cantidad
  const [bump, setBump] = useState(false);
  useEffect(() => {
    if (totalProductos === 0) return; // opcional: no animar si es 0
    setBump(true);
    const t = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(t);
  }, [totalProductos]);

  return (
    <header className="header shapedividers_com-5996">
      <div className="contenido-header">

        {/* logo con tooltip */}
        <div className="logo-container tooltip-container">
          <Link to="/Home">
            <img src={logo} alt="logo-panaderia" className="estilo-logo" />
            <span className="tooltip-text">Inicio</span>
          </Link>
        </div>

        <div className="barra-navegacion">
          <nav className="menu-secundario">
            <ul className="lista-info-c">
              <li className="tooltip-container">
                <Link to="/CalificarExperiencia" className='sin-subrayado'>
                  <BsEmojiSmileFill className='iconos-info' />
                  <span className="tooltip-text">Calificar experiencia</span>
                </Link>
              </li>

              <li className="tooltip-container">
                <Link to="/Conocenos" className='sin-subrayado'>
                  <AiOutlineQuestionCircle className='iconos-info' />
                  <span className="tooltip-text">Conócenos</span>
                </Link>
              </li>

              <li
                className="tooltip-container"
                onClick={() => (window.location.href = "/Favoritos")}
              >
                <FaHeart className='iconos-info' />
                <span className="tooltip-text">Favoritos</span>
              </li>
            </ul>
          </nav>
        </div>

        {/* icono perfil con tooltip */}
        <div className='logo-container tooltip-container'>
          <Link to="/PerfilUsuario">
            <img src={icono} className='estilo-logo-perfil' alt='perfillogo' />
            <span className="tooltip-text">Perfil</span>
          </Link>
        </div>

        {/* icono carrito con badge */}
        <div
          className="icono-carrito tooltip-container"
          onClick={() => setMostrarModal(true)}
          role="button"
          aria-label="Abrir carrito"
        >
          <img
            src={carritoIcon}
            alt="Carrito"
            style={{ cursor: 'pointer' }}
          />

          {totalProductos > 0 && (
            <span
              className={`badge-carrito ${bump ? 'bump' : ''}`}
              aria-live="polite"
              aria-label={`${totalProductos} productos en el carrito`}
            >
              {totalProductos}
            </span>
          )}

          <span className="tooltip-text">Carrito</span>
        </div>
      </div>

      <ModalCarrito visible={mostrarModal} onClose={() => setMostrarModal(false)} />
    </header>
  );
};

export default Header;
