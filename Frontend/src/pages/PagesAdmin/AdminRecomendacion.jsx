import React, { useEffect, useState } from 'react';
import Tabla_opinion from '../../components/Tabla_opinion'; // Asegúrate que la ruta esté correcta

const AdminRecomendaciones = () => {
  const [opiniones, setOpiniones] = useState([]);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('opinionesClientes')) || [];
    setOpiniones(datosGuardados);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Opiniones de Clientes</h1>
      <Tabla_opinion datos={opiniones} />
    </div>
  );
};

export default AdminRecomendaciones;
