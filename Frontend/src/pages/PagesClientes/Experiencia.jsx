import React from 'react';
import './s.css';

function Encuesta() {
    return (
    <div className="contenedor">
        <h1>Califícanos y cuéntanos tu experiencia en los siguientes recuadros</h1>
        <p className="questions"><strong>Percepción general de la experiencia</strong></p>
        <div className="bloque_1">
            <div className="bloque">
                <div className="emojis">
                    <img src="carita_1.png" alt="carita 1" width="70px" />
                    <img src="carita_2.png" alt="carita 2" width="55px" />
                    <img src="carita_3.png" alt="carita 3" width="63px" />
                    <img src="carita_4.png" alt="carita 4" width="50px" />
                </div>
                <p className="preguntas">¿Cuéntanos cómo te fue?</p>
            </div>
        </div>
        <p className="questions"><strong>Amabilidad y atención</strong></p>
        <div className="bloque_1">
            <div className="bloque">
                <div className="emojis">
                    <img src="carita_1.png" alt="carita 1" width="70px" />
                        <img src="carita_2.png" alt="carita 2" width="55px" />
                        <img src="carita_3.png" alt="carita 3" width="63px" />
                        <img src="carita_4.png" alt="carita 4" width="50px" />
                    </div>
                    <p className="preguntas">¿Te atendimos con amabilidad y cortesía?</p>
                </div>
            </div>
            <p className="questions"><strong>Calidad del producto</strong></p>
            <div className="bloque_1">
                <div className="bloque">
                    <div className="emojis">
                        <img src="carita_1.png" alt="carita 1" width="70px" />
                        <img src="carita_2.png" alt="carita 2" width="55px" />
                        <img src="carita_3.png" alt="carita 3" width="63px" />
                        <img src="carita_4.png" alt="carita 4" width="50px" />
                    </div>
                    <p className="preguntas">¿Qué producto consumiste?<br />
                        Apariencia, sabor, tamaño</p>
                </div>
            </div>
            <p className="questions"><strong>Agilidad en tu pedido</strong></p>
            <div className="bloque_1">
                <div className="bloque">
                    <div className="emojis">
                        <img src="carita_1.png" alt="carita 1" width="70px" />
                        <img src="carita_2.png" alt="carita 2" width="55px" />
                        <img src="carita_3.png" alt="carita 3" width="63px" />
                        <img src="carita_4.png" alt="carita 4" width="50px" />
                    </div>
                    <p className="preguntas">¿En cuánto tiempo recibiste el pedido?<br />
                    ¿Te pareció adecuado el tiempo?</p>
                </div>
            </div>
            <br /><br />
            <button>Siguiente</button>
    </div>
    )
}
