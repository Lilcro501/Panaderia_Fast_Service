
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';

const RutaConLayout = ({ children }) => {
    const rol = localStorage.getItem('rol');

    switch (rol) {
    case 'Cliente':
        return <MainLayout>{children}</MainLayout>;
    case 'Admin':
        return <AdminLayout>{children}</AdminLayout>;
    case 'Trabajador':
        return <LayoutTrabajador>{children}</LayoutTrabajador>;
    case 'SinRegistrar':
    default:
        return <MainLayoutSinLogin>{children}</MainLayoutSinLogin>;
    }
};

export default RutaConLayout;
