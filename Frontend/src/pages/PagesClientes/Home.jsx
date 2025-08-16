
import React from 'react';
//estilos css

import '../../assets/styles/Home.css'; 
import "../../assets/styles/Global.css"

// importaciones de imagenes

import mostrador from "../../assets/icons/mostrador.jpg"
import Categorias from "../../components/Categorias"

//importacion de componentes
/* ~~~~~~ Componente de carrusel con botones de incremento ~~~~~~ */ 
import Carrusel1 from "../../components/CarruselIncremento"
/* ~~~~~~ Componente de imagen con texto circular rotatorio ~~~~~~ */ 
import TextoCircular from '../../components/TextoCircular'; 

//importacion de iconos de react
import { AiFillSun } from "react-icons/ai";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <div className="contenedor-titulo">
            <h1 className="texto-animado">
              <AiFillSun size={35} color="rgba(253, 196, 81, 1)" />
                &nbsp;
                Tu día empieza mejor con nuestro pan
                &nbsp;
              <AiFillSun size={35} color="rgba(253, 196, 81, 1)" />
            </h1>
    </div>
      <br /> <br />
      <h2 className='subtitulo-productos'>Categorias</h2>
      <Categorias></Categorias>
        <br />
        <h2 className='subtitulo-productos'>Nuestros productos</h2>
        <br />
      <Carrusel1></Carrusel1>
      
      <br />
      <br />

      <article className="recuadro-informacion">
        <div className="nosotros">
          <div className="texto-nosotros">
            <h2 className="sobre">Sobre nosotros</h2>
            <p className="objetivo">
              Queremos ser tu panadería favorita, por lo que cada día nuestro equipo de panaderos trabajan con pasión, 
              cariño y dedicación para ofrecerte productos que te deleiten y te hagan sentir como en casa. 
              Conoce más sobre nosotros haciendo <Link className="Sobre" to="/conocenos">Click aquí</Link>.
            </p>
          </div>
          <TextoCircular />
        </div>
      </article>
      <br />
      <br />

        <h2 className='subtitulo-productos'>Productos destacados</h2>
      <br />
      <br />

      <section className ="frase-logo">
        <div className ="home-mostrador">
          <img className ="imagen-mostrador" src={mostrador} alt="Imagen panes mostrador" width="480px" />
        </div>
        
        <div className="texto-slogan texto-animado">
          <h3 className='Slogan'> 
            Donde cada aroma y sabor se transforma en una experiencia.  
          </h3>
        </div>
      </section>

    </main>
  );
}


