import React, { useEffect } from 'react';

import '../../assets/styles/HomeSinRegistrar.css';
import mostrador from "../../assets/icons/mostrador.jpg";
import Categorias from "../../components/Categorias";
import Carrusel1 from "../../components/CarruselIncremento";
import Carrusel2 from "../../components/CarruselCalificacion";
import CookiesControlador from '../../components/CooControlador';
import TextoCircular from '../../components/TextoCircular';
import { useRol } from '../../Context/RolContext';

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
                Conoce más sobre nosotros haciendo <Link className="Sobre" to="/conocenos">Click aquí</Link>.
              </p>
            </div>
            <TextoCircular />
          </div>
        </article>

        <br/> <br/>
        <br/> <br/>
        <h2 className="titulo-productos">Productos destacados</h2>
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
