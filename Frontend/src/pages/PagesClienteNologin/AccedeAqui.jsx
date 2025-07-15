/* ~~~~~~~ Importación de React y UseState para manejar estados ~~~~~~~ */
import React, { useState } from 'react';

/* ~~~~~~~ Importación de hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

/* ~~~~~~~ Importación de Link para navegación y useNavigate para redirecciones ~~~~~~~ */
import { Link, useNavigate } from 'react-router-dom';

/* ~~~~~~~ Importación de íconos de usuario y candado ~~~~~~~ */
import { FaUser, FaLock } from 'react-icons/fa';

/* ~~~~~~~ Ícono para botón de cerrar (X) ~~~~~~~ */
import { IoMdClose } from 'react-icons/io';

/* ~~~~~~~ Importación de Axios o función personalizada ~~~~~~~ */
import { iniciarSesion } from '../../api/login'; // Asegúrate de que esta ruta sea correcta

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

const handleSubmit = async (e) => {
  e.preventDefault();
  setEnviado(true);
  setErrorLogin('');

  if (!CorreoValido || !PasswordValida) return;

  try {
    const response = await iniciarSesion({ email: correo, password }); // ✅ corregido

    if (response.status === 200) {
      const { nombre, rol } = response.data;
      alert(`Bienvenido ${nombre} (${rol})`);
      navigate('/');
    }
  } catch (error) {
  console.log("📛 Error:", error.response?.data || error.message); // ✅ importante
  const mensaje = error.response?.data?.error || 'Error desconocido';
  setErrorLogin(mensaje);
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

        {/* Error de login desde el servidor */}
        {errorLogin && <div className="invalid">{errorLogin}</div>}

        <div className="Opciones">
          <label className='Label'>
            <input type='checkbox' id='check' name='check' />
            Recordar contraseña
          </label>
          <Link to="/OlvidoContraseña">¿Olvidaste tu contraseña?</Link>
        </div>

        <button className='Continuar' type='submit'>Iniciar sesión</button>

        <p className="Registro">
          ¿No estás registrado? <Link to="/Registro">Regístrate</Link>
        </p>
      </form>
    </section>
  );
}
