/* ~~~~~~~ Importar React para usar JSX ~~~~~~~ */
import React from 'react';

/* ~~~~~~~ Hoja de estilos del componente ~~~~~~~ */
import '../assets/styles/Acceso.css';

/* ~~~~~~~ Redirección ~~~~~~~ */
import { useNavigate } from 'react-router-dom';

/* ~~~~~~~ Icono de cierre (X) ~~~~~~~ */
import { IoMdClose } from 'react-icons/io';

/* ~~~~~~~ Componente funcional VentanaConfirmacion ~~~~~~~ */
export default function VentanaConfirmacion({ mensaje, onClose, onExit }) {
    /* ~~~~~~~ Hook para cambiar de ruta sin recargar la página ~~~~~~~ */
    const navigate = useNavigate();
    
    return (
    <div className="fondo-confirmacion">
        <div className="ventana-confirmacion">

        {/* ~~~~~~~ Botón de cerrar ventana que redirige al inicio ~~~~~~~ */}
        <button className="salirboton" onClick={() => navigate ('/')}>
            <IoMdClose />
        </button>

        {/* ~~~~~~~ Mensaje de confirmación recibido como prop ~~~~~~~ */}
        <h2 className="titulo-confirmacion">{mensaje}</h2>

        {/* ~~~~~~~ Botón para salir y redirigir al inicio ~~~~~~~ */}
        <button className="boton-salir" onClick={() => navigate('/')}>Salir</button>
        </div>
    </div>
    );
}
