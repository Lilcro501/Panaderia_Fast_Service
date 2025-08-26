import React, { useState } from 'react';
import '../assets/styles/AccedeAqui.css'; // ~~~~~~ Estilos del banner ~~~~~~
import { BiSolidCookie } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* ~~~~~~ Componente funcional para el banner de cookies ~~~~~~ */
export default function VentanaCookies({ onAceptar, onRechazar }) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleAceptar = () => {
    if (onAceptar) onAceptar();
    setVisible(false); // 🔥 Cierra el banner
  };


  const handleLinkClick = (e) => {
    e.preventDefault(); // Evita la navegación por defecto
    setVisible(false); // 🔥 Cierra el banner
    navigate("/PoliticaCo");
  };

  if (!visible) return null; // Si no está visible, no se muestra nada

  return (
    <div className="FondoCookies">{/* ~~~~~~ Fondo del banner en la parte inferior ~~~~~~ */}
      <div className="VentanaC">{/* ~~~~~~ Contenedor del contenido ~~~~~~ */}
        
        {/* ~~~~~~ Icono de galleta ~~~~~~ */}
        <BiSolidCookie className="IconCookie" />

        {/* ~~~~~~ Mensaje informativo ~~~~~~ */}
        <h1 className='EnfoqueCookies'>Utilizamos cookies</h1>
        <p className='InfoCookies'>
          Usamos cookies para mejorar tu experiencia de navegación en nuestra web, 
          para mostrarte contenidos personalizados y analizar el tráfico de nuestra web. 
          <a href="/PoliticaCo" onClick={handleLinkClick}>
            <strong className='EnfoqueCookies'> Ver política de cookies.</strong>
          </a>
        </p>

        {/* ~~~~~~ Botones de acción ~~~~~~ */}
        <div className="BotonesCookies">
          <button className='Aceptar' onClick={handleAceptar}>Aceptar</button>
            <button className='Rechazar' onClick={handleAceptar}>Rechazar</button>
        </div>
      </div>
    </div>
  );
}


