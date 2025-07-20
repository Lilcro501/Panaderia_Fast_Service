import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/InfoPorProducto.css';
import { AiFillHeart } from "react-icons/ai";
import axios from 'axios';
import { useCarrito } from '../Context/CarritoContext';

export default function ProductoDetalle() {
  const { id } = useParams(); // Captura el ID de la URL
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);

  const { agregarProducto, carrito } = useCarrito();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/producto/${id}/`);
        setProducto({
          id: response.data.id_producto ?? response.data.id,
          nameProduct: response.data.nombre,
          price: response.data.precio,
          image: `http://localhost:8000${response.data.imagen}`,
          description: response.data.descripcion,
          stock: response.data.stock,
        });
      } catch (err) {
        console.error('❌ Error al obtener producto:', err);
        setError('Producto no encontrado');
      }
    };

    if (id) {
      obtenerProducto();
    }
  }, [id]);

  const manejarAgregar = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.quantity : 0;

    if (cantidadActual < producto.stock) {
      agregarProducto(producto);
      setPopup(producto.nameProduct);
      setTimeout(() => setPopup(null), 2000);
    } else {
      alert(
        `⚠️ No puedes agregar más de ${producto.stock} unidades de ${producto.nameProduct}`
      );
    }
  };

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  if (!producto) {
    return <h2 className="loading">Cargando producto...</h2>;
  }

  return (
    <section className='ContenedorProductoInfo'>
      <div className='InfoSuperiorCalificacion'>
        <div className='ImagenProducto'>
          <img
            className='ImagenDetalleProducto'
            src={producto.image}
            alt={`Imagen de ${producto.nameProduct}`}
          />
        </div>
        <div className='InfoProducto'>
          <div className='Heart'>
            <AiFillHeart color="red" size={24} />
          </div>

          <h2 className='TituloProduct'>{producto.nameProduct}</h2>
          <p className='DescripcionProducto'>{producto.description}</p>
          <h1 className='Precio'>${producto.price.toLocaleString()}</h1>

          <br />
          <button
            className="agregar"
            onClick={() => manejarAgregar(producto)}
            disabled={producto.stock === 0}
          >
            {producto.stock === 0 ? "Agotado" : "Añadir"}
          </button>

          {popup && (
            <div className="popup-mini">✅ {popup} añadido al carrito</div>
          )}
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

