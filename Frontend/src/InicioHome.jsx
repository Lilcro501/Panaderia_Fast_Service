import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import '../css/InicioHome.css';

const animationUrl = 'https://assets10.lottiefiles.com/packages/lf20_8TfICKnQBF.json'; // Animación de ejemplo

const InicioHome = () => {
  const [showSplash, setShowSplash] = useState(true);
  const lottieRef = useRef(null);

  useEffect(() => {
    let animInstance;
    fetch(animationUrl)
      .then(res => res.json())
      .then(data => {
        animInstance = lottie.loadAnimation({
          container: lottieRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data,
        });
      });
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => {
      clearTimeout(timer);
      if (animInstance) animInstance.destroy();
    };
  }, []);

  return (
    <div>
      {showSplash ? (
        <div id="splash" className="contenedor">
          <div id="lottie" ref={lottieRef}></div>
          <h1 className="titulo-cafe">¡Bienvenido!</h1>
        </div>
      ) : (
        <div id="main-content">
          {/* Aquí va el contenido principal de tu página */}
          <h2>Contenido principal</h2>
          <p>Este es el contenido que se mostrará después de la animación.</p>
        </div>
      )}
    </div>
  );
};

export default InicioHome;
