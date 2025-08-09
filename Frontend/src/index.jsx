import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/App';
import './assets/styles/Global.css';
import { CarritoProvider } from './Context/CarritoContext';
import { FavoritosProvider } from './Context/FavoritosContext';
import { RolProvider } from './Context/RolContext'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import InicioHome from './components/InicioHome';

const RootApp = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <InicioHome />;
  }
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
