import React from 'react'
import "../assets/styles/Factura.css"

const ComponenteProcesoPago = () => {
  return (
    <div className="contenedor-linea">
      <div className="formato-circulo">
        <div className="circulo-rojo">
          <p>Carrito de compras</p>
        </div>
        <div className="circulo-verde">
            <p>Datos de entrega</p>
        </div>

        <div className="circulo-amarillo">
            <p>Pago seguro</p>
        </div>
      </div>
    </div>
  )
}

export default ComponenteProcesoPago

