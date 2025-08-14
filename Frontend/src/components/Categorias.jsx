import React, { useState } from "react";
import { useRol } from "../Context/RolContext";
import ModalAviso from "./ModalAviso";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Categorias.css";
import Bebidas from "../assets/icons/bebidas.png";
import Helados from "../assets/icons/helados.png";
import Mecato from "../assets/icons/mecato.png";
import Fritos from "../assets/icons/pollo.png";
import Pan from  "../assets/icons/pan.png";

export default function Categorias() {
  const { rol } = useRol();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [linkDestino, setLinkDestino] = useState("");
  const navigate = useNavigate();

  const handleClick = (e, destino) => {
    if (!rol || rol === "sin-registrar") {
      e.preventDefault(); // evita recargar la página
      setLinkDestino(destino);
      setMostrarModal(true);
    } else {
      navigate(destino); // navega normalmente si tiene rol
    }
  };

  return (
    <section className="categorias">
      <div className="recuadro-categoria">

        <div className="animacion-categoria">
          <a href="/categorias/CategoriaPanes" className="categoria"
             onClick={(e) => handleClick(e, "/categorias/CategoriaPanes")}>
            <img src={Pan} alt="Panes" width="60" />
            <h5 className="nom-categoria">Panes</h5>
          </a>
        </div>
        
        <div className="animacion-categoria">
          <a href="/categorias/CategoriasFritos" className="categoria"
             onClick={(e) => handleClick(e, "/categorias/CategoriasFritos")}>
            <img src={Fritos} alt="Fritos" width="60" />
            <h5 className="nom-categoria">Fritos</h5>
          </a>
        </div>

        <div className="animacion-categoria">
          <a href="/categorias/CategoriasMecato" className="categoria"
             onClick={(e) => handleClick(e, "/categorias/CategoriasMecato")}>
            <img src={Mecato} alt="Mecato" width="60" />
            <h5 className="nom-categoria">Mecato</h5>
          </a>
        </div>

        <div className="animacion-categoria">
          <a href="/categorias/CategoriasBebidas" className="categoria"
             onClick={(e) => handleClick(e, "/categorias/CategoriasBebidas")}>
            <img src={Bebidas} alt="Bebidas" width="60" />
            <h5 className="nom-categoria">Bebidas</h5>
          </a>
        </div>

        <div className="animacion-categoria">
          <a href="/categorias/CategoriasHelados" className="categoria"
             onClick={(e) => handleClick(e, "/categorias/CategoriasHelados")}>
            <img src={Helados} alt="Helados" width="62" />
            <h5 className="nom-categoria">Helados</h5>
          </a>
        </div>
      </div>

      {mostrarModal && (
        <ModalAviso
          mensaje="❗ Debes iniciar sesión para acceder a esta sección."
          onClose={() => setMostrarModal(false)}
          onConfirm={() => {
            setMostrarModal(false);
            navigate("/accedeaqui");
          }}
        />
      )}
    </section>
  );
}
