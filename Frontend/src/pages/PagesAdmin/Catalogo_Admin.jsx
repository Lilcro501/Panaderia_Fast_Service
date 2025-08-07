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

    const query = useQuery();
    const categoriaSeleccionada = query.get("categoria");

    const obtenerProductos = () => {
        const url = categoriaSeleccionada
            ? `http://localhost:8000/api/administrador/productos/?categoria=${categoriaSeleccionada}`
            : `http://localhost:8000/api/administrador/productos/`;

        axios.get(url)
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error al obtener productos:", error));
    };

    useEffect(() => {
        obtenerProductos();
    }, [categoriaSeleccionada]);

    const handleStatusChange = (id_producto, newStatus) => {
        axios.patch(`http://localhost:8000/api/administrador/productos/${id_producto}/`, { activo: newStatus })
            .then(() => {
                const updated = products.map(p =>
                    p.id_producto === id_producto ? { ...p, activo: newStatus } : p
                );
                setProducts(updated);
            })
            .catch(error => console.error("Error al actualizar estado:", error));
    };

    const handleEditComments = (id_producto) => {
        const product = products.find(p => p.id_producto === id_producto);
        setEditingComments(product);
    };

    const handleSaveComments = (updatedProduct) => {
        axios.patch(`http://localhost:8000/api/administrador/productos/${updatedProduct.id_producto}/`, {
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
                        active={product.activo}
                        onEditComments={handleEditComments}
                        onToggleActive={handleStatusChange}
                        ocultarEditarProducto={true}
                    />
                ))}
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
