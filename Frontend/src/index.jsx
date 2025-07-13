// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/App';
import './assets/styles/Global.css';

import { CarritoProvider } from './Context/CarritoContext';
import { FavoritosProvider } from './Context/FavoritosContext';
import { GoogleOAuthProvider } from '@react-oauth/google'; // importar google oautht

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="119440441788-nilibr4jvgeu1gkvbu81v32c5i53cu12.apps.googleusercontent.com">
      <CarritoProvider>
        <FavoritosProvider>
          <AppRouter />
        </FavoritosProvider>
      </CarritoProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);