import React, { useEffect } from 'react';

import '../../assets/styles/HomeSinRegistrar.css'; /* ~~~~~~ Estilo del carrusel ~~~~~~ */
import mostrador from "../../assets/icons/mostrador.jpg"; /* ~~~~~~ Imagen del mostrador ~~~~~~ */
import Categorias from "../../components/Categorias"; /* ~~~~~~ Componente de menú con categorías ~~~~~~ */
import Carrusel1 from "../../components/CarruselIncremento"; /* ~~~~~~ Componente del carrusel con botones ~~~~~~ */
import Carrusel2 from "../../components/CarruselCalificacion"; /* ~~~~~~ Componente carrusel con calificaciones ~~~~~~ */ 
import CookiesControlador from '../../components/CooControlador'; /* ~~~~~~ Componente de cookies inicial ~~~~~~ */ 
import TextoCircular from '../../components/TextoCircular'; /* ~~~~~~ Componente de imagen con texto circular rotatorio ~~~~~~ */ 
import { Link } from "react-router-dom";
import { AiFillSun } from "react-icons/ai";

export default function HomeSinRegistrar() {
  const { cambiarRol } = useRol();

  useEffect(() => {
    cambiarRol("sin-registrar"); // asignamos el rol al cargar
  }, [cambiarRol]);

  return (
    <main>
      <CookiesControlador/>
      <h1 className="texto-animado">
        <AiFillSun size={35} color="rgba(253, 196, 81, 1)" />
          &nbsp;
          Tu día empieza mejor con nuestro pan
          &nbsp;
        <AiFillSun size={35} color="rgba(253, 196, 81, 1)" />
      </h1>
      
      <div className='ContenidoAplicacion'>
        <Categorias/>
        <h2 className="titulo-productos">Nuestros productos</h2>
        <Carrusel1/>

        <br/> <br/>

        <article className="recuadro-informacion">
          <div className="nosotros">
            <div className="texto-nosotros">
              <h2 className="sobre">Sobre nosotros</h2>
              <p className="objetivo">
                Queremos ser tu panadería favorita, por lo que cada día nuestro equipo de panaderos trabajan con pasión, 
                cariño y dedicación para ofrecerte productos que te deleiten y te hagan sentir como en casa.
                <Link className="Sobre" to="/conocenos"> Conoce más sobre nosotros.</Link>
              </p>
            </div>
            <TextoCircular />
          </div>
        </article>

        <br/> <br/>
        <br/> <br/>
        <h2 className="titulo-productos" >Productos destacados</h2>
        <Carrusel2/>
        <br/> <br/>

        <section className="frase-logo">
          <div className="home-mostrador">
            <img className="imagen-mostrador" src={mostrador} alt="Imagen panes mostrador" width="480px" />
          </div>
          
          <div className="texto-slogan texto-animado">
            <h3 className='Slogan'> 
              Donde cada aroma y sabor se transforma en una experiencia.  
            </h3>
          </div>
        </section>
      </div>
    </main>
  );
}
