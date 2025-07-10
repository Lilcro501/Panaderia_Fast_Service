/* Importaciones necesarias de React y librerías */
import React, { useState } from 'react';

/* Hoja de estilos */
import '../../assets/styles/Acceso.css';

/* Importación de íconos desde react-icons */
import { FaUser, FaLock, FaUserLock, FaUserCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

/* Importación del componente de rutas */
import { Link } from 'react-router-dom';

/* Componente funcional llamado Registro */
export default function Registro() {
  // Estado para almacenar los datos del formulario
  const [form, setForm] = useState({
    username: '',
    correo: '',
    password: '',
    confirmar: '',
    terminos: false,
  });

  // Estado para almacenar mensajes de error por campo
  const [errores, setErrores] = useState({});

  // Función para redirigir al inicio al presionar la X
  const salir = () => {
    window.location.href = '/';
  };

  // Función para validar los campos del formulario
  const validar = () => {
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar nombre de usuario
    if (!form.username.trim()) {
      nuevosErrores.username = 'Por favor ingresa tu nombre de usuario ';
    }

    // Validar correo
    if (!form.correo.trim()) {
      nuevosErrores.correo = 'Por favor ingresa tu correo ';
    } else if (!emailRegex.test(form.correo)) {
      nuevosErrores.correo = 'Correo no válido';
    }

    // Validar contraseña
    if (form.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de contraseña
    if (form.confirmar !== form.password) {
      nuevosErrores.confirmar = 'Las contraseñas no coinciden ';
    }

    // Validar aceptación de términos
    if (!form.terminos) {
      nuevosErrores.terminos = 'Debes aceptar los Términos y Condiciones';
    }

    return nuevosErrores;
  };

  // Función para actualizar los valores del formulario al escribir
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm({ ...form, [id]: type === 'checkbox' ? checked : value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    const erroresValidados = validar(); // Ejecuta las validaciones
    setErrores(erroresValidados); // Muestra los errores

    // Si no hay errores, se puede procesar el formulario
    if (Object.keys(erroresValidados).length === 0) {
      alert('Formulario enviado correctamente ✅');
      // Aquí podrías enviar los datos a una API o backend
    }
  };

  return (
    <section className='Contenedor'>
      {/* Botón para cerrar el formulario */}
      <button className='Salir' onClick={salir}>
        <IoMdClose /> {/* Ícono de X */}
      </button>

      <h1 className='TituloAcceso'>Regístrate</h1>

      {/* Formulario con evento onSubmit */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Campo: Nombre de usuario */}
        <div className='Campo'>
          <FaUserCheck className='Icono' />
          <input
            type='text'
            id='username'
            placeholder='Nombre de usuario'
            value={form.username}
            onChange={handleChange}
            className={errores.username ? 'invalido' : ''}
          />
        </div>
        {errores.username && <p className='mensaje-error'>{errores.username}</p>}

        {/* Campo: Correo */}
        <div className='Campo'>
          <FaUser className='Icono' />
          <input
            type='email'
            id='correo'
            placeholder='Correo'
            value={form.correo}
            onChange={handleChange}
            className={errores.correo ? 'invalido' : ''}
          />
        </div>
        {errores.correo && <p className='mensaje-error'>{errores.correo}</p>}

        {/* Campo: Contraseña */}
        <div className='Campo'>
          <FaLock className='Icono' />
          <input
            type='password'
            id='password'
            placeholder='Contraseña'
            value={form.password}
            onChange={handleChange}
            className={errores.password ? 'invalido' : ''}
          />
        </div>
        {errores.password && <p className='mensaje-error'>{errores.password}</p>}

        {/* Campo: Confirmar contraseña */}
        <div className='Campo'>
          <FaUserLock className='Icono' />
          <input
            type='password'
            id='confirmar'
            placeholder='Confirmar contraseña'
            value={form.confirmar}
            onChange={handleChange}
            className={errores.confirmar ? 'invalido' : ''}
          />
        </div>
        {errores.confirmar && <p className='mensaje-error'>{errores.confirmar}</p>}

        {/* Campo: Aceptar Términos y Condiciones */}
        <div className='EstiloAceptartyc'>
          <label className='TextoTerminos'>
            <input
              type='checkbox'
              id='terminos'
              checked={form.terminos}
              onChange={handleChange}
            />
            Acepto los <strong>Términos y Condiciones</strong>
          </label>
        </div>
        {errores.terminos && <p className='mensaje-error'>{errores.terminos}</p>}

        {/* Botón para enviar el formulario */}
        <button className='Continuar' type='submit'>
          Registrarse
        </button>
      </form>

      {/* Enlace a AccedeAquí si ya tienes cuenta */}
      <p className='Registro'>
        ¿Ya estás registrado? <a href='AccedeAqui'>Accede aquí</a>
      </p>
    </section>
  );
}