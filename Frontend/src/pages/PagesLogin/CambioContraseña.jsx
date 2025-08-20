import React, { useState } from 'react';
import '../../assets/styles/AccedeAqui.css';
import { IoMdClose } from 'react-icons/io';
import { FaUnlockAlt, FaUserLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import VentanaConfirmacion from '../../components/VentanaConfirmacion';
import { cambiarPassword } from '../../api/login';
import campana from '../../assets/images/campana.png';

export default function CambioContraseña() {
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [mostrarVentana, setMostrarVentana] = useState(false);
    const [modalErrorVisible, setModalErrorVisible] = useState(false); // Nuevo modal
    const navigate = useNavigate();

    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
;
    const passwordValida = regexPassword.test(password);
    const coincide = password === confirmar;

    const salir = () => navigate('/AccedeAqui');

    const guardarNueva = async (e) => {
        e.preventDefault();
        setEnviado(true);
        if (!passwordValida || !coincide) return;

        const email = localStorage.getItem('correoRecuperacion');
        if (!email) {
            setModalErrorVisible(true);
            return;
        }

        try {
            await cambiarPassword({ email, nueva_password: password });
            setMostrarVentana(true);
        } catch (error) {
            console.error('❌ Error al cambiar la contraseña:', error);
            setModalErrorVisible(true); // Mostrar modal en error
        }
    };

    return (
        <section className='ContenedorC'>
            <form onSubmit={guardarNueva}>
                <button className='Salir' onClick={salir}><IoMdClose /></button>
                <br /><br /><br />

                <h1 className='TituloAcceso'>Cambiar contraseña</h1>
                <p>Ingresa y confirma tu nueva contraseña</p>

                <div className={`Campo ${!passwordValida && enviado ? 'invalido' : ''}`}>
                    <FaUnlockAlt className="Icono" />
                    <input
                        type='password'
                        id='password'
                        placeholder='Contraseña nueva'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {!passwordValida && enviado && (
                    <div className="invalid">Tu contraseña debe tener al menos 6 caracteres, incluyendo letras y números.</div>
                )}

                <div className={`Campo ${!coincide && enviado ? 'invalido' : ''}`}>
                    <FaUserLock className="Icono" />
                    <input
                        type='password'
                        id='confirmar'
                        placeholder='Confirmar contraseña'
                        value={confirmar}
                        onChange={e => setConfirmar(e.target.value)}
                    />
                </div>

                {!coincide && enviado && (
                    <div className="invalid">Las contraseñas no coinciden</div>
                )}

                <button className='Continuar' type='submit'>Guardar contraseña</button>

                {mostrarVentana && (
                    <VentanaConfirmacion
                        mensaje="Tu contraseña se ha cambiado con éxito"
                        onClose={() => setMostrarVentana(false)}
                        onExit={() => navigate('/AccedeAqui')}
                    />
                )}

                {/* Modal de error */}
                {modalErrorVisible && (
                    <div className="modal-bienvenida">
                        <div className="modal-contenido">
                            <img src={campana} alt="Alerta" style={{ width: "50px", marginBottom: "10px" }} />
                            <h2>❌ Error</h2>
                            <p>No se pudo cambiar la contraseña. Por favor, intenta de nuevo.</p>
                            <button
                                className="boton-aceptar"
                                onClick={() => setModalErrorVisible(false)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </section>
    );
}
