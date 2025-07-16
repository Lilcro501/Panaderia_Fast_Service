import React, { useState } from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import VentanaEmergente from '../../components/VentanaEmergente';

import { enviarFactura } from '../../api/factura';

import '../../assets/styles/MetodosPago.css';
import qr from "../../assets/images/qr.png";

const EntregaDomicilio = () => {
  const { carrito } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const [formData, setFormData] = useState({
    cedula: '',
    sector: '',
    direccion: '',
    apartamento: '',
    fecha_entrega: '',
    hora: '',
    informacion_adicional: ''
  });

  const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEnviarFactura = async () => {
    try {
      const datosFactura = {
        metodo_pago: metodoEntrega,
        total: total,
        cedula: formData.cedula,
        municipio: formData.sector,
        direccion: formData.direccion,
        apartamento: formData.apartamento,
        fecha_entrega: formData.fecha_entrega,
        hora: formData.hora,
        informacion_adicional: formData.informacion_adicional,
        comprobante_archivo: "comprobante.jpg" // Simulado por ahora
      };

      await enviarFactura(datosFactura);
      alert('Factura enviada correctamente ✅');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <ComponenteProcesoPago />

      <section className="contenedor-informacion">
        <div className="formulario-columna">
          <h4>Información del cliente</h4>

          <label>Cédula</label>
          <input className="input-moderno" type="number" name="cedula" value={formData.cedula} onChange={handleChange} />

          <label>Sector</label>
          <input className="input-moderno" type="text" name="sector" value={formData.sector} onChange={handleChange} />

          <label>Dirección</label>
          <input className="input-moderno" type="text" name="direccion" value={formData.direccion} onChange={handleChange} />

          <label>Apartamento</label>
          <input className="input-moderno" type="text" name="apartamento" value={formData.apartamento} onChange={handleChange} />

          <label>Fecha de entrega</label>
          <input className="input-moderno" type="date" name="fecha_entrega" value={formData.fecha_entrega} onChange={handleChange} />

          <label>Hora</label>
          <input className="input-moderno" type="time" name="hora" value={formData.hora} onChange={handleChange} />

          <label>Información adicional</label>
          <input className="input-moderno" type="text" name="informacion_adicional" value={formData.informacion_adicional} onChange={handleChange} />

          <br />
          <button className="boton-moderno" type="button" onClick={handleEnviarFactura}>
            Enviar Factura
          </button>
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

export default EntregaDomicilio;



