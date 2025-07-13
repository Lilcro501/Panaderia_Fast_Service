import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css'; // ~~~~~~ Estilos del footer ~~~~~~
import logoFooter from '../assets/icons/logo-Fast_Service.png'; // ~~~~~~ Logo de FastService ~~~~~~
import { BiSolidCookie } from "react-icons/bi";
import VentanaCookies from '../components/VentanaCookies'; // ~~~~~~ Ventana cookies ~~~~~~

const FooterSinLogin = () => {
const [mostrarCookies, setMostrarCookies] = useState(false); // ~~~~~~ Estado para mostrar u ocultar cookies ~~~~~~

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
          <Link to='/'>
            <img src={logoFooter} alt="Logo Fast Service" />
          </Link>
        </div>

        <div className="informacion">
          <div>
            <h5 style={{ textAlign: 'center' }}>Llámanos</h5>
            <li>+57 300842511</li>
          </div>
          <div>
            <h5>Escríbenos</h5>
            <li>fservie28.076@gmail.com</li>
          </div>
        </div>

        <br />

        <div className="links-agrupar">
          <span>
            <p> {/* &nbsp; para hacer un espaciado*/}
              
              <a href="InfoLegal">Información legal</a> &nbsp; | &nbsp; <a href="ManifiestoConsumidor">Manifiesto del consumidor</a>
            </p>
          </span>
        </div>
      </footer>
    </>
  );
};

export default FooterSinLogin;

