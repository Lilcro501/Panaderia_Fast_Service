import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../assets/styles/Experiencia.css";
import Alerta from "../../components/Alerta.jsx";
import Notificacion from "../../components/Notificacion.jsx";

import carita1 from "../../assets/images/carita1.png";
import carita2 from "../../assets/images/carita2.png";
import carita3 from "../../assets/images/carita3.png";
import carita4 from "../../assets/images/carita4.png";

const opciones = [
  { src: carita1, alt: "Muy mala" },
  { src: carita2, alt: "Mala" },
  { src: carita3, alt: "Buena" },
  { src: carita4, alt: "Excelente" }
];

const preguntas = [
  { titulo: "⭐ Percepción general del servicio", texto: "¿Cómo fue tu experiencia?", id: "pregunta1" },
  { titulo: "🤝 Amabilidad y atención", texto: "¿Se te atendió con amabilidad y cortesía?", id: "pregunta2" },
  { titulo: "🥐 Calidad del producto", texto: "¿Qué producto consumiste más?", id: "pregunta3" },
  { titulo: "⚡ Agilidad en tu pedido", texto: "¿En cuánto tiempo recibiste el pedido? ¿Te pareció adecuado el tiempo?", id: "pregunta4" }
];

export default function EncuestaCompleta() {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [seleccionadas, setSeleccionadas] = useState({});
  const [respuestasTexto, setRespuestasTexto] = useState({});
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [respuestaRecomendacion, setRespuestaRecomendacion] = useState("");

  const navigate = useNavigate();

  const handleChange = (tipo, id, valor) => {
    if (tipo === "emoji") {
      setSeleccionadas(prev => ({ ...prev, [id]: valor }));
    } else if (tipo === "texto") {
      setRespuestasTexto(prev => ({ ...prev, [id]: valor }));
    } else if (tipo === "recomendacion") {
      setValorSeleccionado(valor);
    }
  };

  const validarFormulario = () => {
    const todasPreguntasOk = preguntas.every(
      p => seleccionadas[p.id] !== undefined && respuestasTexto[p.id]?.trim() !== ""
    );
    const recomendacionOk = valorSeleccionado !== null && respuestaRecomendacion.trim() !== "";
    return todasPreguntasOk && recomendacionOk;
  };

  const enviarDatos = async () => {
    const datos = {
      experiencia: { calificaciones: seleccionadas, respuestas: respuestasTexto },
      recomendacion: { puntuacion: valorSeleccionado, comentario: respuestaRecomendacion }
    };

    try {
      const token = sessionStorage.getItem("access");
      if (!token) throw new Error("No hay token, usuario no autenticado");

      await axios.post("http://localhost:8000/api/carrito/encuesta/", datos, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMostrarNotificacion(true);
    } catch (error) {
      console.error("Error al enviar la encuesta:", error.response?.data || error);
      setMostrarAlerta(true);
    }
  };

  const manejarSiguiente = () => {
    if (!validarFormulario()) {
      setMostrarAlerta(true);
      return;
    }
    enviarDatos();
  };

  return (
    <>
      <h2 className="CalificaTitulo">Califica tu experiencia</h2>
      <section className="recuadro-experiencia">
        {preguntas.map((pregunta) => (
          <div className="recuadro-pregunta" key={pregunta.id}>
            <div className="titulo-pregunta">{pregunta.titulo}</div>
            <div className="emoji-opciones">
              {opciones.map((opcion, i) => (
                <img
                  key={i}
                  src={opcion.src}
                  alt={opcion.alt}
                  onClick={() => handleChange("emoji", pregunta.id, i)}
                  className={seleccionadas[pregunta.id] === i ? "emoji seleccionado" : "emoji"}
                />
              ))}
            </div>
            <p className="texto-pregunta">{pregunta.texto}</p>
            <input
              type="text"
              className="input-respuesta"
              placeholder="Escribe tu respuesta aquí"
              value={respuestasTexto[pregunta.id] || ""}
              onChange={(e) => handleChange("texto", pregunta.id, e.target.value)}
            />
          </div>
        ))}

        <div className="recuadro-pregunta">
          <h4 className="titulo-pregunta">¿Qué tan probable es que recomiendes nuestro servicio?</h4>
          <div className="recuadro-calificacion">
            {Array.from({ length: 11 }, (_, num) => (
              <div
                key={num}
                className={`numero-calificacion ${valorSeleccionado === num ? "seleccionado" : ""}`}
                onClick={() => handleChange("recomendacion", null, num)}
              >
                {num}
              </div>
            ))}
          </div>
          <p className="texto-pregunta">Indica tu respuesta en una escala de 0 a 10...</p>
          <textarea
            className="input-respuesta"
            placeholder="¿Por qué?"
            value={respuestaRecomendacion}
            onChange={(e) => setRespuestaRecomendacion(e.target.value)}
          />
        </div>
      </section>

      <div className="contenedor-boton-final">
        <button className="boton-siguiente" onClick={manejarSiguiente}>Enviar</button>
      </div>

      {mostrarAlerta && (
        <Alerta
          mensaje="Por favor completa todas las preguntas antes de enviar."
          onClose={() => setMostrarAlerta(false)}
        />
      )}

      {mostrarNotificacion && (
        <Notificacion
          mensaje="¡Gracias por tu respuesta! Tu opinión es muy valiosa para nosotros."
          onClose={() => {
            setMostrarNotificacion(false);
            navigate("/home");
          }}
        />
      )}
    </>
  );
}
