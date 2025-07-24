//~~~~~~~~~~~~~~ Librerías ~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import FormularioAdmin from '../../components/FormularioAdmin';

//~~~~~~~~~~~~~~ Estilo Global ~~~~~~~~~~~~~~
import "../../assets/styles/Global.css";

export default function EditarTrabajador() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [datosIniciales, setDatosIniciales] = useState(null);
    const [cargando, setCargando] = useState(true);

    const camposTrabajador = [
        { nombre: 'email', etiqueta: 'Correo Electrónico', tipo: 'email', requerido: true },
        { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text', requerido: true },
        { nombre: 'apellido', etiqueta: 'Apellido', tipo: 'text', requerido: true },
        { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'text', requerido: false }
    ];

    // Verificación inicial del ID
    useEffect(() => {
        if (!id) {
            alert("ID no válido.");
            navigate("/AdministrarTrabajadores");
            return;
        }

        axios.get(`http://localhost:8000/api/usuarios/${id}/`)
            .then(res => {
                setDatosIniciales(res.data);
            })
            .catch(err => {
                console.error("Error al cargar trabajador:", err);
                alert("No se pudo cargar el trabajador.");
                navigate("/AdministrarTrabajadores");
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id, navigate]);

    const manejarEnvio = async (datos) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/usuarios/${id}/`, datos);
            console.log("Trabajador actualizado:", response.data);
            alert("Trabajador actualizado con éxito.");
            navigate("/AdministrarTrabajadores");
        } catch (error) {
            console.error("Error al actualizar trabajador:", error.response?.data || error);
            alert("Error al actualizar el trabajador.");
        }
    };

    const botones = [
        {
            texto: 'Actualizar',
            tipo: 'submit',
            clase: 'guardar',
            onClick: null
        },
        {
            texto: 'Cancelar',
            tipo: 'button',
            clase: 'salir',
            onClick: () => navigate("/AdministrarTrabajadores")
        }
    ];

    return (
        <div className="contenedor_formulario_inventario">
            {cargando ? (
                <p>Cargando datos del trabajador...</p>
            ) : datosIniciales ? (
                <FormularioAdmin
                    campos={camposTrabajador}
                    valoresIniciales={datosIniciales}
                    onSubmit={manejarEnvio}
                    botonesPersonalizados={botones}
                />
            ) : (
                <p>Error al cargar los datos.</p>
            )}
        </div>
    );
}
