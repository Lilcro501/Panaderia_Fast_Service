import React, { useState, useEffect } from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import VentanaEmergente from '../../components/VentanaEmergente';
import { enviarFactura } from '../../api/factura';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/MetodosPago.css';
import compras from '../../assets/images/compras.png';
import CompraQr from '../../assets/images/tienda-online.png';
import campana from '../../assets/images/campana.png';

const FormularioEntrega = () => {
  const { carrito, vaciarCarrito } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState('');
  const [metodoEnvio, setMetodoEnvio] = useState('domicilio');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const [modalTitulo, setModalTitulo] = useState('');
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    direccion_entrega: '',
    fecha_entrega: '',
    informacion_adicional: ''
  });

  const [userData, setUserData] = useState({
    id_usuario: null,
    telefono: ''
  });

  const navigate = useNavigate();

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const id = localStorage.getItem('id_usuario');
    if (id && !isNaN(id)) {
      setUserData(prev => ({ ...prev, id_usuario: parseInt(id, 10) }));
    }

    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(prev => ({ ...prev, ...JSON.parse(savedUserData) }));
    }

    const savedMetodoEntrega = localStorage.getItem('metodoEntrega');
    if (savedMetodoEntrega) {
      setMetodoEntrega(savedMetodoEntrega);
    }

    const savedMetodoEnvio = localStorage.getItem('metodoEnvio');
    if (savedMetodoEnvio) {
      setMetodoEnvio(savedMetodoEnvio);
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('metodoEntrega', metodoEntrega);
  }, [metodoEntrega]);

  useEffect(() => {
    localStorage.setItem('metodoEnvio', metodoEnvio);
  }, [metodoEnvio]);

  const total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const validateTelefono = (telefono) => {
    const telefonoRegex = /^\d{10}$/;
    if (!telefono) return 'El teléfono es requerido';
    if (!telefonoRegex.test(telefono)) return 'El teléfono debe tener 10 dígitos numéricos';
    return '';
  };

  const validateDireccion = (direccion) => {
    if (!direccion.trim()) return 'La dirección de entrega es requerida';
    if (direccion.length > 200) return 'La dirección no puede exceder 200 caracteres';
    return '';
  };

  const validateFechaEntrega = (fecha) => {
    if (!fecha) return 'La fecha de entrega es requerida';
    const today = new Date().toISOString().split('T')[0];
    if (fecha < today) return 'La fecha de entrega no puede ser anterior a hoy';
    return '';
  };

  const validateInformacionAdicional = (info) => {
    if (info.length > 500) return 'La información adicional no puede exceder 500 caracteres';
    return '';
  };

  const validateComprobante = (file) => {
    if (!file) return 'Debes adjuntar el comprobante de pago QR';
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) return 'El archivo debe ser una imagen (PNG, JPG, JPEG) o PDF';
    if (file.size > 5 * 1024 * 1024) return 'El archivo no puede exceder 5MB';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    let error = '';
    if (name === 'direccion_entrega') error = validateDireccion(value);
    if (name === 'fecha_entrega') error = validateFechaEntrega(value);
    if (name === 'informacion_adicional') error = validateInformacionAdicional(value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    console.log('handleUserChange', name, value);
    setUserData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'telefono') {
      const error = validateTelefono(value);
      setErrors(prev => ({ ...prev, telefono: error }));
    }
  };

  const handleComprobanteChange = (e) => {
    const file = e.target.files[0];
    setComprobante(file);
    const error = validateComprobante(file);
    setErrors(prev => ({ ...prev, comprobante: error }));
  };

  const validarCampos = () => {
    const errors = {};
    errors.carrito = carrito.length === 0 ? 'El carrito está vacío. Agrega productos antes de continuar.' : '';
    errors.metodoEntrega = !metodoEntrega ? 'Selecciona un método de pago' : '';
    errors.metodoEnvio = !metodoEnvio ? 'Selecciona un método de entrega' : '';
    if (metodoEnvio === 'domicilio') errors.direccion_entrega = validateDireccion(formData.direccion_entrega);
    errors.fecha_entrega = validateFechaEntrega(formData.fecha_entrega);
    errors.telefono = validateTelefono(userData.telefono);
    if (metodoEntrega === 'qr') errors.comprobante = validateComprobante(comprobante);
    errors.informacion_adicional = validateInformacionAdicional(formData.informacion_adicional);

    setErrors(errors);
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setModalTitulo('Error de validación');
      setModalMensaje('Por favor, corrige los errores en el formulario.');
      setMostrarModal(true);
      return false;
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
      datosFactura.append('telefono', userData.telefono);
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

        localStorage.removeItem('formData');
        localStorage.removeItem('userData');
        localStorage.removeItem('metodoEntrega');
        localStorage.removeItem('metodoEnvio');

        vaciarCarrito();
        setFormData({
          direccion_entrega: '',
          fecha_entrega: '',
          informacion_adicional: ''
        });
        setMetodoEntrega('');
        setMetodoEnvio('domicilio');
        setComprobante(null);
        setUserData(prev => ({ ...prev, telefono: '' }));
        setErrors({});
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

  const handleCancelar = () => {
    localStorage.removeItem('formData');
    localStorage.removeItem('userData');
    localStorage.removeItem('metodoEntrega');
    localStorage.removeItem('metodoEnvio');

    vaciarCarrito();
    setFormData({
      direccion_entrega: '',
      fecha_entrega: '',
      informacion_adicional: ''
    });
    setMetodoEntrega('');
    setMetodoEnvio('domicilio');
    setComprobante(null);
    setUserData({
      id_usuario: userData.id_usuario,
      telefono: ''
    });
    setErrors({});

    navigate('/home');
  };

  const handleMetodoEnvioChange = (e) => {
    console.log('Cambiando metodoEnvio a:', e.target.value); // Depuración
    setMetodoEnvio(e.target.value);
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
            value={userData.telefono || ''} // evita undefined
            onChange={handleUserChange}
            required
            pattern="\d{10}"
            maxLength="10"
          />
          <p style={{ color: 'red', fontSize: '0.9em', visibility: errors.telefono ? 'visible' : 'hidden' }}>
            {errors.telefono || ''}
          </p>

          <div style={{ display: metodoEnvio === 'domicilio' ? 'block' : 'none' }}>
            <label>Dirección de entrega*</label>
            <input
              className="input-moderno"
              type="text"
              name="direccion_entrega"
              value={formData.direccion_entrega}
              onChange={handleChange}
              required={metodoEnvio === 'domicilio'}
              maxLength="200"
            />
            <p style={{ color: 'red', fontSize: '0.9em', visibility: errors.direccion_entrega ? 'visible' : 'hidden' }}>
              {errors.direccion_entrega || ''}
            </p>
          </div>

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
          <p style={{ color: 'red', fontSize: '0.9em', visibility: errors.fecha_entrega ? 'visible' : 'hidden' }}>
            {errors.fecha_entrega || ''}
          </p>
          <label>Método de entrega*</label>
          <select
            className="input-moderno"
            value={metodoEnvio}
            onChange={handleMetodoEnvioChange}
            required
          >
            <option value="domicilio">Entrega a domicilio</option>
            <option value="local">Recoger en el local</option>
          </select>
          <p style={{ color: 'red', fontSize: '0.9em', visibility: errors.metodoEnvio ? 'visible' : 'hidden' }}>
            {errors.metodoEnvio || ''}
          </p>

          <label>Información adicional</label>
          <textarea
            className="input-moderno"
            name="informacion_adicional"
            value={formData.informacion_adicional}
            onChange={handleChange}
            rows="3"
            maxLength="500"
          />
          <p style={{ color: 'red', fontSize: '0.9em', visibility: errors.informacion_adicional ? 'visible' : 'hidden' }}>
            {errors.informacion_adicional || ''}
          </p>
          <div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                className="boton-moderno-3"
                onClick={handleEnviarFactura}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Factura'}
              </button>
              <br /> <br />
              <button className='boton-moderno-3' onClick={() => navigate('/home')}>
                Seguir comprando
              </button>
            </div>
            <br /> 
            <button
              className="boton-moderno"
              onClick={handleCancelar}
              style={{ backgroundColor: "red" }}
            >
              Cancelar
            </button>
          </div>
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
            <p style={{ color: 'red', fontSize: '0.9em', visibility: errors.metodoEntrega ? 'visible' : 'hidden' }}>
              {errors.metodoEntrega || ''}
            </p>

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
              {modalTitulo || `Detalles de pago: (${metodoEntrega === 'qr' ? 'QR' : 'Contra entrega'})`}
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
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  onChange={handleComprobanteChange}
                  style={{ marginTop: '5px' }}
                  required
                />
                <p style={{ color: 'red', fontSize: '0.9em', visibility: errors.comprobante ? 'visible' : 'hidden' }}>
                  {errors.comprobante || ''}
                </p>
              </label>
              <button className='boton-moderno' onClick={() => setMostrarModal(false)} style={{ marginTop: '10px' }}>
                Aceptar
              </button>
            </>
          ) : (
            <>
              <center><h3 style={{ color: "black" }}>Pago contra entrega</h3></center>
              <img src={compras} alt="Compra QR" style={{ width: '200px', display: 'block', margin: '0 auto 20px' }} />
              <br />
              <center style={{ color: 'black' }}> <p>Total del pedido:</p></center>
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