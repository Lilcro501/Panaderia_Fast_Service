
import React from 'react';

import '../../assets/styles/HomeSinRegistrar.css'; /* ~~~~~~ Estilo del carrusel ~~~~~~ */
import mostrador from "../../assets/icons/mostrador.jpg"; /* ~~~~~~ Imagen del mostrador ~~~~~~ */
import Categorias from "../../components/Categorias"; /* ~~~~~~ Componente de menú con categorías ~~~~~~ */
import Carrusel1 from "../../components/CarruselIncremento"; /* ~~~~~~ Componente del carrusel con botones ~~~~~~ */
import Carrusel2 from "../../components/CarruselCalificacion"; /* ~~~~~~ Componente darrusel con calificaciones ~~~~~~ */ 
import { Link } from "react-router-dom";

//importacion de iconos de react
import { AiFillSun } from "react-icons/ai";

/* ~~~~~~ Función del Index sin registrar ~~~~~~ */
export default function HomeSinRegistrar() {
  return (
    <main>
      <h1 className="texto-animado">
        <AiFillSun size={35} color="rgba(253, 196, 81, 1)" />
          &nbsp;
          Tu día empieza mejor con nuestro pan
          &nbsp;
        <AiFillSun size={35} color="rgba(253, 196, 81, 1)" />
      </h1>
      
      {/* Carrusel Catálogo */}
      <Categorias/>
      <Carrusel1/>
      
      <br/> <br/>

      <article className ="recuadro-informacion">
          <div className ="nosotros">
              <center> <h2 className ="sobre"> Sobre nosostros</h2>
                <p className ="objetivo"> Queremos ser tu panadería favorita, por lo que cada día nuestro equipo de panaderos trabajan con pasión, 
                  cariño y dedicación para ofrecerte productos que te deleiten y te hagan sentir como en casa. 
                  Conoce más sobre nosotros haciendo <Link className="sobre" to="/conocenos">click aquí</Link>
                </p>
              </center>
            </div>
          </article>
      <br/> <br/>
      <br/> <br/>
      <h2 className="titulo-productos" >Productos destacados</h2>
      <Carrusel2/>
      <br/> <br/>

      <section className ="frase-logo">
        <div className ="texto-slogan">
          <h3> 
            Más que <br/>
            una panadería, somos un <br/>
            lugar donde los aromas <br/>
            y sabores se unen para <br/>
            crear experiencias <br/> 
            inolvidables. 
          </h3>
        </div>

        <div className ="home-mostrador">
          <img className ="imagen-mostrador" src={mostrador} alt="Imagen panes mostrador" width="480px" />
        </div>
      </section>

    </main>
  );
}
