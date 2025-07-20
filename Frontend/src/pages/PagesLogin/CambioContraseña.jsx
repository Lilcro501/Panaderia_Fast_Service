import React, { useState } from 'react';
import '../../assets/styles/Acceso.css';
import { IoMdClose } from 'react-icons/io';
import { FaUnlockAlt, FaUserLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import VentanaConfirmacion from '../../components/VentanaConfirmacion';
import { cambiarPassword } from '../../api/login';

export default function CambioContraseña() {
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [mostrarVentana, setMostrarVentana] = useState(false);
    const navigate = useNavigate();

    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const passwordValida = regexPassword.test(password);
    const coincide = password === confirmar;

    const salir = () => navigate('/AccedeAqui');

    const guardarNueva = async (e) => {
        e.preventDefault();
        setEnviado(true);
        if (!passwordValida || !coincide) return;

        const email = localStorage.getItem('correoRecuperacion');
        if (!email) {
            alert('❌ No se encontró el correo. Por favor vuelve a solicitar el código.');
            navigate('/OlvidoContraseña');
            return;
        }

        try {
            await cambiarPassword({ email, nueva_password: password });
            setMostrarVentana(true);
        } catch (error) {
            console.error('❌ Error al cambiar la contraseña:', error);
            alert('❌ No se pudo cambiar la contraseña. Inténtalo de nuevo.');
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
            </form>
        </section>
    );
}
