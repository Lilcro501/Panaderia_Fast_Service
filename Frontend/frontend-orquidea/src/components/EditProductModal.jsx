import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../assets/styles/EditProductModal.css"; // tus estilos idénticos al modal de imagen 2

/**
 * Modal para editar información de producto
 *
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onSave - Función para guardar cambios
 * @param {object} productData - Datos del producto a editar
 */
const EditProductModal = ({ isOpen, onClose, onSave, productData }) => {
    // Estados locales del modal
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // Cargar datos iniciales del producto al abrir modal
    useEffect(() => {
        if (productData) {
            setName(productData.name || "");
            setDescription(productData.description || "");
        }
    }, [productData]);

    const handleSave = () => {
        onSave({
            ...productData,
            name,
            description,
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="edit-modal"
            overlayClassName="edit-modal-overlay"
        >
            <h2>Editar información del producto</h2>
            <img
                src={productData?.image}
                alt="Producto"
                className="modal-product-image"
            />
            <div className="modal-form">
                <div>
                    <label>Nombre producto</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descripción</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            <div className="modal-buttons">
                <button onClick={handleSave} className="modal-btn">
                    Agregar
                </button>
                <button onClick={onClose} className="modal-btn cancel">
                    Cancelar
                </button>
            </div>
        </Modal>
    );
};

export default EditProductModal;
