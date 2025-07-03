import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../assets/styles/EditCommentsModal.css"; // tus estilos idénticos al modal de imagen 3

/**
 * Modal para editar comentarios del producto
 *
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onSave - Función para guardar cambios
 * @param {object} productData - Datos del producto con comentarios
 */
const EditCommentsModal = ({
    isOpen,
    onClose,
    onSave,
    productData,
}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (productData?.comments) {
            setComments(productData.comments);
        }
    }, [productData]);

    const handleCommentChange = (index, value) => {
        const updated = [...comments];
        updated[index] = value;
        setComments(updated);
    };

    const handleDeleteComment = (index) => {
        const updated = [...comments];
        updated.splice(index, 1);
        setComments(updated);
    };

    const handleSave = () => {
        onSave({
            ...productData,
            comments,
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="edit-comments-modal"
            overlayClassName="edit-comments-modal-overlay"
        >
            <h2>Editar comentarios del producto</h2>
            <img
                src={productData?.image}
                alt="Producto"
                className="modal-product-image"
            />
            <div className="comments-list">
                {comments.map((comment, idx) => (
                    <div key={idx} className="comment-row">
                        <i className="fa fa-user"></i>
                        <input
                            value={comment}
                            onChange={(e) =>
                                handleCommentChange(idx, e.target.value)
                            }
                        />
                        <button onClick={() => handleDeleteComment(idx)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
            <div className="modal-buttons">
                <button onClick={handleSave} className="modal-btn">
                    Guardar
                </button>
                <button onClick={onClose} className="modal-btn cancel">
                    Cancelar
                </button>
            </div>
        </Modal>
    );
};

export default EditCommentsModal;
