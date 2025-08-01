import React, { useState, useEffect } from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import VentanaEmergente from '../../components/VentanaEmergente';
import { enviarFactura } from '../../api/factura';
import '../../assets/styles/MetodosPago.css';
import qr from "../../assets/images/qr.png";

const FormularioEntrega = () => {
  const { carrito, vaciarCarrito } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState('');
  const [metodoEnvio, setMetodoEnvio] = useState('domicilio');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    direccion_entrega: '',
    fecha_entrega: '',
    informacion_adicional: ''
  });

  const [userData, setUserData] = useState({
    id_usuario: "",
    telefono: ''
  });

  useEffect(() => {
    const id = localStorage.getItem('id_usuario');
    if (id && !isNaN(id)) {
      setUserData(prev => ({ ...prev, id_usuario: parseInt(id, 10) }));
    }
  }, []);

  const total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    const camposRequeridos = [
      { value: metodoEntrega, message: 'Selecciona un método de pago' },
      { value: metodoEnvio, message: 'Selecciona un método de entrega' },
      { condition: metodoEnvio === 'domicilio' && !formData.direccion_entrega, message: 'La dirección de entrega es requerida' },
      { value: formData.fecha_entrega, message: 'La fecha de entrega es requerida' },
      { value: userData.telefono, message: 'El teléfono es requerido' },
      {
        condition: metodoEntrega === 'qr' && !comprobante,
        message: 'Debes adjuntar el comprobante de pago QR'
      }
    ];

    for (const campo of camposRequeridos) {
      if (campo.condition !== undefined ? campo.condition : !campo.value) {
        setError(campo.message);
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleEnviarFactura = async () => {
    if (!validarCampos()) return;

    try {
      const datosFactura = new FormData();
      datosFactura.append('id_usuario', userData.id_usuario);
      datosFactura.append('metodo_pago', metodoEntrega);
      datosFactura.append('metodo_entrega', metodoEnvio);
      datosFactura.append('total', total.toFixed(2));
      datosFactura.append('direccion_entrega', metodoEnvio === 'local' ? 'Recoger en tienda' : formData.direccion_entrega);
      datosFactura.append('fecha_entrega', formData.fecha_entrega);
      datosFactura.append('informacion_adicional', formData.informacion_adicional || '');
      datosFactura.append("telefono_usuario", userData.telefono)

      carrito.forEach((item, index) => {
        datosFactura.append(`productos[${index}][id_producto]`, item.id);
        datosFactura.append(`productos[${index}][cantidad]`, item.quantity);
        datosFactura.append(`productos[${index}][precio_unitario]`, item.price);
      });

      if (metodoEntrega === 'qr' && comprobante) {
        datosFactura.append('comprobante', comprobante);
      }

      const response = await enviarFactura(datosFactura);

      if (response.success) {
        alert('Factura creada exitosamente');
        vaciarCarrito();
        setFormData({
          direccion_entrega: '',
          fecha_entrega: '',
          informacion_adicional: ''
        });
        setMetodoEntrega('');
        setMetodoEnvio('domicilio');
        setComprobante(null);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al crear factura: ${error.message}`);
    }
  };

  return (
    <>
      <ComponenteProcesoPago />
      <center><h1>Factura</h1></center>
      {error && <div className="error-message">{error}</div>}

      <section className="contenedor-informacion">
        <div className="formulario-columna">
          <h4>Información del cliente</h4>

          <label>Teléfono*</label>
          <input
            className="input-moderno"
            type="tel"
            name="telefono"
            value={userData.telefono}
            onChange={handleUserChange}
            required
          />

          {metodoEnvio === 'domicilio' && (
            <>
              <label>Dirección de entrega*</label>
              <input
                className="input-moderno"
                type="text"
                name="direccion_entrega"
                value={formData.direccion_entrega}
                onChange={handleChange}
                required
              />
            </>
          )}

          {metodoEnvio === 'local' && (
            <div style={{ marginBottom: '10px', fontStyle: 'italic', color: '#555' }}>
              Puedes recoger tu pedido en: <br />
              <strong>Cra 15 #45-10, Local 3, Bogotá</strong>
            </div>
          )}

          <label>Fecha de entrega*</label>
          <input
            className="input-moderno"
            type="date"
            name="fecha_entrega"
            value={formData.fecha_entrega}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <label>Método de entrega*</label>
          <select
            className="input-moderno"
            value={metodoEnvio}
            onChange={(e) => setMetodoEnvio(e.target.value)}
            required
          >
            <option value="domicilio">Entrega a domicilio</option>
            <option value="local">Recoger en tienda</option>
          </select>

          <label>Información adicional</label>
          <textarea
            className="input-moderno"
            name="informacion_adicional"
            value={formData.informacion_adicional}
            onChange={handleChange}
            rows="3"
          />

          <button
            className="boton-moderno"
            onClick={handleEnviarFactura}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Factura'}
          </button>
        </div>

        <div className="formulario-columna">
          <div className="detalle-orden">
            <h2>Resumen de tu orden</h2>
            <ul>
              {carrito.map(item => (
                <li key={item.id}>
                  {item.nameProduct} - {item.quantity} × ${item.price} = ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p><strong>Total: ${total.toFixed(2)}</strong></p>
          </div>

          <div className="metodos-pago">
            <h2>Métodos de pago</h2>
            <label className="radio-option">
              <input
                type="radio"
                name="entrega"
                value="qr"
                checked={metodoEntrega === 'qr'}
                onChange={(e) => setMetodoEntrega(e.target.value)}
              />
              Pagar con QR
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="entrega"
                value="contraentrega"
                checked={metodoEntrega === 'contraentrega'}
                onChange={(e) => setMetodoEntrega(e.target.value)}
              />
              Pago contra entrega
            </label>

            {metodoEntrega && (
              <button
                className="boton-moderno"
                onClick={() => setMostrarModal(true)}
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
        title={`Detalles de pago (${metodoEntrega === 'qr' ? 'QR' : 'Contra entrega'})`}
        content={
          metodoEntrega === 'qr' ? (
            <>
              <img
                src={qr}
                alt="Código QR"
                style={{ width: '200px', margin: '0 auto 20px', display: 'block' }}
              />
              <p style={{ textAlign: 'center' }}>
                <strong>Banco:</strong> Nequi<br />
                <strong>Número:</strong> 3001234567<br />
                <strong>Valor:</strong> ${total.toFixed(2)}
              </p>
              <label style={{ display: 'block', marginTop: '15px' }}>
                Adjunta tu comprobante*:
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setComprobante(e.target.files[0])}
                  style={{ marginTop: '5px' }}
                  required
                />
              </label>
            </>
          ) : (
            <>
              <h3 style={{ color: '#4CAF50' }}>Pago al recibir tu pedido</h3>
              <p>El mensajero recibirá:</p>
              <p style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                textAlign: 'center',
                margin: '15px 0'
              }}>
                ${total.toFixed(2)} en efectivo
              </p>
              <p style={{ fontStyle: 'italic' }}>
                Por favor ten el dinero exacto o cercano para facilitar el proceso.
              </p>
            </>
          )
        }
      />
    </>
  );
};

export default FormularioEntrega;
