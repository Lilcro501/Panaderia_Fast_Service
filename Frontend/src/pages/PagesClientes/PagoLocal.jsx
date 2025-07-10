import React from 'react';
import { useCarrito } from '../../Context/CarritoContext';
import ComponenteProcesoPago from '../../components/ComponenteProcesoPago';
import '../../assets/styles/MetodosPago.css';

const EntregaLocal = () => {
  const { carrito } = useCarrito();

  const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <ComponenteProcesoPago />
      <section className="contenedor-informacion">
        {/* Columna izquierda: Formulario */}
        <div className="formulario-columna">
          <h4>Información del cliente</h4>

          <label htmlFor="nombre">Nombres</label>
          <input className="input-moderno" type="text" id="nombre" />

          <label htmlFor="apellidos">Apellidos</label>
          <input className="input-moderno" type="text" id="apellidos" />

          <label htmlFor="cedula">Cédula</label>
          <input className="input-moderno" type="number" id="cedula" />

          <label htmlFor="direccion">Dirección</label>
          <input className="input-moderno" type="text" id="direccion" />

          <label htmlFor="fecha_entrega">Fecha de entrega</label>
          <input className="input-moderno" type="date" id="fecha_entrega" />

          <label htmlFor="hora">Hora</label>
          <input className="input-moderno" type="time" id="hora" />

          <label htmlFor="informacion-adicional">Información adicional</label>
          <input className="input-moderno" type="text" id="informacion-adicional" />
        </div>

        {/* Columna derecha: Resumen de orden y métodos de pago */}
        <div className="formulario-columna">
          <div className="detalle-orden">
            <h2>Resumen de tu orden</h2>
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  {item.nameProduct} - ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total: ${total}</strong></p>
          </div>

          <div className="metodos-pago">
            <h2>Métodos de pago</h2>
            <div>
              <h4>Código QR</h4>
              {/* Aquí podrías poner una imagen QR */}
            </div>
            <div>
              <h4>Pago contraentrega</h4>
              {/* Opción adicional */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EntregaLocal;




