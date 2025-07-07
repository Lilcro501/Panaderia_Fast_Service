import "../assets/styles/Corazon.css";
import React, { useState, useEffect } from "react";
import { useFavoritos } from "../Context/FavoritosContext";

export default function HeartButton({ producto }) {
  const { favoritos, agregarFavorito, eliminarFavorito } = useFavoritos();
  const [activo, setActivo] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const yaEsta = favoritos.some((item) => item.id === producto.id);
    setActivo(yaEsta);
  }, [favoritos, producto.id]);

  const toggleHeart = () => {
    if (activo) {
      eliminarFavorito(producto.id);
      setPopup(`❌ ${producto.nameProduct} eliminado de favoritos`);
    } else {
      agregarFavorito(producto);
      setPopup(`❤️ ${producto.nameProduct} añadido a favoritos`);
    }
    setActivo(!activo);

    // Ocultar popup después de 2 segundos
    setTimeout(() => setPopup(null), 2000);
  };

  return (
    <>
      <button
        className={`heart-button ${activo ? "activo" : ""}`}
        onClick={toggleHeart}
        aria-label="Agregar o quitar de favoritos"
      >
        ❤️
      </button>

      {popup && <div className="popup-mini">{popup}</div>}
    </>
  );
}

