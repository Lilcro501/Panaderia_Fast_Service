import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Registro.css";
import orquidea from "../../assets/images/orquidea.jpg";

export default function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    aceptarTerminos: false,
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    if (formulario.password !== formulario.confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    console.log("Formulario enviado:", formulario);
    // Aquí iría la lógica de envío al backend (API)
  };

  return (
    <div className="registro-container">
      <div className="registro-contenido">
        {/* Lado izquierdo con imagen y mensaje */}
        <div className="registro-imagen">
          <h2>Bienvinid@ a la sección de Registro</h2>
          <img src={orquidea} alt="Orquídea" />
        </div>

        {/* Lado derecho con el formulario */}
        <form className="registro-formulario" onSubmit={handleSubmit}>
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

          <button type="submit" className="registro-boton">Registrarse</button>

          <p className="registro-login-texto">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/AccedeAqui" className="registro-link">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
