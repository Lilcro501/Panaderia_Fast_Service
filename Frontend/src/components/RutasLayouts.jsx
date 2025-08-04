import React from 'react';
import { useRol } from '../Context/RolContext';

import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';

const RutasLayouts = ({ children }) => {
  const { rol, cargando } = useRol();

  if (cargando) return <div>Cargando...</div>; // Puedes reemplazar con <Loading /> si tienes un componente de carga

  const layoutMap = {
    cliente: MainLayout,
    admin: AdminLayout,
    trabajador: LayoutTrabajador,
    'sin-registrar': MainLayoutSinLogin,
  };

  const Layout = layoutMap[rol];

  return Layout ? <Layout>{children}</Layout> : null; // fallback si el rol no es reconocido
};

export default RutasLayouts;

