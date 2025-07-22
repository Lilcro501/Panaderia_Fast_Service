import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../assets/styles/Experiencia.css";
import Alerta from "../../components/Alerta.jsx"; // Asegúrate que la ruta es correcta

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

export default function CalificarExperiencia() {
    const [seleccionadas, setSeleccionadas] = useState({});
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const navigate = useNavigate(); // Para redireccionar manualmente si todo está completo

    const manejarSeleccion = (pregunta, indice) => {
        setSeleccionadas({ ...seleccionadas, [pregunta]: indice });
    };

    const renderPreguntas = [
        {
            titulo: "Percepción general del servicio",
            texto: "¿Cómo fue tu experiencia?",
            id: "pregunta1"
        },
        {
            titulo: "Amabilidad y atención",
            texto: "¿Se te atendió con amabilidad y cortesía?",
            id: "pregunta2"
        },
        {
            titulo: "Calidad del producto",
            texto: "¿Qué producto consumiste más?",
            id: "pregunta3"
        },
        {
            titulo: "Agilidad en tu pedido",
            texto: "¿En cuánto tiempo recibiste el pedido? ¿Te pareció adecuado el tiempo?",
            id: "pregunta4"
        }
    ];

    const manejarSiguiente = () => {
        const todasRespondidas = renderPreguntas.every(p => seleccionadas[p.id] !== undefined);
        if (!todasRespondidas) {
            setMostrarAlerta(true); // Mostrar alerta si falta alguna pregunta
        } else {
            navigate("/Recomendacion"); // Redirige manualmente
        }
    };

    return (
        <>
            <section className="recuadro-experiencia">
                {renderPreguntas.map((pregunta, index) => (
                    <div className="recuadro-pregunta" key={index}>
                        <div className="titulo-pregunta">{pregunta.titulo}</div>
                        <div className="emoji-opciones">
                            {opciones.map((opcion, i) => (
                                <img
                                    key={i}
                                    src={opcion.src}
                                    alt={opcion.alt}
                                    onClick={() => manejarSeleccion(pregunta.id, i)}
                                    className={
                                        seleccionadas[pregunta.id] === i
                                            ? "emoji seleccionado"
                                            : "emoji"
                                    }
                                />
                            ))}
                        </div>
                        <p className="texto-pregunta">{pregunta.texto}</p>
                        <input type="text" className="input-respuesta" placeholder="Escribe tu respuesta aquí" />
                    </div>
                ))}
            </section>

            <div className="contenedor-boton-final">
                <button className="boton-siguiente" onClick={manejarSiguiente}>
                    Siguiente
                </button>
            </div>

            {mostrarAlerta && (
                <Alerta
                    mensaje="Por favor responde todas las preguntas antes de continuar."
                    onClose={() => setMostrarAlerta(false)}
                />
            )}
        </>
    );
}