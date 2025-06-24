
import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/styles/InfoLegal.css';

// Imágenes importadas
import TYC from '../../assets/images/TYC.jpeg';
import Ciberseguridad from '../../assets/images/Ciberseguridad.jpg';
import CookiesLogo from '../../assets/images/CookiesLogo.jpeg';

// Icono de información
import { BsInfoCircleFill } from "react-icons/bs";

export default function InfoLegal() {
    return (
        <section className='ContenedorLegal'>
            <BsInfoCircleFill className='InfoIcon' />
            <h1 className='Legalidades'>Legalidades</h1>

            <div className='ContenedorImagenes'>
                <div className="ContenedorImagen">
                    <div className="ImagenContenedor">
                        <img className='ImagenLegal' src={TYC} alt='Términos y condiciones' />
                        <Link to='/TYC'>
                            <button className='BotonLegal'>Ver términos y condiciones</button>
                        </Link>
                    </div>
                </div>

                <div className="ContenedorImagen">
                    <div className="ImagenContenedor">
                        <img className='ImagenLegal' src={Ciberseguridad} alt='Ciberseguridad' />
                        <Link to='/PoliticaPrivacidad'>
                            <button className='BotonLegal'>Ver políticas de privacidad</button>
                        </Link>
                    </div>
                </div>

                <div className="ContenedorImagen">
                    <div className="ImagenContenedor">
                        <img className='ImagenLegal' src={CookiesLogo} alt='Cookies' />
                        <Link to='/PoliticaCookies'>
                        <button className='BotonLegal'>Ver política de cookies</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
