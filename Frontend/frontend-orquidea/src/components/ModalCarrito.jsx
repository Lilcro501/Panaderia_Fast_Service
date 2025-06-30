src/components/ModalCarrito.jsx
import React from 'react';
import { useCarrito } from '../Context/CarritoContext';
import { useNavigate } from 'react-router-dom'; // ✅ Importar
import '../assets/styles/ModalCarrito.css';
import { MdOutlineDelete } from "react-icons/md";
import CarritoLleno from "../assets/icons/carrito-lleno.png"

const ModalCarrito = ({ visible, onClose }) => {
  const { carrito, quitarProducto, vaciarCarrito } = useCarrito();
  const navigate = useNavigate(); // ✅ Hook de navegación

  if (!visible) return null;

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleVerCarrito = () => {
    onClose();              // 👉 Cierra el modal
    navigate('/FacturaProductos');   // 👉 Redirige a la factura
  };

  return (
    <div className="modal-overlay">
      <div className="modal-carrito">
        <button className="cerrar-modal" onClick={onClose}>X</button>
        <br />
        <div className='formato-superior'>
          <div>
            <h2>Tu pedido</h2>
          </div>
          <div className='formato-superior'>
            <div>
              <img src={CarritoLleno} alt="Carrito lleno" className='imagen-carrito' />
            </div>
          </div>
        </div>

        <MdOutlineDelete className="vaciar-btn" onClick={vaciarCarrito} />

        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="lista-carrito">
              {carrito.map((item) => (
                <li key={item.id} className="item-carrito">
                  <img src={item.image} alt={item.nameProduct} className="img-carrito" />
                  <div className="info-carrito">
                    <span className="nombre">{item.nameProduct}</span>
                    <span className="cantidad">Cantidad: {item.quantity}</span>
                    <span className='valor'>Valor: ${item.price}</span>
                    <span className="precio">Total: ${item.price * item.quantity}</span>
                  </div>
                  <button onClick={() => quitarProducto(item.id)} className="quitar-btn">−</button>
                </li>
              ))}
            </ul>

            <div className="total-carrito">
              <strong>Total:</strong> ${calcularTotal()}
              <br />
            </div>

            <div className='mover-bton'>
              <button className='bton-ver-carrito' onClick={handleVerCarrito}>
                Ver carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCarrito;
