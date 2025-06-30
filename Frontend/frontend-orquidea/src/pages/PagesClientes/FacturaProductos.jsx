src/pages/PagesClientes/Factura.jsx
import React from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import '../../assets/styles/Factura.css';
import { MdOutlineAdd, MdOutlineRemove, MdDelete } from 'react-icons/md';

const Factura = () => {
  const { carrito, agregarProducto, quitarProducto, vaciarCarrito } = useCarrito();

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="factura-container">
      <center><h1 >Factura de Compra</h1></center>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="factura-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nameProduct}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn-control"
                      onClick={() => quitarProducto(item.id)}
                    >
                      <MdOutlineRemove />
                    </button>
                    <button
                      className="btn-control"
                      onClick={() => agregarProducto(item)}
                    >
                      <MdOutlineAdd />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => quitarProducto(item.id, true)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="factura-total">
            <strong>Total a pagar: ${total}</strong>
          </div>

          <button className="btn-vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Factura;
