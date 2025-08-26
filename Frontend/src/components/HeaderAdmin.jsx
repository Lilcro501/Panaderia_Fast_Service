import React from 'react';
//importar las rutas 
import { Link } from 'react-router-dom';
import '../assets/styles/HeaderAdmin.css';  
import logo from '../assets/images/logo_header.png';
import PerfilLogo from '../assets/icons/logo.png';
import { FaUser } from "react-icons/fa";
import BotonCerrarSesion from './BotonCerrarSesion';

const HeaderAdmin = () => {
    return (
        <header className="header shapedividers_com-5996">
            
            <div className="contenido-header">
                {/* lOGO */}
                <Link to='/PrincipalAdmin' className='container'>
                    <img src={logo} alt="logo-panaderia"  className="estilologo"/>
                </Link>

                <Link to="/" className="link-comunicacion">Comunicación</Link>



                <BotonCerrarSesion />
            </div>

      
        </header>
    );2
};

export default HeaderAdmin;
