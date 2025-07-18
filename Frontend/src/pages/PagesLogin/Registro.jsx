/* Importaciones necesarias de React y librerías */
import React, { useState } from 'react';

/* Hoja de estilos */
import '../../assets/styles/Acceso.css';

/* Importación de íconos desde react-icons */
import { FaUser, FaLock, FaUserLock, FaUserCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

/* Importación del componente de rutas */
import { Link, useNavigate } from 'react-router-dom';


/* Importar función de registro desde api/login.js */
import { registrarUsuario } from '../../api/login';

export default function Registro() {
  const [form, setForm] = useState({
    username: '',
    correo: '',
    terminos: false,
  });

  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const salir = () => {
    window.location.href = '/';
  };

  const validar = () => {
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.username.trim()) {
      nuevosErrores.username = 'Por favor ingresa tu nombre de usuario ';
    }
    if (!form.correo.trim()) {
      nuevosErrores.correo = 'Por favor ingresa tu correo ';
    } else if (!emailRegex.test(form.correo)) {
      nuevosErrores.correo = 'Correo no válido';
    }
    
    if (!form.terminos) {
      nuevosErrores.terminos = 'Debes aceptar los Términos y Condiciones';
    }

    return nuevosErrores;
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm({ ...form, [id]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidados = validar();
    setErrores(erroresValidados);

    if (Object.keys(erroresValidados).length === 0) {
      try {
        const response = await registrarUsuario({
          email: form.correo,
          nombre_usuario: form.username,
          nombre: '',
          apellido: '',
          telefono: '',
          direccion: '',
          rol: 'cliente'
        });

        if (response.status === 201 || response.status === 200) {
          alert('Usuario registrado con éxito ✅');
          navigate('/AccedeAqui'); // redirige al login
        }
      } catch (error) {
        console.error(error);
        alert('Error al registrar usuario ❌');
      }
    }
  };

  return (
    <section className='Contenedor'>
      <button className='Salir' onClick={salir}>
        <IoMdClose />
      </button>

      <h1 className='TituloAcceso'>Regístrate</h1>

      <form onSubmit={handleSubmit} noValidate>
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

        {errores.confirmar && <p className='mensaje-error'>{errores.confirmar}</p>}

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

        <button className='Continuar' type='submit'>
          Registrarse
        </button>
      </form>


      <p className='Registro'>
        ¿Ya estás registrado? <Link to='/AccedeAqui'>Accede aquí</Link>
      </p>
    </section>
  );
}
