import { useState } from "react";
import "../assets/styles/Experiencia.css";
import CalificacionInformacion from "./CalificacionInformacion";
import { Link } from "react-router-dom";

export default function Experiencia() {
  const [calificacion, setCalificacion] = useState(null);
  const [respuesta, setRespuesta] = useState("");

  const handleSeleccion = (valor) => {
    setCalificacion(valor);
  };

  return (
    <div className="recuadro-enviar">
      <div className="recuadro-pregunta">
        <div className="contenedor-recuadro-enviar">
          <br />
          <div className="recuadro-informacion-3">
            <h4>
              Indica tu respuesta donde 0 significa que no lo recomendarías y 10
              totalmente lo recomendarías
            </h4>
          </div>
          <br />
          <br />

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <p
                key={num}
                className={`numero ${calificacion === num ? "numero-seleccionado" : ""}`}
                onClick={() => handleSeleccion(num)}
                style={{ cursor: "pointer" }}
              >
                {num}
              </p>
            ))}
          </div>

          <br />
          <br />

          <div className="pregunta-input">
            <label htmlFor="porque" style={{ color: "black" }}>
              ¿Por qué?
            </label>
            <br />
            <br />
            <input
              className="input-defecto"
              type="text"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
            <br />
            <br />
          </div>
          <br />
          <Link to="/">
            <button className="boton-enviar">Enviar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

