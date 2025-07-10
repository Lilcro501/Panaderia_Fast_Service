// src/layouts/MainLayout.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='Layout-fondo'>
      <Header />
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
