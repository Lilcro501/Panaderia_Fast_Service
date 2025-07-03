import React, { useState } from "react";

import "../../assets/styles/CatalogoAdmin.css"; 


import ProductCard from "../../components/ProductCard";
import EditProductModal from "../../components/EditProductModal";
import EditCommentsModal from "../../components/EditCommentsModal";

import churro from '../../assets/images/panes/churro.jpg'
import rollos from '../../assets/images/panes/rollos.jpg'

function CatalogoPage() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Pan trenza",
            description: "Deliciosa pieza de pan esponjoso",
            image: churro,
            comments: ["Muy rico", "Esponjoso", "Buen precio"],
            active: true,
        },
        {
            id: 2,
            name: "Churro",
            description: "Deliciosa pieza de pan esponjoso",
            image:rollos,
            comments: ["Me encantó", "Perfecto con café"],
            active: false,
        },

        {
            id: 3,
            name: " Churro",
            description: "Deliciosa pieza de pan esponjoso",
            image:rollos,
            comments: ["Me encantó", "Perfecto con café"],
            active: false,
        },
        
    ]);

    // Estado que controla qué producto se está editando (contenido)
    const [editingProduct, setEditingProduct] = useState(null);
    // Estado que controla qué producto se está editando (comentarios)
    const [editingComments, setEditingComments] = useState(null);

    // Cambia el estado de activado/desactivado
    const handleStatusChange = (id, newStatus) => {
        const updated = products.map((p) =>
            p.id === id ? { ...p, active: newStatus } : p
        );
        setProducts(updated);
    };

    //Abre modal de edición de contenido del producto
    const handleEditProduct = (id) => {
        const product = products.find((p) => p.id === id);
        setEditingProduct(product);
    };

    // Abre modal de edición de comentarios
    const handleEditComments = (id) => {
        const product = products.find((p) => p.id === id);
        setEditingComments(product);
    };

    // Guarda cambios del contenido del producto
    const handleSaveProduct = (updatedProduct) => {
        const updated = products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
        );
        setProducts(updated);
        setEditingProduct(null);
    };

    // Guarda cambios de los comentarios del producto
    const handleSaveComments = (updatedProduct) => {
        const updated = products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
        );
        setProducts(updated);
        setEditingComments(null);
    };

    return (
        <div className="catalogo-container">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    {...product}
                    // nombres de las props
                    // Ahora: onToggleActive, onEditProduct, onEditComments
                    onEditProduct={handleEditProduct}
                    onEditComments={handleEditComments}
                    onToggleActive={handleStatusChange}
                />
            ))}

            {/* Modal para editar el producto */}
            <EditProductModal
                isOpen={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                onSave={handleSaveProduct}
                productData={editingProduct}
            />

            {/* Modal para editar comentarios */}
            <EditCommentsModal
                isOpen={!!editingComments}
                onClose={() => setEditingComments(null)}
                onSave={handleSaveComments}
                productData={editingComments}
            />
        </div>
    );
}


export default CatalogoPage;
