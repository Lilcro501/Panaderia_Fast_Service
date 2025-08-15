import { createContext, useContext, useState, useEffect } from "react";
import obtenerStockProducto from "../api/obtenerStockProducto";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // 🔹 Obtener datos del usuario logueado (ajusta según tu app)
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || JSON.parse(localStorage.getItem("usuario"));
  const userId = usuario?.id || "anonimo";

  // 🔹 Clave dinámica para el carrito de este usuario
  const storageKey = `carrito_${userId}`;

  // 🔹 Estado inicial del carrito para este usuario (sessionStorage)
  const carritoInicial = JSON.parse(sessionStorage.getItem(storageKey)) || [];
  const [carrito, setCarrito] = useState(carritoInicial);

  // 🔹 Guardar carrito en sessionStorage cada vez que cambie
  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(carrito));
  }, [carrito, storageKey]);

  // 🔹 Agregar producto al carrito
  const agregarProducto = async (producto) => {
    const stockDisponible = await obtenerStockProducto(producto.id);

    if (stockDisponible === null) {
      alert("No se pudo verificar el stock del producto.");
      return;
    }

    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      const cantidadActual = existe ? existe.quantity : 0;

      if (cantidadActual + 1 > stockDisponible) {
        alert("No hay suficiente stock disponible.");
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

  // 🔹 Quitar una unidad de un producto
  const quitarProducto = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🔹 Eliminar producto completamente
  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔹 Vaciar todo el carrito
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