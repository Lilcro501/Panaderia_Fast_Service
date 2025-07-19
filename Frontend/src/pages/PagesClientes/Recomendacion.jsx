import { useState } from "react";
import "../../assets/styles/Experiencia.css"; // Asegúrate que esta ruta sea correcta
import Alerta from "../../components/Alerta";
import Notificacion from "../../components/Notificacion"; // ✅ Nuevo import

export default function Recomendacion() {
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false); // ✅ Estado nuevo

  const manejarSeleccion = (valor) => {
    setValorSeleccionado(valor);
  };

  const manejarSiguiente = () => {
    if (valorSeleccionado === null || respuesta.trim() === "") {
      setMostrarAlerta(true); // Mostrar alerta si falta información
    } else {
      setMostrarNotificacion(true); 
      console.log("Datos enviados:", { valorSeleccionado, respuesta });
    }
  };

  return (
    <div className="recuadro-experiencia">
      <div className="recuadro-pregunta">
        <h4 className="titulo-pregunta">
          ¿Qué tan probable es que recomiendes nuestro servicio?
        </h4>

        <div className="recuadro-calificacion">
          {[...Array(11).keys()].map((num) => (
            <div
              key={num}
              data-valor={num}
              className={`numero-calificacion ${
                valorSeleccionado === num ? "seleccionado" : ""
              }`}
              onClick={() => manejarSeleccion(num)}
            >
              {num}
            </div>
          ))}
        </div>

        <p className="texto-pregunta">
          Indica tu respuesta en una escala de 0 a 10, donde 0 significa que no
          recomendarías y 10 que sí recomendarías.
        </p>

        <textarea
          className="input-respuesta"
          placeholder="¿Por qué?"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />

        <div className="contenedor-boton-final">
          <button className="boton-siguiente" onClick={manejarSiguiente}>
            Siguiente
          </button>
        </div>
      </div>

      {mostrarAlerta && (
        <Alerta
          mensaje="Debes completar la información para continuar"
          onClose={() => setMostrarAlerta(false)}
        />
      )}

      {mostrarNotificacion && (
        <Notificacion
          mensaje="¡Gracias por tu respuesta! Tu opinión es muy valiosa para nosotros."
          onClose={() => setMostrarNotificacion(false)}
        />
      )}
    </div>
  );
}