// ProductoDetalle.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/InfoPorProducto.css';
import { AiFillHeart, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { useCarrito } from '../Context/CarritoContext';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);

  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);
  const [usuarioId, setUsuarioId] = useState(null);

  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState('');
  const [puntuacionEditada, setPuntuacionEditada] = useState(5);

  const { agregarProducto, carrito } = useCarrito();

useEffect(() => {
  const obtenerProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/productos/${id}/`);
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

  const obtenerComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/productos/${id}/comentario/`);
      setComentarios(response.data);
    } catch (error) {
      console.error("❌ Error al obtener comentarios:", error);
    }
  };

  const obtenerUsuario = () => {
    try {
      const token = localStorage.getItem("access");
      if (token) {
        const payloadBase64 = token.split('.')[1];
        const decoded = JSON.parse(atob(payloadBase64));
        setUsuarioId(decoded.user_id);
      }
    } catch (err) {
      console.error("❌ Error al decodificar token:", err);
    }
  };

  if (id) {
    obtenerProducto();
    obtenerComentarios();
    obtenerUsuario();
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
      alert(`⚠️ No puedes agregar más de ${producto.stock} unidades de ${producto.nameProduct}`);
    }
  };

  const enviarComentario = async () => {
    if (nuevoComentario.trim() === '') return;

    try {
      const token = localStorage.getItem("access");
      if (!token) {
        alert("Debes iniciar sesión para comentar.");
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/comentarios/',
        {
          id_producto: parseInt(id),
          comentario: nuevoComentario,
          puntuacion: puntuacion
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComentarios(prev => [response.data, ...prev]);
      setNuevoComentario('');
      setPuntuacion(5);
    } catch (error) {
      console.error("❌ Error al enviar comentario:", error);
      alert("Debes iniciar sesión para comentar.");
    }
  };

  const iniciarEdicion = (comentario) => {
    setComentarioEditando(comentario.id_valoracion);
    setComentarioEditado(comentario.comentario);
    setPuntuacionEditada(comentario.puntuacion);
  };

  const guardarEdicion = async (comentarioId) => {
    try {
      const token = localStorage.getItem("access");
      console.log("🧪 Enviando PUT:", {
        comentario: comentarioEditado,
        puntuacion: puntuacionEditada,
        id_producto: producto.id,
      });

      const response = await axios.put(`http://localhost:8000/api/comentarios/${comentarioId}/`, {
        comentario: comentarioEditado,
        puntuacion: puntuacionEditada,
        id_producto: producto.id, // 👈 esto es lo que falta probablemente
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setComentarios(prev =>
        prev.map(c => c.id_valoracion === comentarioId ? response.data : c)
      );
      setComentarioEditando(null);
    } catch (error) {
      console.error("❌ Error al editar comentario:", error);
    }
  };

  const eliminarComentario = async (comentarioId) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este comentario?");
    if (!confirmacion) return;

    try {
      const token = localStorage.getItem("access");
      await axios.delete(`http://localhost:8000/api/comentarios/${comentarioId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComentarios(prev => prev.filter(c => c.id_valoracion !== comentarioId));
    } catch (error) {
      console.error("❌ Error al eliminar comentario:", error);
    }
  };

  if (error) return <h2 className="error">{error}</h2>;
  if (!producto) return <h2 className="loading">Cargando producto...</h2>;

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

          {popup && <div className="popup-mini">✅ {popup} añadido al carrito</div>}
        </div>
      </div>

      <h2 className='Calificacion'>Calificación</h2>
      <div className='ContenedorPanesC'>
        {[...Array(3)].map((_, i) => (
          <span key={`filled-${i}`} style={{ fontSize: '24px', marginRight: '5px', color: '#D2691E' }}>🍞</span>
        ))}
        {[...Array(2)].map((_, i) => (
          <span key={`gray-${i}`} style={{ fontSize: '24px', marginRight: '5px', color: 'lightgray' }}>🍞</span>
        ))}
      </div>

      <div className='InfoInferiorCalificacion'>
        <div className='ContenedorComentarios'>
          <h1 className='Comentarios'>Comentarios</h1>

          <div className='ListaComentarios'>
            {comentarios.length === 0 ? (
              <p>No hay comentarios aún.</p>
            ) : (
              comentarios.map((comentario) => {
                const esComentarioUsuario = Number(usuarioId) === Number(comentario.usuario?.id);
                const enEdicion = comentarioEditando === comentario.id_valoracion;

                return (
                  <div
                    key={comentario.id_valoracion}
                    className={`ComentarioItem ${esComentarioUsuario ? 'ComentarioDerecha' : 'ComentarioIzquierda'}`}
                  >
                    <strong>{comentario.usuario?.nombre} {comentario.usuario?.apellido}</strong>

                    {enEdicion ? (
                      <>
                        <textarea
                          value={comentarioEditado}
                          onChange={(e) => setComentarioEditado(e.target.value)}
                          placeholder="Edita tu comentario..."
                        />
                        <select
                          value={puntuacionEditada}
                          onChange={(e) => setPuntuacionEditada(parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <div className="BotonesEdicion">
                          <button onClick={() => guardarEdicion(comentario.id_valoracion)}>💾 Guardar</button>
                          <button onClick={() => setComentarioEditando(null)}>❌ Cancelar</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>{comentario.comentario}</p>
                        <span>Puntuación: {comentario.puntuacion}/5</span><br />
                        <small>{new Date(comentario.fecha_valoracion).toLocaleDateString()}</small>

                        {esComentarioUsuario && (
                          <div className="BotonesComentario">
                            <button onClick={() => iniciarEdicion(comentario)}>
                              <AiFillEdit size={20} color="orange" />
                            </button>
                            <button onClick={() => eliminarComentario(comentario.id_valoracion)}>
                              <AiFillDelete size={20} color="red" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className='FormularioComentario'>
            <textarea
              placeholder='Escribe tu comentario...'
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <select value={puntuacion} onChange={(e) => setPuntuacion(parseInt(e.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button onClick={enviarComentario}>Enviar</button>
          </div>
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
