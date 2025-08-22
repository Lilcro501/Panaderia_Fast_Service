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
                <Link to='/PrincipalAdmin' className='container'>
                    <img src={logo} alt="logo-panaderia"  className="estilologo"/>
                </Link>
            </div>

                {/*barra de navegacion administrador*/}
            <div className="barra-admin">
                <div className="dropdown">
                    <button className='boton-admin'>Gestión de inventario</button>
                    <div className="dropdown-options">
                        <Link to="/AdministrarInven" className='links'>Administrar Inventario</Link>
                        <Link to="/CatalogoAdmin" className='links'>Cátalogo</Link>
                    </div>
                </div>

                <div className="dropdown">
                    <button className='boton-admin'>Gestión de trabajadores</button>
                    <div className="dropdown-options">
                        <Link to="/AdministrarTrabajadores" className='links'>Administrar Trabajadores</Link>
                        <Link to="/Cronograma" className='links'>Cronograma y actividades</Link>
                    </div>
                </div>

                <div className="dropdown">
                    <button className='boton-admin'>Gestión de cliente </button>
                    <div className="dropdown-options">
                        <Link to="/HistorialPedido" className='links'>Historial pedidos</Link>
                        <Link to="/" className='links'>Comunicación</Link>
                    </div>
                </div>
            </div>        
        </header>
    );
};

export default HeaderAdmin;
