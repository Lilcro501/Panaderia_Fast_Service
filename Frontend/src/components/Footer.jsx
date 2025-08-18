import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css';
import logoFooter from '../assets/icons/logo-Fast_Service.png';
import { BiSolidCookie } from "react-icons/bi";
import VentanaCookies from '../components/VentanaCookies';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useRol } from '../context/RolContext'; // ✅ Importamos el hook del contexto

const Footer = () => {
  const [mostrarCookies, setMostrarCookies] = useState(false);

  const { rol, cargando } = useRol(); // ✅ Obtenemos rol y estado de carga

  // Roles permitidos para ver los links
  const rolesValidos = ["cliente", "trabajador", "admin"];
  const tieneAcceso = rolesValidos.includes(rol);

  if (cargando) return null; // ⏳ Mientras carga el contexto no mostramos nada

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
          {/* ✅ Solo mostrar si el rol es válido */}
          {tieneAcceso && (
            <>
              <span className='separar'>
                <Link to="/InfoLegal">Información Legal</Link>
              </span>
              |
              <span>
                &nbsp;
                <Link to="/ManifiestoConsumidor">Manifiesto del consumidor</Link>
              </span>
            </>
          )}
          <p className='FastService'> © FastService 2025 </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
