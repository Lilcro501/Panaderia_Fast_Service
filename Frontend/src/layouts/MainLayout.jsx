// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className='Layout-fondo'>
      <Header />
      <main style={{ padding: '2rem' }}>
        {children}
        <button onClick={handleClick} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#d97824', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Click
        </button>
        {showMessage && <p style={{ color: '#d97824', marginTop: '0.5rem' }}>Visit our page</p>}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
