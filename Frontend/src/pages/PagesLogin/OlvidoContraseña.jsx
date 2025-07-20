/* ~~~~~~~ Importación de React y UseState para manejar estados ~~~~~~~ */
import React, { useState } from 'react';

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/OlvidoContraseña.css';

/* ~~~~~~~ importación de ícono de salir X ~~~~~~~ */
import { IoMdClose } from 'react-icons/io';

/* ~~~~~~~ Importación de ícono de usuario ~~~~~~~ */
import { FaUser } from 'react-icons/fa';

/* ~~~~~~~ Importación de UseNavigate para las redirecciones ~~~~~~~ */
import { useNavigate } from 'react-router-dom';

/* ~~~~~~~ Función para enviar código al backend ~~~~~~~ */
import { enviarCodigoAlCorreo } from '../../api/login';

export default function OlvidoContraseña() {
  const [correo, setCorreo] = useState('');
  const [enviado, setEnviado] = useState(false);
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
        // Guardamos el correo para usarlo después
        localStorage.setItem('correoRecuperacion', correo);
        alert('✅ Código enviado al correo');
        navigate('/IngresarCodigo');
      }
    } catch (error) {
      alert('❌ No se pudo enviar el código. Intenta más tarde.');
      console.error('Error al enviar código:', error);
    }
  };

  return (
    <section className='ContenedorC'>
      <button className='Salir' onClick={salir}><IoMdClose /></button>
      <h1 className='TituloAcceso'>Olvidó su contraseña</h1>
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
  );
}
