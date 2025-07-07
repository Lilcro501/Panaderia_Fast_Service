// src/context/FavoritosContext.jsx
import { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.some((item) => item.id === producto.id);
      if (!existe) {
        return [...prev, producto];
      }
      return prev;
    });
  };

  const eliminarFavorito = (id) => {
    setFavoritos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, eliminarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContext);
