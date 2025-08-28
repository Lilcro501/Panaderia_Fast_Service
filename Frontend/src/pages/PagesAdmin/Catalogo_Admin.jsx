import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../../assets/styles/CatalogoAdmin.css";
import ProductCard from "../../components/ProductCard";
import EditCommentsModal from "../../components/EditCommentsModal";
import CategoriasAdmin from "../../components/CategoriasAdmin";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function CatalogoPage() {
    const [products, setProducts] = useState([]);
    const [editingComments, setEditingComments] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;
    const [totalPaginas, setTotalPaginas] = useState(1);

    const query = useQuery();
    const categoriaSeleccionada = query.get("categoria");

    const API_URL = import.meta.env.VITE_API_URL; // <-- Variable de entorno

    const obtenerProductos = () => {
        const url = categoriaSeleccionada
            ? `${API_URL}/api/administrador/productos/?categoria=${categoriaSeleccionada}`
            : `${API_URL}/api/administrador/productos/`;

        axios.get(url)
            .then(response => {
                const allProducts = response.data;
                setTotalPaginas(Math.ceil(allProducts.length / productosPorPagina));

                const indiceUltimo = paginaActual * productosPorPagina;
                const indicePrimero = indiceUltimo - productosPorPagina;
                const productosPaginados = allProducts.slice(indicePrimero, indiceUltimo);

                setProducts(productosPaginados);
            })
            .catch(error => console.error("Error al obtener productos:", error));
    };

    useEffect(() => {
        obtenerProductos();
    }, [categoriaSeleccionada, paginaActual, API_URL]);

    const handleEditComments = (id_producto) => {
        const product = products.find(p => p.id_producto === id_producto);
        setEditingComments(product);
    };

    const handleSaveComments = (updatedProduct) => {
        axios.patch(`${API_URL}/api/administrador/productos/${updatedProduct.id_producto}/`, {
            comments: updatedProduct.comments
        })
            .then(() => {
                const updated = products.map(p =>
                    p.id_producto === updatedProduct.id_producto ? updatedProduct : p
                );
                setProducts(updated);
            })
            .catch(err => console.error("Error guardando comentarios:", err));

        setEditingComments(null);
    };

    const cambiarPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) {
            setPaginaActual(numero);
        }
    };

    return (
        <>
            <CategoriasAdmin />
            <div className="catalogo-container">
                {products.map(product => (
                    <ProductCard
                        key={product.id_producto}
                        id={product.id_producto}
                        image={product.imagen}
                        name={product.nombre}
                        description={product.descripcion}
                        onEditComments={handleEditComments}
                        ocultarEditarProducto={true}
                    />
                ))}
            </div>

            {/* Paginación */}
            <div className="paginacion">
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                    Anterior
                </button>

                {[...Array(totalPaginas)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => cambiarPagina(index + 1)}
                        className={paginaActual === index + 1 ? 'activo' : ''}
                    >
                        {index + 1}
                    </button>
                ))}

                <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                    Siguiente
                </button>
            </div>

            <EditCommentsModal
                isOpen={!!editingComments}
                onClose={() => setEditingComments(null)}
                onSave={handleSaveComments}
                productData={editingComments}
            />
        </>
    );
}

export default CatalogoPage;
