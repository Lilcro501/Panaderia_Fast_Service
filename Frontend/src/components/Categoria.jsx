import "../assets/styles/Categoria.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Corazon from "./Corazon";
import { useCarrito } from "../Context/CarritoContext";
import { useFavoritos } from "../Context/FavoritosContext";
import { Link } from "react-router-dom";
import campana from "../assets/images/campana.png";
import "../assets/styles/Global.css";
import "../assets/styles/Categorias.css";

const API_URL = import.meta.env.VITE_API_URL;

const Categoria = ({ nombre }) => {
  const { agregarProducto, carrito } = useCarrito();
  const { esFavorito, agregarFavorito, eliminarFavorito } = useFavoritos();

  const [productos, setProductos] = useState([]);
  const [popup, setPopup] = useState(null);
  const [modalMensaje, setModalMensaje] = useState(null);

  // 🔹 Cargar productos de la categoría
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const nombreFormateado = nombre.trim().toLowerCase();
        const res = await axios.get(`${API_URL}/api/carrito/productos_categoria/${nombreFormateado}/`);
        const productosFormateados = res.data.map((producto) => ({
          id: Number(producto.id_producto ?? producto.id),
          nameProduct: producto.nombre,
          price: parseFloat(producto.precio),
          image: producto.imagen,
          description: producto.descripcion,
          stock: producto.stock,
        }));
        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setModalMensaje("❌ No se pudieron cargar los productos de esta categoría.");
      }
    };

    fetchProductos();
  }, [nombre]);

  const mostrarModal = (mensaje) => setModalMensaje(mensaje);
  const cerrarModal = () => setModalMensaje(null);

  const manejarAgregar = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.quantity : 0;

    if (cantidadActual < producto.stock) {
      agregarProducto(producto);
      setPopup(producto.nameProduct);
      setTimeout(() => setPopup(null), 2000);
    } else {
      mostrarModal(`⚠️ No puedes agregar más de ${producto.stock} unidades de ${producto.nameProduct}`);
    }
  };

  return (
    <div className="categoria-seccion">
      <div className="centrar-titulo">
        {nombre && <h2 className="categoria-titulo">{nombre}</h2>}
      </div>

      <div className="categoria-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-tarjeta">
            <Link to={`/producto/${producto.id}`}>
              <img 
                src={producto.image}
                alt={producto.nameProduct}
                className="producto-imagen"
              />
            </Link>

            <div className="producto-info">
              <Link to={`/producto/${producto.id}`} className="link-producto">
                <p className="producto-nombre">{producto.nameProduct}</p>
              </Link>
              <p className="producto-precio">${producto.price.toLocaleString()}</p>
              <p className="producto-stock">Disponibles: {producto.stock}</p>

              <div className="acomodar-corazon-agregar">
                <button
                  className="agregar"
                  onClick={() => manejarAgregar(producto)}
                  disabled={producto.stock === 0}
                >
                  {producto.stock === 0 ? "Agotado" : "Añadir"}
                </button>

                <Corazon productoId={producto.id} esFavorito={esFavorito(producto.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup de agregado al carrito */}
      {popup && <div className="popup-mini">✅ {popup} añadido al carrito</div>}

      {/* Modal */}
      {modalMensaje && (
        <div className="modal-fondo" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <img src={campana} alt="alerta" width="20px" />
            <p>{modalMensaje}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button className="boton-moderno" onClick={cerrarModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categoria;
