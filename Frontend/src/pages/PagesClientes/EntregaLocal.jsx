import React, { useState } from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import VentanaEmergente from '../../components/VentanaEmergente';
import '../../assets/styles/MetodosPago.css';
import qr from "../../assets/images/qr.png"

const EntregaLocal = () => {
  const { carrito } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const renderContenidoModal = () => {
    if (metodoEntrega === 'qr') {
      return (
        <>
          <img src={qr} alt="Código QR"  className='estilo-img'/>
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
            <br />
            <button  className="boton-moderno"   type="submit">Enviar</button>
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
      <br /> <br />

      <section className="contenedor-informacion">
        <div className="formulario-columna">
          <h4>Datos de recibo</h4>
          <br /> <br />
          <label htmlFor="nombre">Nombres</label>
          <input className="input-moderno" type="text" id="nombre" />

          <label htmlFor="apellidos">Apellidos</label>
          <input className="input-moderno" type="text" id="apellidos" />

          <label htmlFor="cedula">Cédula</label>
          <input className="input-moderno" type="number" id="cedula" />

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

            <br />

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
            <br />
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
            <br />
            {/* Botón que aparece solo si se selecciona un método */}
            {metodoEntrega && (
              <button
              className='boton-moderno'
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
  content={
    metodoEntrega === 'qr' ? (
      <>
        <img src={qr} alt="Código QR" className='estilo-img' />
        <p>Cuenta Nequi: <strong>3001234567</strong></p>
        <label>Adjunta tu comprobante:</label>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" required />
      </>
    ) : (
      <>
        <h3>Pago en efectivo al momento de la entrega</h3>
        <p>Ten el monto exacto preparado: <strong>${total}</strong></p>
      </>
    )
  }
  footer={
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
      {metodoEntrega === 'qr' && (
        <button
          className="boton-moderno"
          onClick={() => {
            alert("Comprobante enviado correctamente");
            setMostrarModal(false);
          }}
        >
          Enviar
        </button>
      )}
      <button className="boton-moderno cancelar" onClick={() => setMostrarModal(false)}>
        Cancelar
      </button>
    </div>
  }
/>

    </>
  );
};

export default EntregaLocal;
