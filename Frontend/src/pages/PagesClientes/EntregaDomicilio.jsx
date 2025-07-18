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
  const [comprobante, setComprobante] = useState(null); // Nuevo

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
    if (!metodoEntrega) {
      return alert('Selecciona un método de pago');
    }

    if (!formData.cedula || !formData.direccion || !formData.fecha_entrega || !formData.hora) {
      return alert('Por favor completa los campos obligatorios');
    }

    try {
      const datosFactura = new FormData();
      datosFactura.append('metodo_pago', metodoEntrega);
      datosFactura.append('total', total);
      datosFactura.append('cedula', formData.cedula);
      datosFactura.append('municipio', formData.sector);
      datosFactura.append('direccion', formData.direccion);
      datosFactura.append('apartamento', formData.apartamento);
      datosFactura.append('fecha_entrega', formData.fecha_entrega);
      datosFactura.append('hora', formData.hora);
      datosFactura.append('informacion_adicional', formData.informacion_adicional);

      if (metodoEntrega === 'qr' && comprobante) {
        datosFactura.append('comprobante_archivo', comprobante);
      } else {
        datosFactura.append('comprobante_archivo', 'no_aplica');
      }

      await enviarFactura(datosFactura);
      alert('✅ Factura enviada correctamente');
      setFormData({
        cedula: '',
        sector: '',
        direccion: '',
        apartamento: '',
        fecha_entrega: '',
        hora: '',
        informacion_adicional: ''
      });
      setComprobante(null);
      setMetodoEntrega('');
      setMostrarModal(false);
    } catch (error) {
      alert(`❌ Error al enviar la factura: ${error.message}`);
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
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setComprobante(e.target.files[0])}
                required
              />
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
                onClick={handleEnviarFactura}
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

