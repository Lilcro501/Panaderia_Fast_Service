import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Categoria from '../../components/Categoria';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/favoritos/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de tener el token guardado
          }
        });
        const productos = response.data.map(item => item.producto); // extrae solo los productos
        setFavoritos(productos);
      } catch (err) {
        setError('Error al cargar los favoritos.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerFavoritos();
  }, []);

  if (cargando) {
    return <p style={{ textAlign: "center", marginTop: "80px" }}>Cargando favoritos...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "80px" }}>{error}</p>;
  }

  if (favoritos.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Sin productos favoritos aún ❤️</h2>
      </div>
    );
  }

  return (
    <>
      <br />
      <br />
      <br />
      <div>
        <Categoria nombre="Favoritos" productos={favoritos} />
      </div>
    </>
  );
}
