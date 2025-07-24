// Context/FavoritosContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/favoritos/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setFavoritos(res.data))
        .catch((err) => console.error("❌ Error al cargar favoritos:", err));
    }
  }, [token]);

  const esFavorito = (productoId) =>
    favoritos.some((fav) => fav.producto.id === productoId);

  const agregarFavorito = async (productoId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/favoritos/",
        { producto: productoId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFavoritos([...favoritos, res.data]);
    } catch (error) {
      console.error("❌ Error al agregar favorito:", error);
    }
  };

  const eliminarFavorito = async (productoId) => {
    const favorito = favoritos.find((fav) => fav.producto.id === productoId);
    if (!favorito) return;

    try {
      await axios.delete(`http://localhost:8000/api/favoritos/${favorito.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavoritos(favoritos.filter((fav) => fav.id !== favorito.id));
    } catch (error) {
      console.error("❌ Error al eliminar favorito:", error);
    }
  };

  return (
    <FavoritosContext.Provider
      value={{ favoritos, esFavorito, agregarFavorito, eliminarFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContext);
