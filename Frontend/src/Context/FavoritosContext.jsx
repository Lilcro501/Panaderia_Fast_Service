import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FavoritosContext = createContext();

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.error('Error al obtener favoritos:', error);
      setError('Error al cargar los favoritos. Asegúrate de estar autenticado.');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔴 NUEVA FUNCIÓN PARA ELIMINAR DE FAVORITOS LOCALMENTE
  const eliminarFavoritoLocal = (productoId) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((fav) => fav.producto_detalle.id !== productoId)
    );
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

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
