
import React from 'react';
import '../assets/styles/InfoPorProducto.css';
import { AiOutlineHeart, AiTwotoneHeart, AiFillHeart } from "react-icons/ai";
import { Icon } from '@iconify/react';
import breadIcon from '@iconify-icons/mdi/bread';

export default function ProductoDetalle({ nombre, descripcion, precio, imagen }) {
    return (
        <section className='ContenedorProductoInfo'>
            <div className='InfoSuperiorCalificacion'>
                <div className='ImagenProducto'>
                    <img className='PanTrenza' src={imagen} alt={nombre} />
                </div>

                <div className='InfoProducto'>
                    <div className='Heart'>
                        
                    </div>
                    
                    <h2 className='TituloProduct'>{nombre}</h2>
                    <p className='DescripcionProducto'>{descripcion}</p>
                    <h1 className='Precio'>${precio}</h1>

                    <button className='BotonComprar'>Comprar ahora</button>
                    <br/>
                    <button className='BotonAñadirCarrito'>Añadir al carrito</button>
                </div>
            </div>

            <h2 className='Calificacion'>Calificación</h2>
            <div className='ContenedorPanesC'>
                {[...Array(3)].map((_, i) => (
                    <Icon key={i} icon={breadIcon} width="30" style={{ marginRight: '5px' }} />
                ))}
                {[...Array(2)].map((_, i) => (
                    <Icon key={i} icon={breadIcon} width="30" style={{ marginRight: '5px', color: 'gray' }} />
                ))}
            </div>

            <div className='InfoInferiorCalificacion'>
                <div className='ContenedorComentarios'>
                    <h1 className='Comentarios'>Comentarios</h1>
                </div>

                <div className='MetodosPagoInfo'>
                    <h1>Medios de pago</h1>
                    <ul>
                        <li><Icon icon="twemoji:bread" width='30' /> En la panadería</li>
                        <li><Icon icon="twemoji:house" width='30' /> Contra-entrega</li>
                        <li><Icon icon="heroicons:qr-code" width="40" height="40" style={{ marginRight: '8px' }} /> Código QR</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
