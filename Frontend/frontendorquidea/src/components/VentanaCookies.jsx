
import React from 'react';
import '../assets/styles/Acceso.css'; // ~~~~~~ Estilos del banner ~~~~~~

/* ~~~~~~ Icono de cookies ~~~~~~ */
import { BiSolidCookie } from "react-icons/bi";

/* ~~~~~~ Componente funcional para el banner de cookies ~~~~~~ */
export default function VentanaCookies({ onAceptar, onRechazar }) {
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
            <a href='/PoliticaCookies'><strong className='EnfoqueCookies'> Ver política de cookies.</strong></a>
        </p>

        {/* ~~~~~~ Botones de acción ~~~~~~ */}
        <div className="BotonesCookies">
            <button className='Aceptar' onClick={onAceptar}>Aceptar</button>
            <button className='Rechazar' onClick={onRechazar}>Rechazar</button>
        </div>
        </div>
    </div>
    );
}


