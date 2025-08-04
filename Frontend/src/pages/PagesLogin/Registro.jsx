import React, { useState } from 'react';
import { FaUser, FaLock, FaUserLock } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import LoginGoogle from '../../components/LoginGoogle';
import { registrarUsuario } from '../../api/login';
import '../../assets/styles/Registro.css';
import orquidea from "../../assets/icons/ImagenOrquidea.png"; 

export default function Registro() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmar: '',
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

    if (!form.nombres.trim()) {
      nuevosErrores.nombres = 'Por favor ingresa tus nombres';
    }

    if (!form.apellidos.trim()) {
      nuevosErrores.apellidos = 'Por favor ingresa tus apellidos';
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = 'Por favor ingresa tu correo';
    } else if (!emailRegex.test(form.correo)) {
      nuevosErrores.correo = 'Correo no válido';
    }

    if (form.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (form.confirmar !== form.password) {
      nuevosErrores.confirmar = 'Las contraseñas no coinciden';
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
          password: form.password,
          nombre: form.nombres,
          apellido: form.apellidos,
          telefono: '',
          direccion: '',
          rol: 'cliente'
        });
        if (response.status === 201 || response.status === 200) {
          alert('Usuario registrado con éxito ✅');
          navigate('/AccedeAqui');
        }
      } catch (error) {
        console.error(error);
        alert('Error al registrar usuario ❌');
      }
    }
  };

  return (
    <section className='Contenedor'>
      <div className='PanelIzquierdo'>
        <h1>Bienvenido a la sección de registro</h1>
        <br/>
        <div className='ImagenOrquidea'>
        <img src={orquidea} alt='Registro' />
        </div>
      </div> 

      <div className='PanelDerecho'>

        <button className='Salir' onClick={salir}>
          <IoMdClose />
        </button>
        
        <form className='Form' onSubmit={handleSubmit} noValidate>
          <h1 className='TituloAcceso'>Regístrate</h1>
          <div className='Campo'>
            <FaUser className='Icono' />
            <input
              type='text'
              id='nombres'
              placeholder='Nombres'
              value={form.nombres}
              onChange={handleChange}
              className={errores.nombres ? 'invalido' : ''}
            />
          </div>
          {errores.nombres && <p className='mensaje-error'>{errores.nombres}</p>}

        <div className='Campo'>
          <FaUser className='Icono' />
          <input
            type='text'
            id='apellidos'
            placeholder='Apellidos'
            value={form.apellidos}
            onChange={handleChange}
            className={errores.apellidos ? 'invalido' : ''}
          />
        </div>
        {errores.apellidos && <p className='mensaje-error'>{errores.apellidos}</p>}

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

        <div className='EstiloAceptartyc'>
          <label className='TextoTerminos'>
            <input
              type='checkbox'
              id='terminos'
              checked={form.terminos}
              onChange={handleChange}
            />
          <span>Acepto los <strong>Términos y Condiciones</strong></span> 
          </label>
          
        </div>
        {errores.terminos && <p className='mensaje-error'>{errores.terminos}</p>}

        <button className='Continuar' type='submit'>
          Registrarse
        </button>
      
        <p className='Registro'>
          ¿Ya estás registrado? <Link to='/AccedeAqui'>Accede aquí</Link>
        </p>
      </form>
      </div>
    </section>
  );
}
