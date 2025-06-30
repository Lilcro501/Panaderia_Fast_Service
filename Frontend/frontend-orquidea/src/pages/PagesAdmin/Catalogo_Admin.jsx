import React, { useState } from "react";
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
            name: "Pan trenza",
            description: "Deliciosa pieza de pan esponjoso",
            image:rollos,
            comments: ["Me encantó", "Perfecto con café"],
            active: false,
        },
    ]);

    const [editingProduct, setEditingProduct] = useState(null);
    const [editingComments, setEditingComments] = useState(null);

    const handleStatusChange = (id, newStatus) => {
        const updated = products.map((p) =>
            p.id === id ? { ...p, active: newStatus } : p
        );
        setProducts(updated);
        console.log("Nuevo estado producto:", updated);
    };

    const handleEditProduct = (id) => {
        const product = products.find((p) => p.id === id);
        setEditingProduct(product);
    };

    const handleEditComments = (id) => {
        const product = products.find((p) => p.id === id);
        setEditingComments(product);
    };

    const handleSaveProduct = (updatedProduct) => {
        const updated = products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
        );
        setProducts(updated);
        setEditingProduct(null);
    };

    const handleSaveComments = (updatedProduct) => {
        const updated = products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
        );
        setProducts(updated);
        setEditingComments(null);
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    {...product}
                    onStatusChange={handleStatusChange}
                    onEditProduct={handleEditProduct}
                    onEditComments={handleEditComments}
                />
            ))}

            <EditProductModal
                isOpen={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                onSave={handleSaveProduct}
                productData={editingProduct}
            />

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
