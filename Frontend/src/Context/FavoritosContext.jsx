import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../api/api'; // Instancia de axios con interceptor
import { useRol } from './RolContext';

const FavoritosContext = createContext();

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({ children }) => {
  const { rol } = useRol();
  const [favoritos, setFavoritos] = useState(() => {
    // Recupera favoritos de localStorage si existen
    const favoritosGuardados = localStorage.getItem('favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Guardar favoritos en localStorage automáticamente ---
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // --- Obtener favoritos desde el backend ---
  const fetchFavoritos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/carrito/favoritos/', {
        withCredentials: true, // importante para cookies en Render
      });
      setFavoritos(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn('Acceso no autorizado: esta ruta es solo para clientes.');
      } else if (err.message === 'Network Error') {
        console.error('Error de red al obtener favoritos:', err);
        setError('No se pudo conectar al servidor.');
      } else {
        console.error('Error al obtener favoritos:', err);
        setError('Error al cargar los favoritos.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Eliminar favorito (primero backend, luego local) ---
  const eliminarFavorito = async (productoId) => {
    try {
      await api.delete(`/api/carrito/favoritos/${productoId}/`, {
        withCredentials: true,
      });
      setFavoritos((prev) =>
        prev.filter((fav) => fav.producto_detalle.id !== productoId)
      );
    } catch (err) {
      console.error('Error al eliminar favorito:', err);
      setError('No se pudo eliminar el favorito.');
    }
  };

  // --- Cargar favoritos automáticamente si el rol es cliente ---
  useEffect(() => {
    if (rol === 'cliente') {
      fetchFavoritos();
    } else {
      setFavoritos([]); // limpiar favoritos si no es cliente
      setIsLoading(false);
    }
  }, [rol, fetchFavoritos]);

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        isLoading,
        error,
        fetchFavoritos,
        eliminarFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};
