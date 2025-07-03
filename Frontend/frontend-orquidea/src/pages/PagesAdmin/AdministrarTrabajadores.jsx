import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//~~~~~~~~~~~~~~ Estilo ~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import TablaAdmin from '../../components/TablaAdmin';
//~~~~~~~~~~~~~~ Imagenes ~~~~~~~~~~~~~~
import agregar_documento  from '../../assets/images/agregar_documento.png'
import editar_documento from '../../assets/images/editar_documento.png'
import eliminar_documento from '../../assets/images/eliminar_documento.png'
//~~~~~~~~~~~~~~ Estilo Global~~~~~~~~~~~~~~
import "../../assets/styles/Global.css"

export default function AdministrarTrabajadores() {
    const encabezados = ['Cédula', 'Nombre completo', 'Cargo'];
    
    const filas = Array.from({ length: 5 }, (_, i) => [
        `${i + 123456789}`,
        `Daniela Sanchez`,
        `Panader@,Pincero,A-Cliente`,
    ]);

    return (
        <>
            {/* Tabla de inventario */}
            <div>
                <TablaAdmin encabezados={encabezados} filas={filas} />
                <br />
            </div>

            {/* Iconos parte baja */}
                <div className='iconos_acciones'>

                    <Link to='/AgregarTrabajador'>
                        <img src={agregar_documento} alt="Agregar" />
                    </Link>

                    <Link to='/EditarTrabajador'>
                        <img src={editar_documento} alt="Editar" />
                    </Link>

                    <Link to='/EliminarTrabajador'>
                        <img src={eliminar_documento} alt="Eliminar" />
                    </Link>
                </div>
        </>
    );
}


