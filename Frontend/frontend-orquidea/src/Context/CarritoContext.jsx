import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, quantity: 1 }];
      }
    });
  };

  const quitarProducto = (id) => {
    setCarrito((prevCarrito) => {
      return prevCarrito
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0);
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, quitarProducto, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// ✅ Este es el hook que te falta exportar correctamente
export const useCarrito = () => useContext(CarritoContext);
