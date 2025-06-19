import React, { useRef, useState } from 'react';
import '../assets/styles/Home.css'; // ajusta según tu proyecto
import pan from "../assets/icons/pan.png"
import mostrador from "../assets/icons/mostrador.jpg"
import Categorias from "../components/Categorias"
import Carrusel1 from "../components/CarruselIncremento"
import "../assets/styles/Global.css"
import Carrusel2 from "../components/CarruselCalificacion"



export default function Home() {
  return (
    <main>
      <h1 className="bienvenida" style={{textAlign: "center"}}>Tu día empieza mejor con nuestro pan</h1>

      {/* Carrusel Catálogo */}
      <Categorias></Categorias>
      <Carrusel1></Carrusel1>
      
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
      <Carrusel2></Carrusel2>
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


