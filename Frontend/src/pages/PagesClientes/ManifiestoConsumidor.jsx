
import React from 'react';
import '../../assets/styles/Legalidades.css';
import Book from '../../assets/images/Book.png'

import { useNavigate } from 'react-router-dom';

export default function ManifiestoConsumidor() {
    const navegate = useNavigate();

    return (
        <section className='ContenedorInfoM'>
            <h1 className='Titulo'>Manifiesto del consumidor reclamante</h1>
            <br/>

            <div className='ContenedorInput'>
                <label htmlFor='Nombres'>Nombres y apellidos</label>
                <input type='text' id='Nombres'/>

                <label htmlFor='Telefono'>Teléfono</label>
                <input type='number' id='Telefono'/>
            </div>
            <br/>
            
            <div className='ContenedorInput'>
                <label htmlFor='documento'>Tipo de documento</label>
                <select> 
                    <option value='vacio'> </option>
                    <option value='CC'>Cédula de ciudadanía</option>
                    <option value='TI'>Tarjeta de identidad</option>
                </select>

                <label htmlFor='ndocumento'>N.documento:</label>
                <input type='number' id='ndocumento'/>
            </div>
            <br/>

            <div className='ContenedorInput'>
                <label htmlFor='email'>Correo:</label>
                <input type='email' id='email'/>

                <label htmlFor='direccion'>Dirección:</label>
                <input type='text' id='direccion'/>
            </div>
            <br/><br/>

            <div className='ContenedorInputt'>
                <label htmlFor='descripcion'>Descripción del problema:</label>
                <textarea name='descripcion' id='descripcion'/>
            </div>
            <br/>

            <div className='ContenedorInputt'>
                <label htmlFor='solucion'>Solución esperada:</label>
                <textarea name='solucion' id='solucion'/>
            </div>
            <br/>

            <div className='ContenedorInput'>
                <label htmlFor='comprobante'>Comprobante de pago:</label>
                <input type='file' id='comprobante'/>
            </div>
            <br/>

            <div className='Opciones'>
                <label>
                    <input type='checkbox' id='check'/>Declaro ser el titular del contenido del presente formulario, 
                    manifestando bajo declaración jurada los hechos descritos en él.
                </label>
            </div>

            <div className='ContenedorBoton'>
            <button className='Enviar' onClick={() => navegate('/')}>Enviar</button>
            </div>
        </section>
    )
}
