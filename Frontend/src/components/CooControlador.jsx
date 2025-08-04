import React, { useState, useEffect } from 'react';
import VentanaCookies from './VentanaCookies';

export default function CookiesControlador() {
  const [mostrarBanner, setMostrarBanner] = useState(false);

  useEffect(() => {
    const decisionUsuario = localStorage.getItem('cookiesDecision');
    if (!decisionUsuario) {
      setMostrarBanner(true);
    }
  }, []);

  const manejarDecision = (decision) => {
    localStorage.setItem('cookiesDecision', decision);
    setMostrarBanner(false);
  };

  return (
    <>
      {mostrarBanner && (
        <>
          {/* Fondo oscuro bloqueador */}
          <div className="fondo-bloqueador"></div>

          {/* Ventana de cookies */}
          <VentanaCookies
            onAceptar={() => manejarDecision('aceptado')}
            onRechazar={() => manejarDecision('rechazado')}
          />
        </>
      )}
    </>
  );
}
