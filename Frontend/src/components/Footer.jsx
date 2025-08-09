import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css';
import logoFooter from '../assets/icons/logo-Fast_Service.png';
import { BiSolidCookie } from "react-icons/bi";
import VentanaCookies from '../components/VentanaCookies';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [mostrarCookies, setMostrarCookies] = useState(false);
  return (
    <footer className="footer shapedividers_com-9705">
      {/* Banner de cookies */}
      {mostrarCookies && (
        <VentanaCookies
          onAceptar={() => setMostrarCookies(false)}
          onRechazar={() => setMostrarCookies(false)}
        />
      )}
      <div className="footer-content-col">
        <div className="footer-row">
          <div className="footer-logo-wrap">
            <div className="footer-cookie">
              <BiSolidCookie className="footer-cookie-icon" onClick={() => setMostrarCookies(true)} />
            </div>
            <div>
              <Link to="/Home">
                <img src={logoFooter} alt="Logo Fast Service" className="footer-logo-square" />
              </Link>
            </div>
          </div>
          <div className="footer-contact-row">
            <div className="footer-contact-col">
              <div className="footer-contact-title"><FaPhoneAlt style={{ marginRight: '8px' }} />Llámanos</div>
              <div className="footer-contact-info">+57 3589271058</div>
            </div>
            <div className="footer-contact-col">
              <div className="footer-contact-title"><FaEnvelope style={{ marginRight: '8px' }} />Escríbenos</div>
              <div className="footer-contact-info">fservie28.076@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <div className="footer-legal-links">
            <Link to="/InfoLegal" className="footer-legal-link">Información Legal</Link>
            <span className="footer-legal-sep">|</span>
            <Link to="/ManifiestoConsumidor" className="footer-legal-link">Manifiesto del consumidor</Link>
          </div>
          <div className="footer-copyright">© FastService 2025</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
