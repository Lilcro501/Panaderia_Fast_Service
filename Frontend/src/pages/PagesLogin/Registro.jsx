import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaUserLock, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import orquidea from '../../assets/icons/ImagenOrquidea.png';
import '../../assets/styles/Registro.css';

export default function Registro() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    password: '',
    confirmar: '',
    terminos: false,
  });

  useEffect(() => {
    const datosGuardados = sessionStorage.getItem('registroForm');
    if (datosGuardados) {
      const parsedData = JSON.parse(datosGuardados);
      setForm((prev) => ({
        ...prev,
        nombres: parsedData.nombres || '',
        apellidos: parsedData.apellidos || '',
        correo: parsedData.correo || '',
        telefono: parsedData.telefono || '',
        terminos: parsedData.terminos || false,
      }));
    }
  }, []);

  const [errores, setErrores] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeErrorGeneral, setMensajeErrorGeneral] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const navigate = useNavigate();

  const dominiosValidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'example.co', 'example.com'];
  const API_URL = import.meta.env.VITE_API_URL; // <-- Variable de entorno

  const validarDominioCorreo = (correo) => {
    const partes = correo.split('@');
    if (partes.length !== 2) return false;
    return dominiosValidos.includes(partes[1].toLowerCase());
  };

  const salir = () => {
    window.location.href = '/';
  };

  const validar = () => {
    const nuevosErrores = {};
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{7,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

    if (!form.nombres.trim()) nuevosErrores.nombres = 'Por favor ingresa tus nombres';
    else if (!nombreRegex.test(form.nombres)) nuevosErrores.nombres = 'Los nombres solo deben contener letras y mínimo 2 caracteres';

    if (!form.apellidos.trim()) nuevosErrores.apellidos = 'Por favor ingresa tus apellidos';
    else if (!nombreRegex.test(form.apellidos)) nuevosErrores.apellidos = 'Los apellidos solo deben contener letras y mínimo 2 caracteres';

    if (!form.correo.trim()) nuevosErrores.correo = 'Por favor ingresa tu correo';
    else if (!emailRegex.test(form.correo)) nuevosErrores.correo = 'Formato de correo no válido';
    else if (!validarDominioCorreo(form.correo)) nuevosErrores.correo = 'El dominio del correo no es válido';

    if (!form.telefono.trim()) nuevosErrores.telefono = 'Por favor ingresa tu número de teléfono';
    else if (!telefonoRegex.test(form.telefono)) nuevosErrores.telefono = 'El teléfono debe tener entre 7 y 15 dígitos';

    if (!form.password.trim()) nuevosErrores.password = 'Por favor ingresa una contraseña';
    else if (!passwordRegex.test(form.password))
      nuevosErrores.password =
        'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y un carácter especial';

    if (form.confirmar !== form.password) nuevosErrores.confirmar = 'Las contraseñas no coinciden';

    if (!form.terminos) nuevosErrores.terminos = 'Debes aceptar los Términos y Condiciones';

    return nuevosErrores;
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const nuevoValor = type === 'checkbox' ? checked : value;
    const nuevoForm = { ...form, [id]: nuevoValor };
    setForm(nuevoForm);

    const datosParaGuardar = {
      nombres: nuevoForm.nombres,
      apellidos: nuevoForm.apellidos,
      correo: nuevoForm.correo,
      telefono: nuevoForm.telefono,
      terminos: nuevoForm.terminos,
    };
    sessionStorage.setItem('registroForm', JSON.stringify(datosParaGuardar));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidados = validar();
    setErrores(erroresValidados);
    setMensajeErrorGeneral('');

    if (Object.keys(erroresValidados).length === 0) {
      try {
        const payload = {
          email: form.correo,
          password: form.password,
          nombre: form.nombres,
          apellido: form.apellidos,
          telefono: form.telefono,
          rol: 'cliente',
        };

        console.log('Datos a enviar:', payload);
        /*cambio de ruta */
        const response = await axios.post(`${API_URL}/api/usuarios/registro/`, payload);

        if (response.status === 201 || response.status === 200) {
          setModalVisible(true);
        } else {
          setMensajeErrorGeneral('Hubo un problema en el registro.');
        }
      } catch (error) {
        console.error(error.response?.data || error);
        if (error.response) {
          const data = error.response.data;
          if (data.email) {
            setMensajeErrorGeneral('El correo ya está registrado.');
          } else {
            setMensajeErrorGeneral(data.message || 'Hubo un problema en el registro.');
          }
        } else if (error.request) {
          setMensajeErrorGeneral('No se pudo conectar con el servidor.');
        } else {
          setMensajeErrorGeneral('Ocurrió un error inesperado.');
        }
      }
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
    sessionStorage.removeItem('registroForm');
    navigate('/AccedeAqui');
  };

  return (
    <section className='Contenedor'>
      <div className='PanelIzquierdo'>
        <h1>Bienvenido a la sección de registro</h1>
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
          {mensajeErrorGeneral && <p className='mensaje-error'>{mensajeErrorGeneral}</p>}

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
            <FaPhone className='Icono' />
            <input
              type='tel'
              id='telefono'
              placeholder='Teléfono'
              value={form.telefono}
              onChange={handleChange}
              className={errores.telefono ? 'invalido' : ''}
            />
          </div>
          {errores.telefono && <p className='mensaje-error'>{errores.telefono}</p>}

          <div className='Campo'>
            <FaLock className='Icono' />
            <input
              type={mostrarPassword ? 'text' : 'password'}
              id='password'
              placeholder='Contraseña'
              value={form.password}
              onChange={handleChange}
              className={errores.password ? 'invalido' : ''}
            />
            <span className='Ojo' onClick={() => setMostrarPassword(!mostrarPassword)}>
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errores.password && <p className='mensaje-error'>{errores.password}</p>}

          <div className='Campo'>
            <FaUserLock className='Icono' />
            <input
              type={mostrarConfirmar ? 'text' : 'password'}
              id='confirmar'
              placeholder='Confirmar contraseña'
              value={form.confirmar}
              onChange={handleChange}
              className={errores.confirmar ? 'invalido' : ''}
            />
            <span className='Ojo' onClick={() => setMostrarConfirmar(!mostrarConfirmar)}>
              {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errores.confirmar && <p className='mensaje-error'>{errores.confirmar}</p>}

          <div className='EstiloAceptartyc'>
            <label className='TextoTerminos'>
              <input type='checkbox' id='terminos' checked={form.terminos} onChange={handleChange} />
              <span className='TerminosCondiciones'>
                Acepto los <Link to='/TYC'> <strong>Términos y Condiciones</strong></Link>
              </span>
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

      {modalVisible && (
        <div className='modal-fondo'>
          <div className='modal-contenido'>
            <h3>¡Registro exitoso! 🎉</h3>
            <p>Tu cuenta ha sido creada correctamente.</p>
            <button className='boton-aceptar' onClick={cerrarModal}>
              Ir a iniciar sesión
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
