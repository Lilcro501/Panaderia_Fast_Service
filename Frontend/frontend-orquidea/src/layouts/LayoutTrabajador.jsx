
import React from 'react';
import HeaderTrabajador from '../components/HeaderTrabajador'
import FooterTrabajador from '../components/FooterTrabajador';

const LayoutTrabajador = ({ children }) => {
    return (
    <>
        <HeaderTrabajador />
        <main style={{ padding: '2rem' }}>
        {children}
        </main>
        <FooterTrabajador/>
    </>
    );
};

export default LayoutTrabajador;
