import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import TablaAdmin from '../../components/TablaAdmin';
//~~~~~~~~~~~~~~ Imagenes ~~~~~~~~~~~~~~
import agregar_documento  from '../../assets/images/agregar_documento.png'
import editar_documento from '../../assets/images/editar_documento.png'
//~~~~~~~~~~~~~~ Estilo Global~~~~~~~~~~~~~~
import "../../assets/styles/Global.css"

export default function Cronograma() {
    const encabezados = ['Cédula', 'Nombre trabajador', 'Cargo', 'Actividades', 'Horarios','Fecha'];
    
    const filas = Array.from({ length: 5 }, (_, i) => [
        `${i + 123456789}`,
        `Daniela Sanchez`,
        `Panader@,Pincero,A-Cliente`,
        `barrer,trapear,hacer pan`,
        `6:00Am-12:00 Pm, 12:00Pm-6:00Pm`,
        `--`
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
                    <Link to='/AgregarCrono'>
                        <img src={agregar_documento} alt="Agregar" />
                    </Link>

                    <Link to='/EditarCrono'>
                        <img src={editar_documento} alt="Editar" />
                    </Link>
                </div>
        </>
    );
}


