// ProductoDetalle.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/InfoPorProducto.css';
import { AiFillHeart, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { useCarrito } from '../Context/CarritoContext';
import "../assets/styles/Global.css";
import campana from '../assets/images/campana.png';

// Modal de aviso
function ModalAviso({ mensaje, onClose }) {
  React.useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        <h3>⚠ Aviso</h3>
        <p>{mensaje}</p>
        <button
          type="button"
          className="boton-cerrar"
          onClick={onClose}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4caf50',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

// Modal de confirmación corregido
{/* ModalConfirmacion.jsx */}
function ModalConfirmacion({ mensaje, onConfirm, onCancel }) {
  const handleConfirm = () => {
    onConfirm();       // Ejecuta la acción de eliminación
    onCancel();        // Cierra el modal después
  };

  React.useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        <img src={campana} alt="campana" width="40px" style={{ marginBottom: '10px' }} />
        <h3>Confirmar eliminación</h3>
        <p>{mensaje}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <button
            type="button"
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={handleConfirm}
          >
            Sí, eliminar
          </button>
          <button
            type="button"
            style={{
              padding: '10px 20px',
              backgroundColor: '#ccc',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={onCancel}
          >
            Cancelar
          </button>
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
      const token = localStorage.getItem("access");
      if (!token) {
        alert("Debes iniciar sesión para comentar.");
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/carrito/comentarios/',
        { id_producto: parseInt(id), comentario: nuevoComentario },
        { headers: { Authorization: `Bearer ${token}` } }
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
      const token = localStorage.getItem("access");
      const response = await axios.put(`http://localhost:8000/api/carrito/comentarios/${comentarioId}/`, {
        comentario: comentarioEditado,
        id_producto: producto.id,
      }, { headers: { Authorization: `Bearer ${token}` } });

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
      const token = localStorage.getItem("access");
      await axios.delete(`http://localhost:8000/api/carrito/comentarios/${comentarioId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setComentarios(prev => prev.filter(c => c.id_valoracion !== comentarioId));
      setComentarioAEliminar(null);
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
            <img className='ImagenDetalleProducto' src={producto.image} alt={`Imagen de ${producto.nameProduct}`} />
          </div>
          <div className='InfoProducto'>
            <div className='Heart'>
              <AiFillHeart color="red" size={24} />
            </div>
            <h2 className='TituloProduct'>{producto.nameProduct}</h2>
            <p className='DescripcionProducto'>{producto.description}</p>
            <h1 className='Precio'>${producto.price.toLocaleString()}</h1>
            <br />
            <button className="agregar" onClick={() => manejarAgregar(producto)} disabled={producto.stock === 0}>
              {producto.stock === 0 ? "Agotado" : "Añadir"}
            </button>
            {popup && <div className="popup-mini">✅ {popup} añadido al carrito</div>}
          </div>
        </div>

        <h2 className='titulo-comentario'>Comentarios</h2>

        <div className='FormularioComentario'>
          <textarea className='input-comentario' placeholder='Escribe tu comentario..!' value={nuevoComentario} onChange={(e) => setNuevoComentario(e.target.value)} />
          <br /><br />
          <button className='boton-moderno' onClick={enviarComentario}>Enviar</button>
          <br /><br />
        </div>

        <div className='InfoInferiorCalificacion'>
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
                          <textarea value={comentarioEditado} onChange={(e) => setComentarioEditado(e.target.value)} placeholder="Edita tu comentario..." />
                          <div className="BotonesEdicion">
                            <button onClick={() => guardarEdicion(comentario.id_valoracion)}>💾 Guardar</button>
                            <button onClick={() => setComentarioEditando(null)}>❌ Cancelar</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>{comentario.comentario}</p>
                          <small>{new Date(comentario.fecha_valoracion).toLocaleDateString()}</small>
                          {esComentarioUsuario && (
                            <div className="BotonesComentario">
                              <button onClick={() => iniciarEdicion(comentario)}>
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
            <br /><br />
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

      {/* Modal de aviso */}
      {modalMensaje && <ModalAviso mensaje={modalMensaje} onClose={() => setModalMensaje(null)} />}

      {/* Modal de confirmación */}
      {comentarioAEliminar && (
        <ModalConfirmacion
          mensaje="¿Estás seguro de que quieres eliminar este comentario?"
          onConfirm={() => eliminarComentario(comentarioAEliminar)}
          onCancel={() => setComentarioAEliminar(null)}
        />
      )}
    </>
  );
}
