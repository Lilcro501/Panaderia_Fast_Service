import React, { useState } from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import VentanaEmergente from '../../components/VentanaEmergente';
import '../../assets/styles/MetodosPago.css';
import qr from "../../assets/images/qr.png"

const EntregaDomicilio = () => {
  const { carrito } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const renderContenidoModal = () => {
    if (metodoEntrega === 'qr') {
      return (
        <>
          <img src={qr} alt="Código QR" style={{ width: '200px', marginBottom: '1rem', justifyContent:"center"}}/>
          <p>Cuenta Nequi: <strong>3001234567</strong></p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Comprobante enviado correctamente');
              setMostrarModal(false);
            }}
          >
            <label>Adjunta tu comprobante:</label>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" required />
            <br />
            <button type="submit" style={{ marginTop: '10px' }}>Enviar</button>
          </form>
        </>
      );
    }

    if (metodoEntrega === 'contraentrega') {
      return (
        <>
          <h3>Pago en efectivo al momento de la entrega</h3>
          <p>Ten el monto exacto preparado: <strong>${total}</strong></p>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <ComponenteProcesoPago />

      <section className="contenedor-informacion">
        <div className="formulario-columna">
          <h4>Información del cliente</h4>

          <label htmlFor="nombre">Nombres</label>
          <input className="input-moderno" type="text" id="nombre" />

          <label htmlFor="apellidos">Apellidos</label>
          <input className="input-moderno" type="text" id="apellidos" />

          <label htmlFor="cedula">Cédula</label>
          <input className="input-moderno" type="number" id="cedula" />

          <label htmlFor="lugar">Municipio/Sector</label>
          <input className="input-moderno" type="text" id="lugar" />

          <label htmlFor="direccion">Dirección</label>
          <input className="input-moderno" type="text" id="direccion" />

          <label htmlFor="apartamento">Apartamento</label>
          <input className="input-moderno" type="text" id="apartamento" />

          <label htmlFor="fecha_entrega">Fecha de entrega</label>
          <input className="input-moderno" type="date" id="fecha_entrega" />

          <label htmlFor="hora">Hora</label>
          <input className="input-moderno" type="time" id="hora" />

          <label htmlFor="informacion-adicional">Información adicional</label>
          <input className="input-moderno" type="text" id="informacion-adicional" />
        </div>

        <div className="formulario-columna">
          <div className="detalle-orden">
            <h2>Resumen de tu orden</h2>
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  {item.nameProduct} - ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total: ${total}</strong></p>
          </div>

          <div className="metodos-pago">
            <h2>Métodos de pago</h2>

            <div>
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="qr"
                  checked={metodoEntrega === 'qr'}
                  onChange={(e) => setMetodoEntrega(e.target.value)}
                />
                Pagar con QR
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="contraentrega"
                  checked={metodoEntrega === 'contraentrega'}
                  onChange={(e) => setMetodoEntrega(e.target.value)}
                />
                Pago en efectivo al recibir
              </label>
            </div>

            {/* Botón que aparece solo si se selecciona un método */}
            {metodoEntrega && (
              <button
                onClick={() => setMostrarModal(true)}
                style={{ marginTop: '15px' }}
              >
                Ver detalles de pago
              </button>
            )}
          </div>
        </div>
      </section>

      <VentanaEmergente
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        title="Información de pago"
        content={renderContenidoModal()}
        footer={<button onClick={() => setMostrarModal(false)}>Cerrar</button>}
      />
    </>
  );
};

export default EntregaDomicilio;
