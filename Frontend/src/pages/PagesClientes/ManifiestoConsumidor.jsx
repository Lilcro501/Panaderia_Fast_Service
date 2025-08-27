import React, { useState } from 'react';
import '../../assets/styles/Legalidades.css';
import Book from '../../assets/images/Book.png';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ManifiestoConsumidor() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        Nombres: "",
        telefono: "",
        tipo_documento: "",
        numero_documento: "",
        email: "",
        direccion: "",
        descripcion: "",
        solucion: "",
        comprobante: null,
        aceptar: false
    });

    const [notificacion, setNotificacion] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => {
            setNotificacion({ visible: false, mensaje: "", tipo: "" });
        }, 2000);
    };

    const handleChange = (e) => {
        const { id, value, type, checked, files } = e.target;
        if (type === "file") {
            setForm({ ...form, [id]: files[0] });
        } else if (type === "checkbox") {
            setForm({ ...form, [id]: checked });
        } else {
            setForm({ ...form, [id]: value });
        }
    };

    const handleSubmit = async () => {
        if (!form.aceptar) {
            mostrarNotificacion("⚠️ Debes aceptar la declaración antes de enviar.", "error");
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            await axios.post("http://127.0.0.1:8000/api/usuarios/enviar-manifiesto/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            mostrarNotificacion("✅ Manifiesto enviado con éxito", "exito");

            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (error) {
            console.error("Error al enviar manifiesto:", error);
            mostrarNotificacion("❌ Hubo un error al enviar el manifiesto", "error");
        }
    };

    return (
        <section className='ContenedorInfoM'>
            <h1 className='Manifiesto'>Manifiesto del consumidor reclamante</h1>
            <br/>

            <div className='ContenedorInput'>
                <span className='NombresCompletos'>
                    <label htmlFor='Nombres'>Nombres y apellidos</label>
                    <input type='text' id='Nombres' onChange={handleChange} />

                    <label htmlFor='telefono'>Teléfono</label>
                    <input type='number' id='telefono' onChange={handleChange} />
                </span>
            </div>
            <br/>

            <div className='ContenedorInput'>
                <label htmlFor='tipo_documento'>Tipo de documento</label>
                <select id='tipo_documento' onChange={handleChange}>
                    <option value=''> </option>
                    <option value='CC'>Cédula de ciudadanía</option>
                    <option value='TI'>Tarjeta de identidad</option>
                </select>

                <label htmlFor='numero_documento'>N.documento:</label>
                <input type='number' id='numero_documento' onChange={handleChange} />
            </div>
            <br/>

            <div className='ContenedorInput'>
                <label htmlFor='email'>Correo:</label>
                <input type='email' id='email' onChange={handleChange} />

                <label htmlFor='direccion'>Dirección:</label>
                <input type='text' id='direccion' onChange={handleChange} />
            </div>
            <br/><br/>

            <div className='ContenedorInputt'>
                <label htmlFor='descripcion'>Descripción del problema:</label>
                <textarea id='descripcion' onChange={handleChange} />
            </div>
            <br/>

            <div className='ContenedorInputt'>
                <label htmlFor='solucion'>Solución esperada:</label>
                <textarea id='solucion' onChange={handleChange} />
            </div>
            <br/>

            <div className='ContenedorInput'>
                <label htmlFor='comprobante'>Comprobante de pago:</label>
                <input type='file' id='comprobante' onChange={handleChange} />
            </div>
            <br/>

            <div className='Opciones'>
                <label>
                    <input type='checkbox' id='aceptar' onChange={handleChange} />
                    Declaro ser el titular del contenido del presente formulario,
                    manifestando bajo declaración jurada los hechos descritos en él.
                </label>
            </div>

            <div className='ContenedorBoton'>
                <button className='Enviar' onClick={handleSubmit}>Enviar</button>
            </div>

            {notificacion.visible && (
                <div className={`modal-fondo modal-${notificacion.tipo}`}>
                    <div className="modal-contenido">
                        <p>{notificacion.mensaje}</p>
                    </div>
                </div>
            )}
        </section>
    )
}
