// ~~~~~~~ Importación de React y useState para manejar estados ~~~~~~~
import React, { useState } from 'react';

// Importar el componente del botón de Google
import LoginGoogle from '../../components/LoginGoogle';

// ~~~~~~~ Importación de hoja de estilos ~~~~~~~
import '../../assets/styles/Acceso.css';

import { Link, useNavigate } from 'react-router-dom';

import { FaUser, FaLock } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { iniciarSesion } from '../../api/login';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function AccedeAqui() {
  const navigate = useNavigate();

  const salir = () => {
    window.location.href = '/';
  };

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const CorreoValido = regexCorreo.test(correo);
  const PasswordValida = regexPassword.test(password);

  const redirigirPorRol = (rol) => {
    switch (rol) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'trabajador':
        navigate('/trabajador/pedidos');
        break;
      case 'cliente':
      default:
        navigate('/');
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);
    setErrorLogin('');

    if (!CorreoValido || !PasswordValida) return;

    try {
      const response = await iniciarSesion({ email: correo, password });

      if (response.status === 200) {
        const { access, refresh, nombre, rol, id_usuario } = response.data;
        const rolLower = rol.toLowerCase();

        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('rol', rolLower);
        localStorage.setItem('id_usuario', id_usuario);

        alert(`Bienvenido ${nombre} (${rolLower})`);
        redirigirPorRol(rolLower);
      }
    } catch (error) {
      console.log("📛 Error:", error.response?.data || error.message);
      const mensaje = error.response?.data?.error || 'Error desconocido';
      setErrorLogin(mensaje);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/login/google/', {
        token: credentialResponse.credential
      });

      const { access, refresh, nombre, rol, id_usuario } = response.data;
      const rolLower = rol.toLowerCase();

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('rol', rolLower);
      localStorage.setItem('id_usuario', id_usuario);

      alert(`Bienvenido ${nombre} (${rolLower}) con Google`);
      redirigirPorRol(rolLower);
    } catch (error) {
      console.error("❌ Error en login con Google:", error.response?.data || error.message);
      setErrorLogin('Error con Google Login');
    }
  };

  return (
    <section className='Contenedor'>
      <form onSubmit={handleSubmit} noValidate>
        <button className='Salir' type="button" onClick={salir}>
          <IoMdClose />
        </button>

        <br /><br />
        <h1 className='TituloAcceso'>Inicia sesión</h1>

        <div className={`Campo form-control ${!CorreoValido && enviado ? 'is-invalid' : ''}`}>
          <FaUser className="Icono" />
          <input
            type='email'
            id='correo'
            placeholder='Correo'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        {!CorreoValido && enviado && (
          <div className="invalid">Por favor, ingresa un correo válido</div>
        )}

        <div className={`Campo form-control ${!PasswordValida && enviado ? 'is-invalid' : ''}`}>
          <FaLock className="Icono" />
          <input
            type='password'
            id='password'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!PasswordValida && enviado && (
          <div className="invalid">Contraseña incorrecta</div>
        )}

        {errorLogin && <div className="invalid">{errorLogin}</div>}

        <div className="Opciones">
          <label className='Label'>
            <input type='checkbox' id='check' name='check' />
            Recordar contraseña
          </label>
          <Link to="/OlvidoContraseña">¿Olvidaste tu contraseña?</Link>
        </div>

        {/* Botón para iniciar sesión */}
        <button className='Continuar' type='submit'>Iniciar sesión</button>

        {/* Google Login (OAuth directo) */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>O inicia sesión con:</p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('❌ Error en el login con Google');
            }}
          />
        </div>

        {/* Botón personalizado de Login con Google (si lo quieres mostrar también) */}
        <div className='google-login-container' style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>O regístrate con Google</p>
          <LoginGoogle />
        </div>

        {/* Enlace para registrarse */}
        <p className="Registro">
          ¿No estás registrado? <Link to="/Registro">Regístrate</Link>
        </p>
      </form>
    </section>
  );
}

