import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api'; // Usar la instancia de axios con interceptor
import { useRol } from './RolContext';

const FavoritosContext = createContext();

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({ children }) => {
  const { rol } = useRol();
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Obtener favoritos desde el backend ---
  const fetchFavoritos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/carrito/favoritos/');
      setFavoritos(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn('Acceso no autorizado: esta ruta es solo para clientes.');
      } else {
        console.error('Error al obtener favoritos:', err);
        setError('Error al cargar los favoritos.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- Eliminar favorito localmente después de eliminarlo en el backend ---
  const eliminarFavoritoLocal = (productoId) => {
    setFavoritos((prev) =>
      prev.filter((fav) => fav.producto_detalle.id !== productoId)
    );
  };

  // --- Cargar favoritos automáticamente si el rol es cliente ---
  useEffect(() => {
    if (rol === 'cliente') {
      fetchFavoritos();
    } else {
      setFavoritos([]); // limpiar favoritos si no es cliente
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
