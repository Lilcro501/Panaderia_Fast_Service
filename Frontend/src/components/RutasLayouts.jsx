// src/routes/RutaConLayout.jsx
import React from 'react';
import { useRol } from '../Context/RolContext';

import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';

const RutasLayouts = ({ children }) => {
  const { rol, cargando } = useRol();

  if (cargando) return null; // o puedes mostrar <Loading />

  switch (rol) {
    case 'cliente':
      return <MainLayout>{children}</MainLayout>;
    case 'administrador':
      return <AdminLayout>{children}</AdminLayout>;
    case 'trabajador':
      return <LayoutTrabajador>{children}</LayoutTrabajador>;
    case 'sinsegresar':
    default:
      return <MainLayoutSinLogin>{children}</MainLayoutSinLogin>;
  }
};

export default RutasLayouts;


