import React, { useState } from "react";
import { useRol } from "../Context/RolContext";
import ModalAviso from "./ModalAviso";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/Categorias.css";
import Bebidas from "../assets/icons/bebidas.png";
import Helados from "../assets/icons/helados.png";
import Mecato from "../assets/icons/mecato.png";
import Fritos from "../assets/icons/pollo.png";
import Pan from "../assets/icons/pan.png";


export default function Categorias() {
  const { rol } = useRol();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [linkDestino, setLinkDestino] = useState("");
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMostrarMenu(!mostrarMenu);

  const handleClick = (e, destino) => {
    if (!rol || rol === "sin-registrar") {
      e.preventDefault(); // evita recargar la página
      setLinkDestino(destino);
      setMostrarModal(true);
    } else {
      navigate(destino);
    }
  };

  return (
    <section className="categorias">
      <button className="hamburguesa" onClick={toggleMenu}>
        ☰ Categorías
      </button>

      <div className={`recuadro-categoria ${mostrarMenu ? "mostrar" : ""}`}>
        <div className="animacion-categoria">
          <Link
            to="/categorias/CategoriaPanes"
            className="categoria"
            onClick={(e) => handleClick(e, "/categorias/CategoriaPanes")}
          >
            <img src={Pan} alt="Panes" width="60" />
            <h5 className="nom-categoria">Panes</h5>
          </Link>
        </div>

        <div className="animacion-categoria">
          <Link
            to="/categorias/CategoriasFritos"
            className="categoria"
            onClick={(e) => handleClick(e, "/categorias/CategoriasFritos")}
          >
            <img src={Fritos} alt="Fritos" width="60" />
            <h5 className="nom-categoria">Fritos</h5>
          </Link>
        </div>

        <div className="animacion-categoria">
          <Link
            to="/categorias/CategoriasMecato"
            className="categoria"
            onClick={(e) => handleClick(e, "/categorias/CategoriasMecato")}
          >
            <img src={Mecato} alt="Mecato" width="60" />
            <h5 className="nom-categoria">Mecato</h5>
          </Link>
        </div>

        <div className="animacion-categoria">
          <Link
            to="/categorias/CategoriasBebidas"
            className="categoria"
            onClick={(e) => handleClick(e, "/categorias/CategoriasBebidas")}
          >
            <img src={Bebidas} alt="Bebidas" width="60" />
            <h5 className="nom-categoria">Bebidas</h5>
          </Link>
        </div>

        <div className="animacion-categoria">
          <Link
            to="/categorias/CategoriasHelados"
            className="categoria"
            onClick={(e) => handleClick(e, "/categorias/CategoriasHelados")}
          >
            <img src={Helados} alt="Helados" width="62" />
            <h5 className="nom-categoria">Helados</h5>
          </Link>
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
