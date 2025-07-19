
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';

const RutaConLayout = ({ children }) => {
    const rol = localStorage.getItem('rol');

    switch (rol) {
    case 'cliente':
        return <MainLayout>{children}</MainLayout>;
    case 'administrador':
        return <AdminLayout>{children}</AdminLayout>;
    case 'trabajador':
        return <LayoutTrabajador>{children}</LayoutTrabajador>;
    case 'sinsegistrar':
    default:
        return <MainLayoutSinLogin>{children}</MainLayoutSinLogin>;
    }
};

export default RutaConLayout;