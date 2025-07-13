// src/pages/PagesClientes/Factura.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../Context/CarritoContext';
import '../../assets/styles/Factura.css';
import { MdOutlineAdd, MdOutlineRemove, MdDelete } from 'react-icons/md';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import "../../assets/styles/MetodosPago.css";

const Factura = () => {
  const { carrito, agregarProducto, quitarProducto, vaciarCarrito } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState('domicilio');
  const navigate = useNavigate();

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleContinuar = () => {
    if (metodoEntrega === 'domicilio') {
      navigate('/EntregaDomicilio');
    } else {
      navigate('/EntregaLocal');
    }
  };

  const formatoCOP = (valor) =>
    valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  return (
    <>
      <ComponenteProcesoPago />

      <div className="factura-container">
        <center><h1>Factura de Compra</h1></center>

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
                    <td>{formatoCOP(item.price)}</td>
                    <td>{formatoCOP(item.price * item.quantity)}</td>
                    <td>
                      <button className="btn-control" onClick={() => quitarProducto(item.id)}>
                        <MdOutlineRemove />
                      </button>
                      <button className="btn-control" onClick={() => agregarProducto(item)}>
                        <MdOutlineAdd />
                      </button>
                      <button className="btn-delete" onClick={() => quitarProducto(item.id, true)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="factura-total">
              <strong>Total a pagar: {formatoCOP(total)}</strong>
            </div>
            {/* Selector de método de entrega */}
            <div className="metodo-entrega">
              <h4>Método de entrega</h4>
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="domicilio"
                  checked={metodoEntrega === 'domicilio'}
                  onChange={(e) => setMetodoEntrega(e.target.value)}
                />
                Domicilio
              </label>
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="recoger"
                  checked={metodoEntrega === 'recoger'}
                  onChange={(e) => setMetodoEntrega(e.target.value)}
                />
                Recoger en el local
              </label>
            </div>

            <div className='posicicion-botones'>
              <button className="btn-vaciar" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>

              <br /><br />

              <button className="btn-continuar" onClick={handleContinuar}>
                Continuar con el pago
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Factura;
