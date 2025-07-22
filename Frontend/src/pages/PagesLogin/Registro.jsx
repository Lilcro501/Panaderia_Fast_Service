import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/Registro.css";
import orquidea from "../../assets/images/orquidea.jpg";
import Alerta from "../../components/Alerta";

export default function Registro() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    aceptarTerminos: false,
  });

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Verifica campos y redirige si están completos
  const manejarSiguiente = () => {
    const todasRespondidas =
      formulario.nombre &&
      formulario.correo &&
      formulario.password &&
      formulario.confirmarPassword &&
      formulario.aceptarTerminos;

    if (!todasRespondidas || formulario.password !== formulario.confirmarPassword) {
      setMostrarAlerta(true);
    } else {
      console.log("Formulario enviado:", formulario);
      navigate("/Recomendacion"); // Redirige si todo está bien
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-contenido">
        {/* Lado izquierdo con imagen y mensaje */}
        <div className="registro-imagen">
          <h2>Bienvenid@ a la sección de Registro</h2>
          <img src={orquidea} alt="Orquídea" />
        </div>

        {/* Lado derecho con el formulario */}
        <form className="registro-formulario" onSubmit={(e) => e.preventDefault()}>
          <h2 className="registro-titulo">Registrarse</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formulario.correo}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formulario.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmarPassword"
            placeholder="Confirmar contraseña"
            value={formulario.confirmarPassword}
            onChange={handleChange}
            required
          />

          <div className="registro-checkbox-container">
            <input
              type="checkbox"
              name="aceptarTerminos"
              checked={formulario.aceptarTerminos}
              onChange={handleChange}
              id="terminos"
              required
            />
            <label htmlFor="terminos">
              Acepto los <a href="/terminos">términos y condiciones</a>
            </label>
          </div>

          <button
            type="button"
            className="registro-boton"
            onClick={manejarSiguiente}
          >
            Registrarse
          </button>

          <p className="registro-login-texto">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/AccedeAqui" className="registro-link">
              Inicia sesión
            </Link>
          </p>

          {mostrarAlerta && (
            <Alerta
              mensaje="Por favor completa todos los campos correctamente."
              onClose={() => setMostrarAlerta(false)}
            />
          )}
        </form>
      </div>
    </div>
  );
}

