// ProductoDetalle.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/InfoPorProducto.css';
import { AiFillHeart, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { useCarrito } from '../Context/CarritoContext';
import "../assets/styles/Global.css";
import campana from '../assets/images/campana.png';

// Modal simple
// Modal simple, cierra con botón, overlay y tecla ESC
function ModalAviso({ mensaje, onClose }) {
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}              // clic fuera cierra
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita que el clic dentro cierre
      >
        <h3>⚠ Aviso</h3>
        <p>{mensaje}</p>
        <button
          type="button"
          className="boton-cerrar"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

// Modal de confirmación para eliminar
function ModalConfirmacion({ mensaje, onConfirm, onCancel }) {
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={campana} alt="campana" width="20px"/>
        <h3> Confirmar eliminación</h3>
        <p>{mensaje}</p>
        <div className="botones-modal">
          <br /> <br />
          <button className="boton-moderno-v-2" onClick={onConfirm}>Sí, eliminar</button>
          <br /> <br />
          <button className="boton-moderno-v-2" onClick={onCancel}>Cancelar</button>
          <br /> <br />
        </div>
      </div>
    </div>
  );
}

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);

  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState('');
  const [comentarioAEliminar, setComentarioAEliminar] = useState(null);


  const { agregarProducto, carrito } = useCarrito();

  // Estado para modal
  const [modalMensaje, setModalMensaje] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/carrito/producto/${id}/`);
        setProducto({
          id: response.data.id_producto ?? response.data.id,
          nameProduct: response.data.nombre,
          price: response.data.precio,
          image: response.data.imagen
          ? (response.data.imagen.startsWith("http")
              ? response.data.imagen
              : `http://localhost:8000${response.data.imagen}`)
          : "https://via.placeholder.com/150",
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
        const response = await axios.get(`http://localhost:8000/api/carrito/producto/${id}/comentarios/`);
        setComentarios(response.data);
      } catch (error) {
        console.error("❌ Error al obtener comentarios:", error);
      }
    };

    const obtenerUsuario = () => {
      try {
        const token = sessionStorage.getItem("access");
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
    if (producto.stock === 0) {
      setModalMensaje(`El producto "${producto.nameProduct}" no está disponible actualmente.`);
      return;
    }

    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.quantity : 0;

    if (cantidadActual < producto.stock) {
      agregarProducto(producto);
      setPopup(producto.nameProduct);
      setTimeout(() => setPopup(null), 2000);
    } else {
      setModalMensaje(`No puedes agregar más de ${producto.stock} unidades de "${producto.nameProduct}".`);
    }
  };

  const enviarComentario = async () => {
    if (nuevoComentario.trim() === '') return;

    try {
      const token = sessionStorage.getItem("access");
      if (!token) {
        alert("Debes iniciar sesión para comentar.");
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/carrito/comentarios/',
        {
          id_producto: parseInt(id),
          comentario: nuevoComentario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComentarios(prev => [response.data, ...prev]);
      setNuevoComentario('');
    } catch (error) {
      console.error(" Error al enviar comentario:", error);
      alert("Debes iniciar sesión para comentar.");
    }
  };

  const iniciarEdicion = (comentario) => {
    setComentarioEditando(comentario.id_valoracion);
    setComentarioEditado(comentario.comentario);
  };

  const guardarEdicion = async (comentarioId) => {
    try {
      const token = sessionStorage.getItem("access");

      const response = await axios.put(`http://localhost:8000/api/carrito/comentarios/${comentarioId}/`, {
        comentario: comentarioEditado,
        id_producto: producto.id,
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
      console.error(" Error al editar comentario:", error);
    }
  };

const eliminarComentario = async (comentarioId) => {
  try {
    const token = sessionStorage.getItem("access");
    await axios.delete(`http://localhost:8000/api/carrito/comentarios/${comentarioId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setComentarios(prev => prev.filter(c => c.id_valoracion !== comentarioId));
    setComentarioAEliminar(null); // cerrar modal después de borrar
  } catch (error) {
    console.error(" Error al eliminar comentario:", error);
  }
  };


  if (error) return <h2 className="error">{error}</h2>;
  if (!producto) return <h2 className="loading">Cargando producto...</h2>;

  return (
    <>
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

        <h2 className='titulo-comentario'>Comentarios</h2>

        <div className='FormularioComentario'>
              <textarea className='input-comentario'
                placeholder='Escribe tu comentario..!'
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              />
              <br /> <br />
              <button className='boton-moderno' onClick={enviarComentario}>Enviar</button>
              <br /> <br />
        </div>

        <div className='InfoInferiorCalificacion'>

          <div className='MetodosPagoInfo'>
            <h1>Medios de pago</h1>
            <ul>
              <li>🧺 En la panadería</li>
              <li>🏠 Contra-entrega</li>
              <li>📱 Código QR</li>
            </ul>
          </div>
          
          <div className='ContenedorComentarios'>
            <br />
            <div className='ListaComentarios'>
              {comentarios.length === 0 ? (
                <p className='sin-comentarios'>No hay comentarios aún.</p>
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
                            className='select-pequeño'
                            value={comentarioEditado}
                            onChange={(e) => setComentarioEditado(e.target.value)}
                            placeholder="Edita tu comentario..."
                          />
                          <br /> 
                          <div className="BotonesEdicion">
                            <button className='boton-pequeño' onClick={() => guardarEdicion(comentario.id_valoracion)}>💾 Guardar</button>
                            <button className='boton-pequeño' onClick={() => setComentarioEditando(null)}>❌ Cancelar</button>
                          </div>
                          <br /> <br />
                        </>
                      ) : (
                        <>
                          <p>{comentario.comentario}</p>
                          <small>{new Date(comentario.fecha_valoracion).toLocaleDateString()}</small>

                          {esComentarioUsuario && (
                            <div className="BotonesComentario">
                              <button  onClick={() => iniciarEdicion(comentario)}>
                                <AiFillEdit size={20} color="orange" />
                              </button>
                              <button onClick={() => setComentarioAEliminar(comentario.id_valoracion)}>
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
            <br /> <br />

          </div>

        </div>
      </section>

      {/* Modal de aviso */}
      {modalMensaje && (
        <ModalAviso
          mensaje={modalMensaje}
          onClose={() => setModalMensaje(null)}
        />
      )}
      {/* Modal de confirmación para eliminar */}
      {comentarioAEliminar && (
        <ModalConfirmacion
          
          mensaje="¿Estás seguro de que quieres eliminar este comentario?"
          onConfirm={() => eliminarComentario(comentarioAEliminar)} // pasar id del comentario
          onCancel={() => setComentarioAEliminar(null)}
        />
        )}
     
    </>
    
  );
}