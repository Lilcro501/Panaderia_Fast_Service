import React, { useState, useEffect } from 'react';
import '../../assets/styles/AccedeAqui.css';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api, { guardarToken } from "../../api/api";
import { useRol } from '../../Context/RolContext';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import ImagenOrquidea from '../../assets/icons/ImagenOrquidea.png';
import '../../assets/styles/Global.css';

export default function AccedeAqui() {
  const navigate = useNavigate();
  const { cambiarRol } = useRol();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');

  useEffect(() => {
    cambiarRol('sin-registrar');
  }, [cambiarRol]);

  const salir = () => window.location.href = '/';

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  const CorreoValido = regexCorreo.test(correo);
  const PasswordValida = regexPassword.test(password);

  const redirigirPorRol = (rol) => {
    setTimeout(() => {
      switch (rol) {
        case 'admin': navigate('/PrincipalAdmin'); break;
        case 'trabajador': navigate('/Inicio'); break;
        case 'cliente': navigate('/home'); break;
        default: navigate('/'); 
      }
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);
    setErrorLogin('');

    if (!CorreoValido || !PasswordValida) return;

    try {
      const response = await api.post('/api/usuarios/token/', { email: correo, password }, { withCredentials: true });
      const { access, nombre, rol, id_usuario } = response.data;

      if (!rol) {
        setErrorLogin('⚠️ Error: No se recibió el rol del usuario.');
        return;
      }

      const rolLower = rol.toLowerCase();
      sessionStorage.setItem('nombre', nombre);
      sessionStorage.setItem('rol', rolLower);
      sessionStorage.setItem('id_usuario', id_usuario);
      sessionStorage.setItem('loginMetodo', 'manual');
      guardarToken(access);

      cambiarRol(rolLower);
      redirigirPorRol(rolLower);
    } catch (error) {
      const mensaje = error.response?.data?.error || '❌ Error desconocido en el inicio de sesión';
      setErrorLogin(mensaje);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post(
        '/api/usuarios/login/google/',
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      const { access, nombre, rol, id_usuario } = response.data;

      if (!rol) {
        setErrorLogin('⚠️ Error: No se recibió el rol del usuario (Google).');
        return;
      }

      const rolLower = rol.toLowerCase();
      sessionStorage.setItem('nombre', nombre);
      sessionStorage.setItem('rol', rolLower);
      sessionStorage.setItem('id_usuario', id_usuario);
      sessionStorage.setItem('loginMetodo', 'google');
      guardarToken(access);

      cambiarRol(rolLower);
      redirigirPorRol(rolLower);
    } catch (error) {
      setErrorLogin('Error al iniciar sesión con Google');
    }
  };

  return (
    <section className='Cont'>
      <div className='ContenedorIzquierdo'>
        <h1>Tú día inicia mejor con nuestro pan</h1>
        <div className='ImagenOrquidea'>
          <img src={ImagenOrquidea} alt='Orquidea' />
        </div>
      </div>

      <div className='ContenedorDerecho'>
        <button className='Salir' type='button' onClick={salir}>
          <IoMdClose />
        </button>
        <form className='Form' onSubmit={handleSubmit} noValidate>
          <h1 className='TituloAccesoI'>Inicia sesión</h1>

          <div className={`Camp form-control ${!CorreoValido && enviado ? 'is-invalid' : ''}`}>
            <FaUser className='Icono' />
            <input
              type='email'
              placeholder='Correo'
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          {!CorreoValido && enviado && <div className='invalid'>Por favor, ingresa un correo válido</div>}

          <div className={`Camp form-control ${!PasswordValida && enviado ? 'is-invalid' : ''}`}>
            <FaLock className='Icono' />
            <input
              type={mostrarPassword ? 'text' : 'password'}
              placeholder='Contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className='Ojo' onClick={() => setMostrarPassword(!mostrarPassword)}>
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {!PasswordValida && enviado && (
            <div className='invalid'>
              La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.
            </div>
          )}

          {errorLogin && <div className='invalid'>{errorLogin}</div>}

          <div className='Opciones'>
            <Link to='/OlvidoContraseña'>¿Olvidaste tu contraseña?</Link>
          </div>

          <div className='IntegracionBotones'>
            <button className='Continua' type='submit'>Iniciar sesión</button>
            <br /><br />
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErrorLogin('Error al iniciar sesión con Google')}
            />
          </div>

          <p className='Registro'>
            ¿No estás registrado? <Link to='/Registro'>Regístrate</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

