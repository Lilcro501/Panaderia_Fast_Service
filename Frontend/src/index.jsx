import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/App';
import './assets/styles/Global.css';

import { CarritoProvider } from './Context/CarritoContext';
import { FavoritosProvider } from './Context/FavoritosContext';
import { RolProvider } from './Context/RolContext'; 
import { SesionProvider } from './Context/SesionProvider'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="809142625017-shc1bn94eni4795cekkssugdjhmikqop.apps.googleusercontent.com">
      <BrowserRouter>
        <RolProvider> 
          <CarritoProvider>
            <FavoritosProvider>
              <SesionProvider> 
                <AppRouter />
              </SesionProvider>
            </FavoritosProvider>
          </CarritoProvider>
        </RolProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
