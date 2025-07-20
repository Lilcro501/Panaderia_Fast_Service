import "../assets/styles/Corazon.css";
import React, { useState } from "react";
import axios from "axios";

export default function HeartButton({ productoId, esFavorito, actualizarFavoritos }) {
  const [activo, setActivo] = useState(esFavorito);
  const [popup, setPopup] = useState(null);
  const [favoritoId, setFavoritoId] = useState(null); // Guardar el ID del favorito creado

  const toggleHeart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para agregar favoritos.");
      return;
    }

    try {
      if (activo) {
        // Eliminar favorito
        await axios.delete(`http://localhost:8000/api/${favoritoId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPopup("❌ Eliminado de favoritos");
        actualizarFavoritos(productoId, false);
        setFavoritoId(null);
      } else {
        // Agregar favorito
        const response = await axios.post(
          "http://localhost:8000/api/",
          { producto: productoId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPopup("❤️ Añadido a favoritos");
        actualizarFavoritos(productoId, true);
        setFavoritoId(response.data.id); // Guardar el ID del favorito creado
      }

      setActivo(!activo);
      setTimeout(() => setPopup(null), 2000);
    } catch (error) {
      console.error("❌ Error al actualizar favoritos:", error);
      alert("Error al actualizar favoritos.");
    }
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

