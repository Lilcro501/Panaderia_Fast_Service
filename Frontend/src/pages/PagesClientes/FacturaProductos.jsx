import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../Context/CarritoContext';
import '../../assets/styles/Factura.css';
import { MdOutlineAdd, MdOutlineRemove, MdDelete } from 'react-icons/md';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import "../../assets/styles/MetodosPago.css";
import "../../assets/styles/Global.css";
import campana from '../../assets/images/campana.png';
import axios from 'axios';

const Factura = () => {
  const {
    carrito,
    agregarProducto,
    quitarProducto,
    eliminarProducto,
    vaciarCarrito
  } = useCarrito();
  const navigate = useNavigate();

  const [modalMensaje, setModalMensaje] = useState(null);

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleContinuar = () => {
    navigate('/FormularioEntrega');
  };

  const formatoCOP = (valor) =>
    valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  const mostrarModal = (mensaje) => {
    setModalMensaje(mensaje);
  };

  const cerrarModal = () => {
    setModalMensaje(null);
  };

  // Función para consultar stock desde backend
  const obtenerStockActual = async (productoId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/carrito/producto/${productoId}/`);
      return res.data.stock;
    } catch (error) {
      console.error("❌ Error al obtener el stock del producto:", error);
      return null;
    }
  };

  // NUEVA función para vaciar carrito y redirigir al home
  const handleVaciarYRedirigir = () => {
    vaciarCarrito();
    navigate("/home");
  };

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
                      {/* ➖ Disminuir cantidad */}
                      <button
                        className="btn-control"
                        onClick={() => quitarProducto(item.id)}
                        disabled={item.quantity === 1}
                      >
                        <MdOutlineRemove />
                      </button>

                      {/* ➕ Aumentar cantidad con validación de stock */}
                      <button
                        className="btn-control"
                        onClick={async () => {
                          const stockActual = await obtenerStockActual(item.id);
                          if (stockActual === null) {
                            mostrarModal("❌ No se pudo verificar el stock del producto.");
                            return;
                          }

                          if (item.quantity < stockActual) {
                            agregarProducto(item);
                          } else {
                            mostrarModal(` No puedes agregar más de ${stockActual} unidades de ${item.nameProduct}`);
                          }
                        }}
                      >
                        <MdOutlineAdd />
                      </button>

                      {/* 🗑️ Eliminar completamente el producto */}
                      <button
                        className="btn-delete"
                        onClick={() => eliminarProducto(item.id)}
                      >
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

            <div className='posicicion-botones'>
              <button className="btn-vaciar" onClick={handleVaciarYRedirigir}>
                Vaciar carrito
              </button>

              <button className='btn-continuar' onClick={() => navigate('/home')}>
                Seguir comprando
              </button>

              <button className="btn-continuar" onClick={handleContinuar}>
                Continuar con el pago
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {modalMensaje && (
        <div className="modal-fondo" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={e => e.stopPropagation()}>
            <br /> <br />
            <img src={campana} alt="alerta" width="20px" />
            <br /> <br />
            <p>{modalMensaje}</p>
            <br /> <br />
            <button className="boton-moderno" onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Factura;

