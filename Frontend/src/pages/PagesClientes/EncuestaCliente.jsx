import React, { useEffect, useState } from 'react';
import CalificarExperiencia from '../PagesClientes/CalificarExperiencia';
import Recomendacion from '../PagesClientes/Recomendacion';
import Tabla_opinion from '../../components/Tabla_opinion';
import '../../assets/styles/EncuestaCliente.css';

const EncuestaCliente = () => {
  const [datosCalificarExperiencia, setDatosCalificarExperiencia] = useState(null);
  const [datosRecomendacion, setDatosRecomendacion] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarFormularios, setMostrarFormularios] = useState(true);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('opinionesClientes')) || [];
    setRespuestas(datosGuardados);
  }, []);

  useEffect(() => {
    if (datosCalificarExperiencia && datosRecomendacion) {
      const nuevaOpinion = {
        ...datosCalificarExperiencia,
        ...datosRecomendacion,
        fecha: new Date().toISOString().split('T')[0],
      };

      const nuevasRespuestas = [...respuestas, nuevaOpinion];
      setRespuestas(nuevasRespuestas);
      localStorage.setItem('opinionesClientes', JSON.stringify(nuevasRespuestas));

      setDatosCalificarExperiencia(null);
      setDatosRecomendacion(null);
      setMostrarFormularios(false);
    }
  }, [datosCalificarExperiencia, datosRecomendacion]);

  const volverAOpinar = () => {
    setMostrarFormularios(true);
    setDatosCalificarExperiencia(null);
    setDatosRecomendacion(null);
  };

  return (
    <div className="encuesta-container">
      {mostrarFormularios ? (
        <>
          {!datosCalificarExperiencia && (
            <CalificarExperiencia onGuardar={(datos) => setDatosCalificarExperiencia(datos)} />
          )}

          {datosCalificarExperiencia && !datosRecomendacion && (
            <Recomendacion onGuardar={(datos) => {
              setDatosRecomendacion(datos);
              setMostrarFormularios(false);
            }} />
          )}
        </>
      ) : (
        <>
          {respuestas.length > 0 && <Tabla_opinion datos={respuestas} />}

          <div className="boton-volver">
            <button onClick={volverAOpinar}>
              Volver a opinar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EncuestaCliente;
