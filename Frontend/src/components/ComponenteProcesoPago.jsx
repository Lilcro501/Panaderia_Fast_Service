import React from 'react'
import "../assets/styles/Factura.css"
import CarritoCompra from '../assets/icons/CarritoCompra.png'
import DatosEntrega from '../assets/icons/DatosEntrega.png'
import PagoSeguro from '../assets/icons/PagoSeguro.png'

const ComponenteProcesoPago = () => {
  return (
    <div className="contenedor-linea">
      <div className="formato-circulo">
        <div className="circulo-rojo">
          <img className="Facturaimg" src={CarritoCompra} alt="Carrito compras"/>
        </div>
        <div className="circulo-verde">
            <img className='Facturaimg' src={DatosEntrega} alt='Datos entrega'/>
        </div>

        <div className="circulo-amarillo">
            <img className='Facturaimg' src={PagoSeguro} alt='Pago seguro'/>
        </div>
      </div>
    </div>
  )
}

export default ComponenteProcesoPago
