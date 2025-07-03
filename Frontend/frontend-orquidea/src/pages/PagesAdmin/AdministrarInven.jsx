import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//~~~~~~~~~~~~~~ Estilo ~~~~~~~~~~~~~~
import '../../assets/styles/AdministrarInven.css'; 
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import CategoriasAdmin from "../../components/CategoriasAdmin"
import TablaAdmin from '../../components/TablaAdmin';
//~~~~~~~~~~~~~~ Imagenes ~~~~~~~~~~~~~~
import agregar_documento  from '../../assets/images/agregar_documento.png'
import editar_documento from '../../assets/images/editar_documento.png'
import eliminar_documento from '../../assets/images/eliminar_documento.png'
//~~~~~~~~~~~~~~ Estilo Global~~~~~~~~~~~~~~
import "../../assets/styles/Global.css"

export default function AdministrarInven() {
    const encabezados = ['Código producto', 'Nombre producto', 'Precio', 'Descripción', 'Stock'];
    
    const filas = Array.from({ length: 11 }, (_, i) => [
        `P00${i + 1}`,
        `Producto ${i + 1}`,
        `$${(Math.random() * 10000).toFixed(0)}`,
        'Descripción breve',
        Math.floor(Math.random() * 100),
    ]);

    return (
        <>
            {/* Categorias */}
            <CategoriasAdmin></CategoriasAdmin>
            <br />
            <br />

            {/* Tabla de inventario */}
            <div className='admintabla'>
                <TablaAdmin encabezados={encabezados} filas={filas} />
                <br />
            </div>

            {/* Iconos parte baja */}
                <div className='iconos_acciones'>
                    <Link to='/AgregarInven'>
                        <img src={agregar_documento} alt="Agregar" />
                    </Link>
                    <Link to='/EditarInven'>
                        <img src={editar_documento} alt="Editar" />
                    </Link>
                    <Link to='/EliminarInven'>
                        <img src={eliminar_documento} alt="Eliminar" />
                    </Link>
                </div>
        </>
    );
}


