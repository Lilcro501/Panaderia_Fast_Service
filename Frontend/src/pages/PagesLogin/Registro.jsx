import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Registro.css"; // hoja de estilos personalizada
import orquidea from "../../assets/images/orquidea.jpg"; // imagen de la orquídea

export default function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    aceptarTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    console.log("Formulario enviado:", formulario);
    // Aquí puedes hacer el envío al backend (API)
  };

  return (
    <div className="registro-container">
      <div className="registro-contenido">
        {/* Imagen lateral */}
        <div className="registro-imagen">
          <img src={orquidea} alt="Orquídea" />
        </div>

        {/* Formulario */}
        <form className="registro-formulario" onSubmit={handleSubmit}>
          <h2 className="registro-titulo">Regístrate</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre de usuario"
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

          <div className="registro-terminos">
            <input
              type="checkbox"
              name="aceptarTerminos"
              checked={formulario.aceptarTerminos}
              onChange={handleChange}
              id="terminos"
              required
            />
            <label>
               <a  href="terminos">Acepto los términos y condiciones</a>
            </label>
          </div>

          <button type="submit" className="registro-boton">
            Registrarse
          </button>

          <p className="registro-login-texto">
            ¿Ya estás registrado?{" "}
            <Link to="/AccedeAqui" className="registro-link">
               ¿Ya estás registrado? Sino. Accede aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
