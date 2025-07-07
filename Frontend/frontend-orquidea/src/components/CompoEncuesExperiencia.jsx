import { useState } from "react";
import "../assets/styles/Experiencia.css";
import calificacion1 from "../assets/icons/calificacion-1.png";
import calificacion2 from "../assets/icons/calificacion-2.png";
import calificacion3 from "../assets/icons/calificacion-3.png";
import calificacion4 from "../assets/icons/calificacion-4.png";
import calificacion5 from "../assets/icons/calificacion-5.png";

const calificaciones = [
  { img: calificacion1, alt: "Calificación 1", value: 1 },
  { img: calificacion2, alt: "Calificación 2", value: 2 },
  { img: calificacion3, alt: "Calificación 3", value: 3 },
  { img: calificacion4, alt: "Calificación 4", value: 4 },
  { img: calificacion5, alt: "Calificación 5", value: 5 },
];

export default function RecuadroEncuesta({ texto }) {
  const [seleccion, setSeleccion] = useState(null);

  return (
    <div className="recuadro-encuesta">
      <div className="contenedor-encuesta">
        <div className="calificaciones">
          {calificaciones.map((item) => (
            <img
              key={item.value}
              src={item.img}
              alt={item.alt}
              className={`tamaño-calificacion ${seleccion === item.value ? "seleccionado" : ""}`}
              onClick={() => setSeleccion(item.value)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>

        <div className="contenedor-input">
          <label className="texto-encuesta" htmlFor="Pregunta1">
            {texto}
          </label>
          <br />
          <input className="input-defecto" type="text" id="Pregunta1" />
        </div>
      </div>
    </div>
  );
}

