import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

/* ~~~~~~~ Componente de ventana emergente ~~~~~~~ */
import VentanaConfirmacion from '../../components/VentanaConfirmacion';

export default function IngresarCodigo() {
    const [mostrarVentana, setMostrarVentana] = useState(false);
    const navigate = useNavigate();

    const salir = () => window.location.href = '/';

    const confirmarCodigo = () => setMostrarVentana(true);

    return (
    <section className='Contenedor'>
        <button className='Salir' onClick={salir}><IoMdClose /></button>
        <h1 className='TituloAcceso'>Ingresa el código</h1>
        <p>Por favor, ingresa el código de verificación que enviamos a tu correo</p>

        <div className="CampoNumero">
        <input type='number' id='numero' />
        <input type='number' id='numero' />
        <input type='number' id='numero' />
        <input type='number' id='numero' />
        </div>

        <button className='Continuar' onClick={confirmarCodigo}>Confirmar código</button>

        {mostrarVentana && (
        <VentanaConfirmacion 
            mensaje="Su contraseña ha sido cambiada correctamente"
            onClose={() => setMostrarVentana(false)}
            onExit={() => navigate('/')}
        />
        )}
    </section>
    );
}

