import React, { useState, useRef } from 'react';
import '../../assets/styles/AccedeAqui.css';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

export default function IngresarCodigo() {
  const [codigo, setCodigo] = useState(['', '', '', '']);
  const [tocado, setTocado] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const salir = () => window.location.href = '/';

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const nuevo = [...codigo];
      nuevo[index] = value;
      setCodigo(nuevo);

      if (value !== '' && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('Text').slice(0, 4);
    if (/^\d{4}$/.test(paste)) {
      const nuevoCodigo = paste.split('');
      setCodigo(nuevoCodigo);
      inputRefs.current[3]?.focus();
    }
  };

  const esCodigoValido = codigo.every(d => d !== '');

  const confirmarCodigo = async () => {
    setTocado(true);
    if (!esCodigoValido) return;

    const codigoFinal = codigo.join('');
    const email = localStorage.getItem('correoRecuperacion');

    if (!email) {
      setModalErrorVisible(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/verificar-codigo/', {
        email,
        codigo: codigoFinal,
      });

      if (response.status === 200) {
        setModalExitoVisible(true);
      }
    } catch (error) {
      console.error('❌ Error al verificar código:', error);
      setModalErrorVisible(true);
    }
  };

  return (
    <>
      <section className='ContenedorC'>
        <button className='Salir' onClick={salir}><IoMdClose /></button>
        <h1 className='TituloAcceso'>Ingresa el código</h1>
        <p>Ingresa el código enviado a tu correo electrónico</p>

        <div className="CampoNumero">
          {codigo.map((valor, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              value={valor}
              onChange={e => handleChange(i, e.target.value)}
              onPaste={i === 0 ? handlePaste : undefined}
              maxLength="1"
            />
          ))}
        </div>

        {!esCodigoValido && tocado && (
          <div className="invalid">Completa los 4 dígitos <br /><br /></div>
        )}

        <button className='Continuar' onClick={confirmarCodigo}>Confirmar código</button>
      </section>

      {/* Modal éxito */}
      {modalExitoVisible && (
        <div className="modal-bienvenida">
          <div className="modal-contenido">
            <h2>✅ Código verificado</h2>
            <p>Tu código es correcto. Ahora puedes cambiar tu contraseña.</p>
            <button
              className="boton-aceptar"
              onClick={() => navigate('/CambioContraseña')}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Modal error */}
      {modalErrorVisible && (
        <div className="modal-bienvenida">
          <div className="modal-contenido">
            <h2>❌ Código incorrecto</h2>
            <p>El código ingresado es inválido o ya ha sido usado.</p>
            <button
              className="boton-aceptar"
              onClick={() => setModalErrorVisible(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
