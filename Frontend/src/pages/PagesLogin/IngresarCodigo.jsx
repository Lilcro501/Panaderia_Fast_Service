
/* ~~~~~~~ Importación de React y UseState para manejar estados ~~~~~~~ */
import React, { useState } from 'react';

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

/* ~~~~~~~ Importación de UseNavigate para las redirecciones ~~~~~~~ */
import { useNavigate } from 'react-router-dom';

/* ~~~~~~~ importación de ícono de salir X ~~~~~~~ */
import { IoMdClose } from 'react-icons/io';

export default function IngresarCodigo() {
    const [codigo, setCodigo] = useState(['', '', '', '']);
    const [tocado, setTocado] = useState(false);
    const navigate = useNavigate();

    const salir = () => window.location.href = '/';

    const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
        const nuevo = [...codigo];
        nuevo[index] = value;
        setCodigo(nuevo);
    }
    };

    const esCodigoValido = codigo.every(d => d !== '');

    const confirmarCodigo = () => {
    setTocado(true);
    
    if (!esCodigoValido) return;
    navigate('/CambioContraseña');
    };

    return (
    <section className='Contenedor'>
        <button className='Salir' onClick={salir}><IoMdClose /></button>
        <h1 className='TituloAcceso'>Ingresa el código</h1>
        <p>Ingresa el código enviado a tu correo electrónico</p>

        <div className="CampoNumero">
            {codigo.map((valor, i) => (
                <input key={i} type="text" id={`num-${i}`} value={valor}
                onChange={e => handleChange(i, e.target.value)} maxLength="1"/>
            ))}
        </div>

        {!esCodigoValido && tocado && (
            <div className="invalid">Completa los 4 dígitos <br/><br/></div>
        )}

        <button className='Continuar' onClick={confirmarCodigo}>Confirmar código</button>
    </section>
    );
}
