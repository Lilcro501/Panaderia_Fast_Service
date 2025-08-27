import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // 🔹 Obtener usuario logueado
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const userId = usuario?.id || "anonimo";

  // 🔹 Clave dinámica para sessionStorage
  const storageKey = `carrito_${userId}`;

  // 🔹 Estado inicial
  const carritoInicial = JSON.parse(sessionStorage.getItem(storageKey)) || [];
  const [carrito, setCarrito] = useState(carritoInicial);

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Guardar carrito en sessionStorage al cambiar
  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(carrito));
  }, [carrito, storageKey]);

  // 🔹 Función para obtener stock desde backend
  const obtenerStockProducto = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/carrito/producto/${id}/`);
      return res.data.stock;
    } catch (error) {
      console.error("Error al obtener stock:", error);
      return null;
    }
  };

  // 🔹 Agregar producto al carrito
  const agregarProducto = async (producto) => {
    const stockDisponible = await obtenerStockProducto(producto.id);

    if (stockDisponible === null) {
      alert("❌ No se pudo verificar el stock del producto.");
      return;
    }

    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      const cantidadActual = existe ? existe.quantity : 0;

      if (cantidadActual + 1 > stockDisponible) {
        alert(`⚠️ Solo hay ${stockDisponible} unidades disponibles.`);
        return prev;
      }

      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...producto, quantity: 1 }];
    });
  };

  // 🔹 Quitar una unidad
  const quitarProducto = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🔹 Eliminar completamente
  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔹 Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        quitarProducto,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
