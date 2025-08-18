import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoFooter from '../assets/icons/logo-Fast_Service.png'; // ~~~~~~ Logo de FastService ~~~~~~
import { BiSolidCookie } from "react-icons/bi";
import VentanaCookies from '../components/VentanaCookies'; // ~~~~~~ Ventana cookies ~~~~~~
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../assets/styles/Footer.css'; // ~~~~~~ Estilos del footer ~~~~~~


const Footer = () => {
  const [mostrarCookies, setMostrarCookies] = useState(false); 
  const [mensajeError, setMensajeError] = useState(""); // 👈 mensaje emergente
  const navigate = useNavigate();

  // 🔹 Validar rol antes de navegar
  const handleLinkProtegido = (ruta) => {
    const rol = localStorage.getItem("rol"); 
    if (rol === "cliente") {
      navigate(ruta); 
    } else {
      setMensajeError("Inicia sesión como cliente para poder ver este apartado.");
      setTimeout(() => setMensajeError(""), 3000); // limpiar mensaje en 3s
    }
  };

  return (
    <>
      <footer className="footer shapedividers_com-9705">
        {/* ~~~~~~ Banner de cookies abajo de todo ~~~~~~ */}
        {mostrarCookies && (
          <VentanaCookies
            onAceptar={() => setMostrarCookies(false)}
            onRechazar={() => setMostrarCookies(false)}
          />
        )}
        
        <div className="Cookies">
          <BiSolidCookie onClick={() => setMostrarCookies(true)} />
        </div>
    
        <div className="logo">
          <Link to='/Home'>
            <img className='LogoFS' src={logoFooter} alt="Logo Fast Service" />
          </Link>
        </div>

        <div className="informacion">
          <div>
            <h5 style={{ textAlign: 'center' }}>
              <FaPhoneAlt style={{ marginRight: '8px' }} />
              Llámanos</h5>
            <li>+57 3589271058</li>
          </div>
          <div>
            <h5>
              <FaEnvelope style={{ marginRight: '8px' }} />
              Escríbenos</h5>
            <li>fservie28.076@gmail.com</li>
          </div>
        </div>

        <br />

        <div className="links-agrupar">
          <span className='separar'>
            <button 
              className="link-boton" 
              onClick={() => handleLinkProtegido("/InfoLegal")}
            >
              Información Legal
            </button>
          </span>
          |
          <span>
            &nbsp;
            <button 
              className="link-boton" 
              onClick={() => handleLinkProtegido("/ManifiestoConsumidor")}
            >
              Manifiesto del consumidor
            </button>
          </span> 
          <p className='FastService'> © FastService 2025 </p>
        </div>
      </footer>

      {/* 🔹 Ventana emergente */}
      {mensajeError && (
        <div className="ventana-emergente">
          {mensajeError}
        </div>
      )}
    </>
  );
};

export default Footer;