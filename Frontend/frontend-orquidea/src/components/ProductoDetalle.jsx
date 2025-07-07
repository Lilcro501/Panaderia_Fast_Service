import React from 'react';
import '../assets/styles/InfoPorProducto.css';
import { AiFillHeart } from "react-icons/ai";

export default function ProductoDetalle({ nombre, descripcion, precio, imagen }) {
    return (
        <section className='ContenedorProductoInfo'>
            <div className='InfoSuperiorCalificacion'>
                <div className='ImagenProducto'>
                    <img className='ImagenDetalleProducto' src={imagen} alt={`Imagen de ${nombre}`} />
                </div>

                <div className='InfoProducto'>
                    <div className='Heart'>
                        <AiFillHeart color="red" size={24} />
                    </div>

                    <h2 className='TituloProduct'>{nombre}</h2>
                    <p className='DescripcionProducto'>{descripcion}</p>
                    <h1 className='Precio'>${precio.toLocaleString()}</h1>

                    <button className='BotonComprar'>Comprar ahora</button>
                    <br />
                    <button className='BotonAñadirCarrito'>Añadir al carrito</button>
                </div>
            </div>

            <h2 className='Calificacion'>Calificación</h2>
            <div className='ContenedorPanesC'>
                {[...Array(3)].map((_, i) => (
                    <span key={`filled-${i}`} style={{ fontSize: '24px', marginRight: '5px', color: '#D2691E' }}>
                        🍞
                    </span>
                ))}
                {[...Array(2)].map((_, i) => (
                    <span key={`gray-${i}`} style={{ fontSize: '24px', marginRight: '5px', color: 'lightgray' }}>
                        🍞
                    </span>
                ))}
            </div>

            <div className='InfoInferiorCalificacion'>
                <div className='ContenedorComentarios'>
                    <h1 className='Comentarios'>Comentarios</h1>
                    {/* Aquí puedes agregar lógica para mostrar lista de comentarios */}
                </div>

                <div className='MetodosPagoInfo'>
                    <h1>Medios de pago</h1>
                    <ul>
                        <li>🧺 En la panadería</li>
                        <li>🏠 Contra-entrega</li>
                        <li>📱 Código QR</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

