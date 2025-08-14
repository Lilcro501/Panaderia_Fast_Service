import React, { useState, useEffect } from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import VentanaEmergente from '../../components/VentanaEmergente';
import { enviarFactura } from '../../api/factura';
import '../../assets/styles/MetodosPago.css';
import compras from '../../assets/images/compras.png';
import CompraQr from '../../assets/images/tienda-online.png';
import campana from '../../assets/images/campana.png';

const FormularioEntrega = () => {
  const { carrito, vaciarCarrito } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState('');
  const [metodoEnvio, setMetodoEnvio] = useState('domicilio');

  // Modal para mensajes (errores, éxito, info)
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const [modalTitulo, setModalTitulo] = useState('');

  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    direccion_entrega: '',
    fecha_entrega: '',
    informacion_adicional: ''
  });

  const [userData, setUserData] = useState({
    id_usuario: null,
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
        // Mostrar error en modal
        setModalTitulo('Error de validación');
        setModalMensaje(campo.message);
        setMostrarModal(true);
        return false;
      }
    }

    return true;
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setModalMensaje('');
    setModalTitulo('');
  };

  const handleEnviarFactura = async () => {
    if (!validarCampos()) return;

    setLoading(true);
    try {
      const datosFactura = new FormData();

      datosFactura.append('id_usuario', userData.id_usuario);
      datosFactura.append('metodo_pago', metodoEntrega);
      datosFactura.append('metodo_entrega', metodoEnvio);
      datosFactura.append('total', total.toFixed(2));
      datosFactura.append('direccion_entrega', formData.direccion_entrega);
      datosFactura.append('fecha_entrega', formData.fecha_entrega);
      datosFactura.append('informacion_adicional', formData.informacion_adicional || '');

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
        setModalTitulo('Factura creada');
        setModalMensaje('Factura creada exitosamente');
        setMostrarModal(true);

        vaciarCarrito();
        setFormData({
          direccion_entrega: '',
          fecha_entrega: '',
          informacion_adicional: ''
        });
        setMetodoEntrega('');
        setMetodoEnvio('domicilio');
        setComprobante(null);
      } else {
        setModalTitulo('Error');
        setModalMensaje(response.message || 'Error al crear factura');
        setMostrarModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalTitulo('Error');
      setModalMensaje(`Error al crear factura: ${error.message}`);
      setMostrarModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ComponenteProcesoPago />
      <div className='titulo-factura'><h1>Factura de compra</h1></div>  

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
            <option value="local">Recoger en el local</option>
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
  onClose={handleCerrarModal}
  title={
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src={campana}
        alt="Campana"
        style={{ width: '30px', height: '30px', objectFit: 'contain' }}
      />
      <span>
        {modalTitulo || `Detalles de pago:  (${metodoEntrega === 'qr' ? 'QR' : 'Contra entrega'})`}
      </span>
    </div>
  }
  content={
    modalMensaje ? (
      <>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>{modalMensaje}</p>
        <button className='boton-moderno' onClick={handleCerrarModal}>Aceptar</button>
      </>
    ) : metodoEntrega === 'qr' ? (
      <>
        <img
          src="http://localhost:8000/media/qr.png"
          alt="Código QR"
          style={{
            width: '200px',
            margin: '0 auto 20px',
            display: 'block',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '10px'
          }}
        />
        <img
          src={CompraQr}
          alt=""
          style={{ width: '100px', margin: '0 auto 20px', display: 'block' }}
        />
        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1em' }}>
          <strong>Banco:</strong> Bancolombia<br />
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
          <button className='boton-moderno' onClick={() => setMostrarModal(false)} style={{ marginTop: '10px' }}>
            Aceptar
          </button>
        </label>
      </>
    ) : (
      <>
        <center><h3 style={{ color: "black" }}>Pago contra entrega</h3></center>
        <img src={compras} alt="Compra QR" style={{ width: '200px', display: 'block', margin: '0 auto 20px' }} />
        <br />
       <center style={{
        color: 'black',
       }
       }> <p>Total del pedido:</p></center>
        <center><p style={{
          fontSize: '1.2em',
          fontWeight: 'bold',
          margin: '15px 0',
          color: 'green',
        }}> ${total.toFixed(2)} en efectivo</p></center>
        <p style={{ fontStyle: 'italic', color: 'black' }}>
          El método de pago será contra entrega, ¡recuerda tener el dinero exacto para facilitar el proceso de entrega del pedido! La factura de tu compra llegará a tu correo electrónico y previamente se confirmará tu pedido.
        </p>
        <br /> <br />
        <center><p style={{
          color: 'black',
          fontSize: '1.1em',
        }}>¡Disfruta de tu pedido!</p></center>
        <center><p style={{
          color: 'black',
          fontSize: '1.1em',
        }}>Panadería la Orquídea</p></center>
        <br /> <br />
        <button className='boton-moderno' onClick={() => setMostrarModal(false)}>Aceptar</button>
      </>
    )
    }
  />

    </>
  );
};

export default FormularioEntrega;
