
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/inicio.css";

const Inicio = () => {
  const navigate = useNavigate();

  const ListaPedidos = () => navigate('/ListaPedidos');
  const EstadosPedidos = () => navigate('/EstadosPedidos');
  const HistorialPedidos = () => navigate('/HistorialPedidos');
  const CronogramaTrabajador = () => navigate('/CronogramaTrabajador')

  return (
    <>
    <h1 className='titulo'>Bienvenido trabajador, gestiona las compras !</h1>
    <br />
    <div className="inicio-fondo">

      <div className="opciones-inicio">

        {/* Pedidos en espera */}
        <div className="opcion">
          <div className="borde" onClick={ListaPedidos}>
            <div className="imagen-carta"></div>
          </div>
          <button onClick={ListaPedidos}>Pedidos en espera</button>
        </div>

        {/* Estados de los pedidos */}
        <div className="opcion">
          <div className="borde" onClick={EstadosPedidos}>
            <div className="imagen-estado"></div>
          </div>
          <button onClick={EstadosPedidos}>Estados de los pedidos</button>
        </div>

        {/* Historial de pedidos */}
        <div className="opcion">
          <div className="borde" onClick={HistorialPedidos}>
            <div className="imagen-historial"></div>
          </div>
          <button onClick={HistorialPedidos}>Historial de pedidos</button>
        </div>

        {/* Cronograma del trabjador */}
        <div className="opcion">
          <div className="borde" onClick={CronogramaTrabajador}>
            <div className="imagen-cronograma"></div>
          </div>
          <button onClick={CronogramaTrabajador}>Mi Cronograma</button>
        </div>

      </div>
      <br /> <br /> <br />  <br />
    </div>
    
    </>
  );
};

export default Inicio;
