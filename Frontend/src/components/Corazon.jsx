import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Corazon = ({ productoId, onFavoritoChange }) => {
  const [favorito, setFavorito] = useState(false);
  const [idFavorito, setIdFavorito] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Verificar estado inicial del favorito
  useEffect(() => {
    const verificarFavorito = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:8000/api/favoritos/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
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
    const token = localStorage.getItem("access");
    if (!token || cargando) return;

    console.log("📤 Enviando a favoritos:", { producto: productoId });

    setCargando(true);
    try {
      if (favorito) {
        await axios.delete(`http://localhost:8000/api/favoritos/${idFavorito}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorito(false);
        setIdFavorito(null);
      } else {
        const res = await axios.post(
          `http://localhost:8000/api/favoritos/`,
          { producto: productoId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        setFavorito(true);
        setIdFavorito(res.data.id);
      }
      
      // Notificar cambios
      if (typeof onFavoritoChange === 'function') {
        onFavoritoChange();
      }
      window.dispatchEvent(new CustomEvent('favoritos-actualizados'));
    } catch (error) {
      console.error("Error al actualizar favorito", error);
      if (error.response) {
        console.error("Detalle del error del backend:", JSON.stringify(error.response.data, null, 2));
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <button 
      onClick={toggleFavorito} 
      style={{ 
        background: "none", 
        border: "none", 
        cursor: cargando ? "wait" : "pointer",
        fontSize: "1.5rem"
      }}
      disabled={cargando}
      aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {favorito ? "❤️" : "🤍"}
    </button>
  );
};

export default Corazon;



