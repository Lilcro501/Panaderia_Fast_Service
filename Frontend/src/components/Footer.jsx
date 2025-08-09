import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css'; // ~~~~~~ Estilos del footer ~~~~~~
import logoFooter from '../assets/icons/logo-Fast_Service.png'; // ~~~~~~ Logo de FastService ~~~~~~
import { BiSolidCookie } from "react-icons/bi";
import VentanaCookies from '../components/VentanaCookies'; // ~~~~~~ Ventana cookies ~~~~~~

const Footer = () => {
  const [mostrarCookies, setMostrarCookies] = useState(false); // ~~~~~~ Estado para mostrar u ocultar cookies ~~~~~~
  const [mostrarConstruccion, setMostrarConstruccion] = useState(true); // ~~~~~~ Estado para mostrar u ocultar aviso de construcción ~~~~~~

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
          {/* Ícono decorativo o para volver a mostrar las cookies si se ocultan */}
          <BiSolidCookie onClick={() => setMostrarCookies(true)} />
        </div>
    
        <div className="logo">
          <Link to='/Home'>
            <img src={logoFooter} alt="Logo Fast Service" />
          </Link>
        </div>

        <div className="informacion">
          <div>
            <h5 style={{ textAlign: 'center' }}>Llámanos</h5>
            <li>+57 3589271058 </li>
          </div>
          <div>
            <h5>Escríbenos</h5>
            <li>fservie28.076@gmail.com</li>
          </div>
        </div>

        {/* ~~~~~~ Aviso de que la página está en construcción ~~~~~~ */}
        {mostrarConstruccion && (
          <div className="aviso-construccion">
            🚧 Esta sección está en construcción 🚧
            <button 
              className="cerrar-aviso"
              onClick={() => setMostrarConstruccion(false)}
            >
              Cerrar
            </button>
          </div>
        )}

        <br />

        <div className="links-agrupar">
          <span className='separar'>
              <Link to="/InfoLegal">
                Información Legal
              </Link>
            </span>
            |
            <span>
              &nbsp;
              <Link to="/ManifiestoConsumidor">
                Manifiesto del consumidor
              </Link>
            </span> 
          <p className='FastService'> © FastService 2025 </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
