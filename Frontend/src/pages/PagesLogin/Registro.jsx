import React, { useState, useEffect} from 'react';
import { FaUser, FaLock, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../../api/login';
import orquidea from "../../assets/icons/ImagenOrquidea.png"; 
import '../../assets/styles/Registro.css';

export default function Registro() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmar: '',
    terminos: false,
  });

  useEffect(() => {
    const datosGuardados = localStorage.getItem('registroForm');
    if (datosGuardados) {
      setForm(JSON.parse(datosGuardados));
    }
  }, []);


  const [errores, setErrores] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeErrorGeneral, setMensajeErrorGeneral] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const navigate = useNavigate();

  // Lista de dominios permitidos
  const dominiosValidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'example.co', 'example.com'];

  // Función para validar dominio
  const validarDominioCorreo = (correo) => {
    const partes = correo.split('@');
    if (partes.length !== 2) return false;
    const dominio = partes[1].toLowerCase();
    return dominiosValidos.includes(dominio);
  };

  const salir = () => window.location.href = '/';

  const validar = () => {
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!form.nombres.trim()) nuevosErrores.nombres = 'Por favor ingresa tus nombres';
    if (!form.apellidos.trim()) nuevosErrores.apellidos = 'Por favor ingresa tus apellidos';

    if (!form.correo.trim()) nuevosErrores.correo = 'Por favor ingresa tu correo';
    else if (!emailRegex.test(form.correo)) nuevosErrores.correo = 'Correo no válido';
    else if (!validarDominioCorreo(form.correo)) nuevosErrores.correo = 'El dominio del correo no es válido';

    if (!passwordRegex.test(form.password)) nuevosErrores.password =
      'La contraseña debe tener al menos 6 caracteres, incluyendo letras y números';
    if (form.confirmar !== form.password) nuevosErrores.confirmar = 'Las contraseñas no coinciden';
    if (!form.terminos) nuevosErrores.terminos = 'Debes aceptar los Términos y Condiciones';

    return nuevosErrores;
  };

  const handleChange = (e) => {
  const { id, value, type, checked } = e.target;
  const nuevoValor = type === 'checkbox' ? checked : value;
  const nuevoForm = { ...form, [id]: nuevoValor };
  setForm(nuevoForm);
  localStorage.setItem('registroForm', JSON.stringify(nuevoForm));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidados = validar();
    setErrores(erroresValidados);
    setMensajeErrorGeneral("");

    if (Object.keys(erroresValidados).length === 0) {
      try {
        const payload = {
          email: form.correo,
          password: form.password,
          nombre: form.nombres,
          apellido: form.apellidos,
          telefono: '',
          rol: 'cliente'
        };

        console.log("Datos a enviar:", payload); // Debug

        const response = await registrarUsuario(payload);

        if (response.status === 201 || response.status === 200) setModalVisible(true);
      } catch (error) {
        console.error(error.response?.data || error);
        if (error.response) {
          // Mostrar errores específicos del backend
          const data = error.response.data;
          if (data.email) setMensajeErrorGeneral("El correo ya está registrado.");
          else setMensajeErrorGeneral(JSON.stringify(data));
        } else if (error.request) setMensajeErrorGeneral("No se pudo conectar con el servidor.");
        else setMensajeErrorGeneral("Ocurrió un error inesperado.");
      }
    }
  };

 const cerrarModal = () => {
  setModalVisible(false);
  localStorage.removeItem('registroForm'); // 🔥 limpia los datos
  navigate('/AccedeAqui');
};


  const toggleMostrarPassword = () => setMostrarPassword(!mostrarPassword);
  const toggleMostrarConfirmar = () => setMostrarConfirmar(!mostrarConfirmar);

  return (
    <section className='Contenedor'>
      <div className='PanelIzquierdo'>
        <h1>Bienvenido a la sección de registro</h1>
        <div className='ImagenOrquidea'>
          <img src={orquidea} alt='Registro' />
        </div>
      </div> 

      <div className='PanelDerecho'>
        <button className='Salir' onClick={salir}><IoMdClose /></button>
        
        <form className='Form' onSubmit={handleSubmit} noValidate>
          <h1 className='TituloAcceso'>Regístrate</h1>
          {mensajeErrorGeneral && <p className="mensaje-error">{mensajeErrorGeneral}</p>}

          <div className='Campo'>
            <FaUser className='Icono' />
            <input type='text' id='nombres' placeholder='Nombres' value={form.nombres} onChange={handleChange} className={errores.nombres ? 'invalido' : ''}/>
          </div>
          {errores.nombres && <p className='mensaje-error'>{errores.nombres}</p>}

          <div className='Campo'>
            <FaUser className='Icono' />
            <input type='text' id='apellidos' placeholder='Apellidos' value={form.apellidos} onChange={handleChange} className={errores.apellidos ? 'invalido' : ''}/>
          </div>
          {errores.apellidos && <p className='mensaje-error'>{errores.apellidos}</p>}

          <div className='Campo'>
            <FaUser className='Icono' />
            <input type='email' id='correo' placeholder='Correo' value={form.correo} onChange={handleChange} className={errores.correo ? 'invalido' : ''}/>
          </div>
          {errores.correo && <p className='mensaje-error'>{errores.correo}</p>}

          <div className='Campo'>
            <FaLock className='Icono' />
            <input type={mostrarPassword ? 'text' : 'password'} id='password' placeholder='Contraseña' value={form.password} onChange={handleChange} className={errores.password ? 'invalido' : ''}/>
            <span className="Ojo" onClick={toggleMostrarPassword}>
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errores.password && <p className='mensaje-error'>{errores.password}</p>}

          <div className='Campo'>
            <FaUserLock className='Icono' />
            <input type={mostrarConfirmar ? 'text' : 'password'} id='confirmar' placeholder='Confirmar contraseña' value={form.confirmar} onChange={handleChange} className={errores.confirmar ? 'invalido' : ''}/>
            <span className="Ojo" onClick={toggleMostrarConfirmar}>
              {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errores.confirmar && <p className='mensaje-error'>{errores.confirmar}</p>}

          <div className='EstiloAceptartyc'>
            <label className='TextoTerminos'>
              <input type='checkbox' id='terminos' checked={form.terminos} onChange={handleChange}/>
              <Link to="/TYC"><span>Acepto los <strong>Términos y Condiciones</strong></span></Link>
            </label>
          </div>
          {errores.terminos && <p className='mensaje-error'>{errores.terminos}</p>}

          <button className='Continuar' type='submit'>Registrarse</button>
        
          <p className='Registro'>¿Ya estás registrado? <Link to='/AccedeAqui'>Accede aquí</Link></p>
        </form>
      </div>

      {modalVisible && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h3>¡Registro exitoso! 🎉</h3>
            <p>Tu cuenta ha sido creada correctamente.</p>
            <button className="boton-aceptar" onClick={cerrarModal}>Ir a iniciar sesión</button>
          </div>
        </div>
      )}
    </section>
  );
}
