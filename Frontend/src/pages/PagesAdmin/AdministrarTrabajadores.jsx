import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Componentes
import TablaAdmin from '../../components/TablaAdmin';

// Imágenes
import agregar_documento from '../../assets/images/agregar_documento.png';
import editar_documento from '../../assets/images/editar_documento.png';
import eliminar_documento from '../../assets/images/eliminar_documento.png';

// Estilos
import "../../assets/styles/AdministrarTrabajador.css";
import "../../assets/styles/Global.css";

export default function AdministrarTrabajadores() {
    const [filas, setFilas] = useState([]);

    const encabezados = ['Correo', 'Nombre', 'Apellido', 'Teléfono', 'Acciones'];

    const obtenerTrabajadores = () => {
        axios.get('http://localhost:8000/api/usuarios/trabajadores/')
            .then(response => {
                const trabajadores = response.data;
                console.log("Trabajadores recibidos:", trabajadores); 
                console.log("Ejemplo trabajador:", trabajadores[0]);

                const filasConvertidas = trabajadores.map(trabajador => ([
                    trabajador.email,
                    trabajador.nombre,
                    trabajador.apellido,
                    trabajador.telefono || '—',
                    <div key={`acciones-${trabajador.id_usuario}`} className="acciones_tabla">
                        <Link to={`/EditarTrabajador/${trabajador.id_usuario}`}>
                            <img
                                src={editar_documento}
                                alt="Editar"
                                title="Editar trabajador"
                                className="icono_tabla"
                            />
                        </Link>
                        <button
                            onClick={() => manejarEliminar(trabajador.id_usuario)}
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

                setFilas(filasConvertidas);
            })
            .catch(error => {
                console.error('Error al obtener trabajadores:', error);
                alert("Error al cargar los trabajadores.");
            });
    };

    useEffect(() => {
        obtenerTrabajadores();
    }, []);

    const manejarEliminar = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de eliminar este trabajador?");
        if (!confirmacion) return;

        try {
            await axios.delete(`http://localhost:8000/api/usuarios/${id}/`);
            alert("Trabajador eliminado correctamente.");
            obtenerTrabajadores(); // Refrescar lista
        } catch (error) {
            console.error("Error al eliminar trabajador:", error);
            alert("No se pudo eliminar el trabajador.");
        }
    };

    return (
        <div className="contenedor_principal">
            <h2 className="titulo_seccion">Administrar Trabajadores</h2>
            <TablaAdmin encabezados={encabezados} filas={filas} />

            <div className="iconos_acciones">
                <Link to='/AgregarTrabajador' title="Agregar nuevo trabajador">
                    <img src={agregar_documento} alt="Agregar" />
                </Link>
            </div>
        </div>
    );
}
