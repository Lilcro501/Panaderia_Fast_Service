// src/components/Footer.jsx
import React from 'react';
import '../assets/styles/Footer.css';  // Ajusta el path según dónde pongas el CSS
import logoFooter from '../assets/icons/logo-Fast_Service.png';


const Footer = () => {
  return (
    <footer className="footer shapedividers_com-9705">
      <div className="img-footer">
        <img src={logoFooter} alt="logo Fast Service" />
      </div>

      {/* Información footer */}
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

      {/* Políticas */}
      <div className="links-agrupar">
        <span>
          <p>
            <a href="#">Información legal</a> | <a href="#">Manifiesto del consumidor</a>
          </p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
