
/* ~~~~~~~ Importación de React y UseState para manejar estados ~~~~~~~ */
import React, { useState } from 'react';

/* ~~~~~~~ Hoja de estilos ~~~~~~~ */
import '../../assets/styles/Acceso.css';

/* ~~~~~~~ importación de ícono de salir X ~~~~~~~ */
import { IoMdClose } from 'react-icons/io';

/* ~~~~~~~ Importación de íconos de candado ~~~~~~~ */
import { FaUnlockAlt, FaUserLock } from 'react-icons/fa';

/* ~~~~~~~ Importación de UseNavigate para las redirecciones ~~~~~~~ */
import { useNavigate } from 'react-router-dom';

/* ~~~~~~~ Importación de la ventana para la confirmación del cambio ~~~~~~~ */
import VentanaConfirmacion from '../../components/VentanaConfirmacion';

export default function CambioContraseña() {
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [mostrarVentana, setMostrarVentana] = useState(false);
    const navigate = useNavigate();

    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const passwordValida = regexPassword.test(password);
    const coincide = password === confirmar;

    const salir = () => window.location.href = '/';

    const guardarNueva = (e) => {
        e.preventDefault(); /* ~~~~~~~ Evita el envío del formulario y la recarga de la página ~~~~~~~ */
        setEnviado(true);
        if (!passwordValida || !coincide) return;

        setMostrarVentana(true);
    };

    return (
    <section className='Contenedor'>
        
        <form onSubmit={guardarNueva}>
            <button className='Salir' onClick={salir}><IoMdClose /></button>
            <br/><br/><br/>

            <h1 className='TituloAcceso'>Cambiar contraseña</h1>
            <p>Ingresa y confirma tu nueva contraseña</p>

            <div className={`Campo ${!passwordValida && enviado ? 'invalido' : ''}`}>
                <FaUnlockAlt className="Icono" />

                <input type='password'id='password' placeholder='Contraseña nueva' value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>

            {!passwordValida && enviado && (
                <div className="invalid">Tu contraseña debe tener al menos 6 caracteres, además de incluir letras y números</div>
            )}

            <div className={`Campo ${!coincide && enviado ? 'invalido' : ''}`}>
                <FaUserLock className="Icono" />

                <input type='password' id='password'placeholder='Confirmar contraseña'
                    value={confirmar} onChange={e => setConfirmar(e.target.value)} />
            </div>

            {!coincide && enviado && (
                <div className="invalid">Las contraseñas no coinciden <br/><br/> </div>
            )}

            <button className='Continuar' onClick={guardarNueva}>Guardar contraseña</button>

            {mostrarVentana && (
                <VentanaConfirmacion 
                mensaje="Tu contraseña se ha cambiado con éxito"
                onClose={() => setMostrarVentana(false)}
                onExit={() => navigate('/')} />
            )}
        </form>
    </section>
    );
}
