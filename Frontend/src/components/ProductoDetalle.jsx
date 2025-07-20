import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/InfoPorProducto.css';
import { AiFillHeart } from "react-icons/ai";

export default function ProductoDetalle() {
  const { id } = useParams(); // Captura el ID de la URL
  const [producto, setProducto] = useState(null);

  useEffect(() => {
  const obtenerProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/producto/${id}/`);
      setProducto(response.data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      setProducto({ error: 'Producto no encontrado' }); // 🔥 Esto lo muestra luego
    }
  };

  obtenerProducto();
    }, [id]);

    if (!producto) {
    return <p>Cargando producto...</p>;
    }

    if (producto?.error) {
    return <p>{producto.error}</p>;  // 🔥 Mensaje de error visible
    }


  return (
    <section className='ContenedorProductoInfo'>
      <div className='InfoSuperiorCalificacion'>
        <div className='ImagenProducto'>
          <img className='ImagenDetalleProducto' src={producto.imagen} alt={`Imagen de ${producto.nombre}`} />
        </div>

        <div className='InfoProducto'>
          <div className='Heart'>
            <AiFillHeart color="red" size={24} />
          </div>

          <h2 className='TituloProduct'>{producto.nombre}</h2>
          <p className='DescripcionProducto'>{producto.descripcion}</p>
          <h1 className='Precio'>${producto.precio.toLocaleString()}</h1>

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
