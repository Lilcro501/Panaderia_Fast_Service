import React from 'react';
import '../assets/styles/TextoCircular.css';
import panaderia from '../assets/images/OrquideaMecatos.jpg';

export default function TextoCircular() {
  return (
    <div className="contenedorCircular">
      <div className="svgCircular">
        <svg viewBox="0 0 200 200">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100
                  m -75, 0
                  a 75,75 0 1,1 150,0
                  a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text>
            <textPath href="#circlePath" startOffset="0">
              La Orquídea • La Orquídea • La Orquídea • 
            </textPath>
          </text>
        </svg>
      </div>

      <div className="imagenCentral">
        <img src={panaderia} alt="Panadería La Orquídea" />
      </div>
    </div>
  );
}
