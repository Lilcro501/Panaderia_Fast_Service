import "../assets/styles/Experiencia.css";
import calificacion1 from "../assets/icons/calificacion-1.png";
import calificacion2 from "../assets/icons/calificacion-2.png";
import calificacion3 from "../assets/icons/calificacion-3.png";
import calificacion4 from "../assets/icons/calificacion-4.png";
import calificacion5 from "../assets/icons/calificacion-5.png";

export default function RecuadroEncuesta({ texto }) {
  return (
    <div className="recuadro-encuesta">
        <div className="contenedor-encuesta">
            <img src={calificacion1} alt="Calificación 1" className="tamaño-calificacion" />
            <img src={calificacion2} alt="Calificación 2" className="tamaño-calificacion" />
            <img src={calificacion3} alt="Calificación 3" className="tamaño-calificacion"/>
            <img src={calificacion4} alt="Calificación 4" className="tamaño-calificacion"/>
            <img src={calificacion5} alt="Calificación 5" className="tamaño-calificacion"/>
      
        
        <div className="contenedor-input">
            <label className="texto-encuesta"   htmlFor="Pregunta1">{texto}</label>
            <br />
            <input  className="input-defecto" type="text" id="Pregunta1" />
        </div>
      </div>
    </div>
  );
}

