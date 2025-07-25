import React, { useState, useRef } from 'react';

import '../../assets/styles/Acceso.css';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

export default function IngresarCodigo() {
  const [codigo, setCodigo] = useState(['', '', '', '']);
  const [tocado, setTocado] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const salir = () => window.location.href = '/';

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const nuevo = [...codigo];
      nuevo[index] = value;
      setCodigo(nuevo);

      // Enfocar siguiente input
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
      inputRefs.current[3]?.focus(); // Enfocar último input
    }
  };

  const esCodigoValido = codigo.every(d => d !== '');

  const confirmarCodigo = async () => {
    setTocado(true);
    if (!esCodigoValido) return;

    const codigoFinal = codigo.join('');
    const email = localStorage.getItem('correoRecuperacion');

    if (!email) {
      alert('❌ No se encontró el correo. Por favor vuelve a solicitar el código.');
      navigate('/OlvidoContraseña');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/verificar-codigo/', {
        email,
        codigo: codigoFinal,
      });

      if (response.status === 200) {
        alert('✅ Código verificado correctamente');
        navigate('/CambioContraseña');
      }
    } catch (error) {
      console.error('❌ Error al verificar código:', error);
      alert('❌ Código incorrecto o ya usado');
    }
  };

  return (
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
            id={`num-${i}`}
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
  );
}
