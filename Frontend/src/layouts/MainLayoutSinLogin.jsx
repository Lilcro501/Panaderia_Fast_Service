// src/layouts/MainLayout.jsx
import React from 'react';
import HeaderSinLogin from '../components/HeaderSinLogin';
import FooterSinLogin from '../components/FooterSinLogin';

const MainLayoutSinLogin = ({ children }) => {
  return (
    <>
      <HeaderSinLogin />
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
      <FooterSinLogin/>
    </>
  );
};

export default MainLayoutSinLogin;
