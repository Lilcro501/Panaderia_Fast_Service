import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/App';
import './assets/styles/Global.css';

import { CarritoProvider } from './Context/CarritoContext'; // 👈 IMPORTANTE

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarritoProvider> {/* 👈 ENVUELVE AQUÍ */}
      <AppRouter />
    </CarritoProvider>
  </React.StrictMode>
);
