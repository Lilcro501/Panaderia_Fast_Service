import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/CarruselIncremento.css";
import { useCarrito } from "../Context/CarritoContext";
import { useRol } from "../Context/RolContext";
import campana from "../assets/images/campana.png";
import "../assets/styles/Global.css";

export default function CarruselCatalogo() {
  const contenedorRef = useRef(null);
  const { carrito, agregarProducto, quitarProducto, eliminarProducto } = useCarrito();
  const { rol } = useRol();
  const [productos, setProductos] = useState([]);
  const [modalMensaje, setModalMensaje] = useState(null);

  const navigate = useNavigate();

  const idsProductos = ["78", "80", "82", "83", "84", "85", "86", "87", "91", "90", "105"];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const peticiones = idsProductos.map((id) =>
          axios.get(`http://localhost:8000/api/carrito/producto/${id}/`).then((res) => res.data)
        );
        const resultados = await Promise.all(peticiones);

        const productosFormateados = resultados.map((p) => ({
          id: Number(p.id_producto ?? p.id),
          nameProduct: p.nombre,
          price: p.precio,
          description: p.descripcion,
          stock: p.stock,
          image: p.imagen, // <-- Aquí la diferencia principal
        }));

        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const obtenerCantidad = (id) => {
    const item = carrito.find((p) => p.id === id);
    return item ? item.quantity : 0;
  };

  const scroll = (offset) => {
    if (contenedorRef.current) {
      contenedorRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const mostrarModal = (mensaje) => setModalMensaje(mensaje);
  const cerrarModal = () => setModalMensaje(null);

  const cambiarCantidadManual = (e, producto) => {
    if (rol !== "cliente") {
      mostrarModal("❗ Solo los clientes pueden modificar la cantidad de productos.");
      return;
    }

    const nuevaCantidad = Math.max(0, parseInt(e.target.value) || 0);
    const actual = obtenerCantidad(producto.id);

    if (nuevaCantidad > producto.stock) {
      mostrarModal(`⚠️ Solo hay ${producto.stock} unidades disponibles de ${producto.nameProduct}`);
      return;
    }

    if (nuevaCantidad > actual) {
      for (let i = actual; i < nuevaCantidad; i++) agregarProducto(producto);
    } else if (nuevaCantidad < actual) {
      for (let i = actual; i > nuevaCantidad; i--) quitarProducto(producto.id);
    }

    if (nuevaCantidad === 0) eliminarProducto(producto.id);
  };

  const manejarAgregar = async (producto) => {
    if (rol !== "cliente") {
      mostrarModal("❗ Solo los clientes pueden agregar productos al carrito.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/carrito/producto/${producto.id}/`);
      const stockActual = res.data.stock;
      const cantidadActual = obtenerCantidad(producto.id);

      if (cantidadActual < stockActual) {
        agregarProducto(producto);
      } else {
        mostrarModal(`No puedes agregar más de ${stockActual} unidades de ${producto.nameProduct}`);
      }
    } catch (error) {
      console.error("Error al verificar stock:", error);
      mostrarModal("❌ No se pudo verificar el stock del producto.");
    }
  };

  const manejarDetalleProducto = (id) => {
    if (rol !== "cliente") {
      mostrarModal("❗ Debes iniciar sesión como cliente para ver el detalle del producto.");
      return;
    }
    navigate(`/producto/${id}`);
  };

  return (
    <section className="carrusel-centralizado">
      <button className="boton-carrusel" onClick={() => scroll(-300)}>&#10094;</button>

      <div className="catalogo-deslizar" ref={contenedorRef}>
        {productos.map((prod) => {
          const cantidad = obtenerCantidad(prod.id);

          return (
            <div className="recuadro-catalogo" key={prod.id}>
              <div
                className="enlace-producto"
                onClick={() => manejarDetalleProducto(prod.id)}
                style={{ cursor: "pointer" }}
              >
                <img className="carrusel-catalogo" src={prod.image} alt={prod.nameProduct} />
                <div className="P">
                  {prod.nameProduct}
                  <br />${prod.price.toLocaleString()}
                </div>
              </div>

              <section className="number-input">
                <button
                  className="disminucion"
                  onClick={() => {
                    if (rol === "cliente") quitarProducto(prod.id);
                    else mostrarModal("❗ Solo los clientes pueden modificar la cantidad de productos.");
                  }}
                  disabled={cantidad === 0}
                >−</button>

                <input
                  type="number"
                  min="0"
                  value={cantidad}
                  onChange={(e) => cambiarCantidadManual(e, prod)}
                />

                <button className="incremento" onClick={() => manejarAgregar(prod)}>+</button>
              </section>
            </div>
          );
        })}
      </div>

      <button className="boton-carrusel" onClick={() => scroll(300)}>&#10095;</button>

      {modalMensaje && (
        <div className="modal-fondo" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <img src={campana} alt="alerta" width="20px" /><br /><br />
            <p>{modalMensaje}</p><br /><br />
            <button className="boton-moderno" onClick={cerrarModal}>Cerrar</button>
            {rol !== "cliente" && (
              <button
                className="boton-moderno"
                style={{ marginLeft: "10px", backgroundColor: "#4CAF50" }}
                onClick={() => navigate("/AccedeAqui")}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
