import React, { useRef, useState } from 'react';
import '../assets/styles/HomeSinRegistrar.css'; /* ~~~~~~ Estilo del carrusel ~~~~~~ */
import mostrador from "../assets/icons/mostrador.jpg"; /* ~~~~~~ Imagen del mostrador ~~~~~~ */
import Categorias from "../components/Categorias"; /* ~~~~~~ Componente de menú con categorías ~~~~~~ */
import Carrusel1 from "../components/CarruselIncremento"; /* ~~~~~~ Componente del carrusel con botones ~~~~~~ */
import Carrusel2 from "../components/CarruselCalificacion"; /* ~~~~~~ Componente darrusel con calificaciones ~~~~~~ */ 


/* ~~~~~~ Función del Index sin registrar ~~~~~~ */
export default function HomeSinRegistrar() {
  return (
    <main>
      <h1 className="bienvenida" style={{textAlign: "center"}}>Tu día empieza mejor con nuestro pan</h1>
      
      {/* Carrusel Catálogo */}
      <Categorias/>
      <Carrusel1/>
      
      <br />
      <br />

      <article class="recuadro-informacion">
          <div class="nosotros">
              <center> <h2 class="sobre"> Sobre nosostros</h2>
                <p class="objetivo"> Queremos ser tu panadería favorita, por lo que cada día nuestro equipo de panaderos trabajan con pasión, 
                  cariño y dedicación para ofrecerte productos que te deleiten y te hagan sentir como en casa. 
                  Conoce más sobre nosotros haciendo <a class="sobre" href=""> click aquí </a>.
                </p>
              </center>
            </div>
          </article>
      <br />
      <br />

      <h2 className="titulo-productos" style={{textAlign: "center"}}>Productos destacados</h2>
      <br />
      <br />
      <Carrusel2/>
      <br />
      <br />

      <section class="frase-logo">
            <div class="texto-slogan">
                <h3> Más que 
                    <br/> una panadería, somos un
                        <br/> lugar donde los aromas 
                        <br/> y sabores se unen para 
                        <br/> crear experiencias  
                        <br/> inolvidables. 
                </h3>
            </div>

            <div class="home-mostrador">
                <img class="imagen-mostrador" src={mostrador} alt="Imagen panes mostrador" width="480px" />
            </div>
        </section>

    </main>
  );
}


