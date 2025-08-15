import React, { useState } from 'react';
import '../../assets/styles/OlvidoContraseña.css';
import { IoMdClose } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { enviarCodigoAlCorreo } from '../../api/login';

export default function OlvidoContraseña() {
  const [correo, setCorreo] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);
  const navigate = useNavigate();

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const esCorreoValido = regexCorreo.test(correo);

  const salir = () => window.location.href = '/';

  const enviarCodigo = async () => {
    setEnviado(true);

    if (!esCorreoValido) return;

    try {
      const response = await enviarCodigoAlCorreo(correo);

      if (response.status === 200) {
        localStorage.setItem('correoRecuperacion', correo);
        setModalExitoVisible(true); // Mostrar modal de éxito
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setModalErrorVisible(true); // Mostrar modal si correo no registrado
      } else {
        alert('❌ No se pudo enviar el código. Intenta más tarde.');
      }
      console.error('Error al enviar código:', error);
    }
  };

  return (
    <>
      <section className='ContenedorC'>
        <button className='Salir' onClick={salir}><IoMdClose /></button>
        <h1 className='TituloAcceso'>¿Olvidó su contraseña?</h1>
        <p>Ingresa tu correo y te enviaremos un código de recuperación</p>

        <div className={`Campo ${!esCorreoValido && enviado ? 'invalido' : ''}`}>
          <FaUser className="Icono" />
          <input
            type='email'
            id='correo'
            placeholder='Correo'
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />
        </div>

        {!esCorreoValido && enviado && (
          <div className="invalid">Por favor, ingresa un correo válido <br /><br /></div>
        )}

        <button className='Continuar' onClick={enviarCodigo}>Enviar código</button>
      </section>

      {/* Modal de error */}
      {modalErrorVisible && (
        <div className="modal-bienvenida">
          <div className="modal-contenido">
            <h2>❌ Correo no registrado</h2>
            <p>El correo que ingresaste no se encuentra en nuestra base de datos.</p>
            <button className="boton-aceptar" onClick={() => setModalErrorVisible(false)}>Aceptar</button>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {modalExitoVisible && (
        <div className="modal-bienvenida">
          <div className="modal-contenido">
            <h2>✅ Código enviado</h2>
            <p>El código de recuperación fue enviado a <strong>{correo}</strong>.</p>
            <button
              className="boton-aceptar"
              onClick={() => navigate('/IngresarCodigo')}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
 