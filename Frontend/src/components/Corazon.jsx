import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Corazon = ({ productoId, onFavoritoChange }) => {
  const [favorito, setFavorito] = useState(false);
  const [idFavorito, setIdFavorito] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const verificarFavorito = async () => {
      try {
        const res = await api.get("/api/carrito/favoritos/");
        const item = res.data.find(f => f.producto === productoId);
        setFavorito(!!item);
        if (item) setIdFavorito(item.id);
      } catch (err) {
        console.error("Error al verificar favorito", err);
      }
    };

    verificarFavorito();
  }, [productoId]);

  const toggleFavorito = async () => {
    if (cargando) return;

    setCargando(true);
    try {
      if (favorito) {
        await api.delete(`/api/carrito/favoritos/${idFavorito}/`);
        setFavorito(false);
        setIdFavorito(null);
      } else {
        const res = await api.post(`/api/carrito/favoritos/`, { producto: productoId });
        setFavorito(true);
        setIdFavorito(res.data.id);
      }

      if (typeof onFavoritoChange === 'function') onFavoritoChange();
      window.dispatchEvent(new CustomEvent('favoritos-actualizados'));
    } catch (error) {
      console.error("Error al actualizar favorito", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <button
      onClick={toggleFavorito}
      style={{ background: "none", border: "none", cursor: cargando ? "wait" : "pointer", fontSize: "1.5rem" }}
      disabled={cargando}
      aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {favorito ? "❤️" : "🤍"}
    </button>
  );
};

export default Corazon;
