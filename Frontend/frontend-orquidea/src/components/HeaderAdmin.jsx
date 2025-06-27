// src/components/Header.jsx
import React from 'react';
//importar las rutas 
import { Link } from 'react-router-dom';
import '../assets/styles/HeaderAdmin.css';  
import logo from '../assets/images/logo_header.png';



const HeaderAdmin = () => {
    return (
        <header className="header shapedividers_com-5996">
            <div className="contenido-header">

                {/* lOGO */}
                <div className="logocontainer">
                    <img src={logo} alt="logo-panaderia"  className="estilologo"/>
                </div>
            </div>

                {/*barra de navegacion administrador*/}
            <div className="barra-admin">
                <div className="dropdown">
                    <button>Gestión de inventario</button>
                    <div className="dropdown-options">
                        <a href="#">Administrar Inventario</a>
                        <a href="#">Cátalogo</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button>Gestión de trabajadores</button>
                    <div className="dropdown-options">
                        <a href="#">Administrar Trabajadores</a>
                        <a href="#">Cronograma y actividades</a>
                    </div>
                </div>

                <div className="dropdown">
                    <button>Gestión de cliente </button>
                    <div className="dropdown-options">
                        <a href="#">Historial pedidos</a>
                        <a href="#">Comunicación</a>
                    </div>
                </div>
            </div>        
        </header>
    );
};

export default HeaderAdmin;
