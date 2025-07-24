import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormularioAdmin from '../../components/FormularioAdmin';
import "../../assets/styles/Global.css";

export default function AgregarCrono() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/usuarios/')
            .then(response => {
                console.log("🧾 Trabajadores recibidos:", response.data);

                const trabajadoresFiltrados = response.data.filter(usuario => usuario.rol === "trabajador");

                // Formateamos para el campo tipo select
                const opciones = trabajadoresFiltrados.map(usuario => ({
                    valor: usuario.id_usuario.toString(),
                    etiqueta: `${usuario.nombre} ${usuario.apellido}`
                }));

                setUsuarios(opciones); // ← Aquí sí usamos el estado correcto
            })
            .catch(error => {
                console.error("Error al obtener trabajadores:", error);
            });
    }, []);

    const camposFormulario = [
        {
            nombre: 'id_usuario',
            etiqueta: 'Trabajador',
            tipo: 'select',
            requerido: true,
            opciones: usuarios
        },
        {
            nombre: 'titulo',
            etiqueta: 'Cargo',
            tipo: 'text',
            requerido: true
        },
        {
            nombre: 'descripcion',
            etiqueta: 'Actividades',
            tipo: 'textarea',
            requerido: true
        },
        {
            nombre: 'fecha_inicio',
            etiqueta: 'Fecha y hora de inicio',
            tipo: 'datetime-local',
            requerido: true
        },
        {
            nombre: 'fecha_fin',
            etiqueta: 'Fecha y hora de fin',
            tipo: 'datetime-local',
            requerido: true
        }
    ];

    const manejarEnvio = async (datos) => {
        const datosAEnviar = {
            ...datos,
            id_usuario: parseInt(datos.id_usuario, 10),
            fecha_inicio: datos.fecha_inicio,
            fecha_fin: datos.fecha_fin
        };

        console.log("Enviando datos al backend:", datosAEnviar);

        try {
            const response = await axios.post("http://localhost:8000/api/cronograma/", datosAEnviar);
            console.log("Cronograma creado:", response.data);
            alert("Cronograma guardado correctamente.");
        } catch (error) {
            console.error("Error al guardar cronograma:", error.response?.data || error);
            alert("Error al guardar el cronograma: " + JSON.stringify(error.response?.data));
        }
    };

    const botones = [
        {
            texto: 'Aceptar',
            tipo: 'submit',
            clase: 'guardar'
        },
        {
            texto: 'Cancelar',
            tipo: 'button',
            clase: 'salir',
            onClick: () => {
                console.log("Formulario cancelado");
            }
        }
    ];

    return (
        <div className="contenedor_formulario_inventario">
            <FormularioAdmin
                campos={camposFormulario}
                onSubmit={manejarEnvio}
                botonesPersonalizados={botones}
            />
        </div>
    );
}
