// Importamos React y hooks (useEffect y useState) para manejar estado y efectos secundarios
import React, { useEffect, useState } from 'react';

// Importamos Link de react-router-dom para manejar navegación
import { Link } from 'react-router-dom';

// Importamos axios para realizar solicitudes HTTP al backend
import axios from 'axios';

// Importamos componentes que vamos a reutilizar
import TablaAdmin from '../../components/TablaAdmin';

// Importamos imágenes que se usan como íconos
import agregar_documento from '../../assets/images/agregar_documento.png';
import editar_documento from '../../assets/images/editar_documento.png';
import eliminar_documento from '../../assets/images/eliminar_documento.png';

// Importamos los estilos CSS
import "../../assets/styles/AdministrarTrabajador.css";
import "../../assets/styles/Global.css";

// Componente principal para administrar los trabajadores
export default function AdministrarTrabajadores() {
    // Estado para guardar los datos que se mostrarán en la tabla
    const [filas, setFilas] = useState([]);

    // Estado de notificaciones (mensaje y tipo: éxito o error)
    const [notificacion, setNotificacion] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    // Estado para controlar confirmación personalizada
    const [confirmacion, setConfirmacion] = useState({
        visible: false,
        id: null
    });

    // Función para mostrar una notificación por 2 segundos
    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => {
            setNotificacion({ visible: false, mensaje: "", tipo: "" });
        }, 2000);
    };

    // Definimos los encabezados de la tabla
    const encabezados = ['Correo', 'Nombre', 'Apellido', 'Teléfono', 'Acciones'];

    // Función para obtener todos los trabajadores desde el backend
    const obtenerTrabajadores = () => {
        axios.get('http://localhost:8000/api/administrador/usuarios/trabajadores/')
            .then(response => {
                const trabajadores = response.data;

                // Convertimos cada trabajador en una fila de la tabla
                const filasConvertidas = trabajadores.map(trabajador => ([
                    trabajador.email,                 // Correo
                    trabajador.nombre,                // Nombre
                    trabajador.apellido,              // Apellido
                    trabajador.telefono || '—',       // Teléfono (si no tiene, se muestra "—")

                    // Columna de acciones (editar y eliminar)
                    <div key={`acciones-${trabajador.id_usuario}`} className="acciones_tabla">
                        {/* Botón para editar trabajador */}
                        <Link to={`/EditarTrabajador/${trabajador.id_usuario}`}>
                            <img
                                src={editar_documento}
                                alt="Editar"
                                title="Editar trabajador"
                                className="icono_tabla"
                            />
                        </Link>

                        {/* Botón para eliminar trabajador */}
                        <button
                            onClick={() => setConfirmacion({ visible: true, id: trabajador.id_usuario })}
                            className="boton_eliminar_tabla"
                            title="Eliminar trabajador"
                        >
                            <img
                                src={eliminar_documento}
                                alt="Eliminar"
                                className="icono_tabla"
                            />
                        </button>
                    </div>
                ]));

                setFilas(filasConvertidas); // Guardamos las filas en el estado
            })
            .catch(error => {
                console.error('Error al obtener trabajadores:', error);
                mostrarNotificacion("❌ Error al cargar los trabajadores.", "error");
            });
    };

    // Se ejecuta cuando el componente se monta
    useEffect(() => {
        obtenerTrabajadores();
    }, []);

    // Función para eliminar un trabajador
    const manejarEliminar = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/administrador/usuarios/${confirmacion.id}/`);
            mostrarNotificacion("✅ Trabajador eliminado correctamente.", "exito");
            setConfirmacion({ visible: false, id: null });
            obtenerTrabajadores();
        } catch (error) {
            console.error("Error al eliminar trabajador:", error);
            mostrarNotificacion("❌ No se pudo eliminar el trabajador.", "error");
        }
    };

    // Renderizado del componente
    return (
        <div className="contenedor_principal">
            <h2 
                className="titulo_seccion" 
                style={{ textAlign: "center", color:'white'  }} >
                Administrar Trabajadores
            </h2>
            {/* Tabla de trabajadores */}
            <TablaAdmin encabezados={encabezados} filas={filas} />

            {/* Botón (ícono) para agregar un nuevo trabajador */}
            <div className="iconos_acciones">
                <Link to='/AgregarTrabajador' title="Agregar nuevo trabajador">
                    <img src={agregar_documento} alt="Agregar" />
                </Link>
            </div>

            {/* Renderizado condicional de la notificación */}
            {notificacion.visible && (
                <div className={`modal-fondo modal-${notificacion.tipo}`}>
                    <div className="modal-contenido">
                        <p>{notificacion.mensaje}</p>
                    </div>
                </div>
            )}

            {/* Modal de confirmación personalizado */}
            {confirmacion.visible && (
                <div className="modal-fondo modal-confirmacion">
                    <div className="modal-contenido">
                        <p>¿Estás seguro de eliminar este trabajador?</p>
                        <div className="modal-botones">
                            <button onClick={manejarEliminar} className="btn-confirmar">Sí</button>
                            <button onClick={() => setConfirmacion({ visible: false, id: null })} className="btn-cancelar">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

