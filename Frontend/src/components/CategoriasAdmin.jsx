import React from "react";
import { Link } from 'react-router-dom';

import "../assets/styles/Categorias.css";
import Bebidas from "../assets/icons/bebidas.png";
import Helados from "../assets/icons/helados.png";
import Mecato from "../assets/icons/mecato.png";
import Fritos from "../assets/icons/pollo.png";
import Pan from "../assets/icons/pan.png";

export default function CategoriasAdmin() {
  return (
    <section className="categorias">
      <div className="recuadro-categoria">

        <div className="animacion">
          <Link to="?categoria=panes" className="categoria">
            <img src={Pan} alt="Panes" width="60" />
            <h5 className="nom-categoria">Panes</h5>
          </Link>
        </div>

        <div className="animacion">
          <Link to="?categoria=fritos" className="categoria">
            <img src={Fritos} alt="Fritos" width="60" />
            <h5 className="nom-categoria">Fritos</h5>
          </Link>
        </div>

        <div className="animacion">
          <Link to="?categoria=mecato" className="categoria">
            <img src={Mecato} alt="Mecato" width="60" />
            <h5 className="nom-categoria">Mecato</h5>
          </Link>
        </div>

        <div className="animacion">
          <Link to="?categoria=bebidas" className="categoria">
            <img src={Bebidas} alt="Bebidas" width="60" />
            <h5 className="nom-categoria">Bebidas</h5>
          </Link>
        </div>

        <div className="animacion">
          <Link to="?categoria=helados" className="categoria">
            <img src={Helados} alt="Helados" width="62" />
            <h5 className="nom-categoria">Helados</h5>
          </Link>
        </div>

      </div>
    </section>
  );
}
