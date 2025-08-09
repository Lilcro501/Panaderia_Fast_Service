import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import '../css/InicioHome.css';
import AppRouter from '../routes/App';
import { CarritoProvider } from '../Context/CarritoContext';
import { FavoritosProvider } from '../Context/FavoritosContext';
import { RolProvider } from '../Context/RolContext'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

const animationUrl = 'https://assets2.lottiefiles.com/packages/lf20_touohxv0.json';

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

  if (showSplash) {
    return (
      <div id="splash" className="contenedor">
        <div id="lottie" ref={lottieRef}></div>
        <h1 className="titulo-cafe">¡Bienvenido!</h1>
      </div>
    );
  }

  // Renderiza la app real después del splash
  return (
    <GoogleOAuthProvider clientId="119440441788-nilibr4jvgeu1gkvbu81v32c5i53cu12.apps.googleusercontent.com">
      <BrowserRouter>
        <RolProvider> 
          <CarritoProvider>
            <FavoritosProvider>
              <AppRouter />
            </FavoritosProvider>
          </CarritoProvider>
        </RolProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default InicioHome;
