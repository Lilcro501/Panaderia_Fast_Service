import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRol } from './RolContext'; // 👈 importa tu contexto de rol

const FavoritosContext = createContext();

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { rol } = useRol(); // 👈 obtiene el rol actual

  const fetchFavoritos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access');

      const response = await axios.get('http://localhost:8000/api/carrito/favoritos/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavoritos(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("Acceso no autorizado: esta ruta es solo para clientes.");
      } else {
        console.error("Error al obtener favoritos:", error);
        setError("Error al cargar los favoritos.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const eliminarFavoritoLocal = (productoId) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((fav) => fav.producto_detalle.id !== productoId)
    );
  };

  useEffect(() => {
    if (rol === "cliente") {
      fetchFavoritos();
    } else {
      setIsLoading(false);
    }
  }, [rol]);

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        isLoading,
        error,
        fetchFavoritos,
        eliminarFavoritoLocal, 
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};
