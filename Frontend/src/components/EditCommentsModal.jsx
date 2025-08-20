import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../assets/styles/EditCommentsModal.css"; 

const EditCommentsModal = ({
    isOpen,
    onClose,
    productData,
}) => {
    const [comments, setComments] = useState([]);

    // 👉 Cargar comentarios desde el backend cuando se abra el modal
    useEffect(() => {
        const fetchComments = async () => {
            if (productData?.id_producto) {
                try {
                    const res = await axios.get(
                        `http://localhost:8000/api/administrador/valoraciones/?producto_id=${productData.id_producto}`
                    );
                    setComments(res.data);
                } catch (err) {
                    console.error("❌ Error al obtener comentarios:", err);
                }
            }
        };
        if (isOpen) fetchComments();
    }, [isOpen, productData]);

    // 👉 Eliminar un comentario
    const handleDeleteComment = async (id_valoracion) => {
        try {
            await axios.delete(`http://localhost:8000/api/administrador/valoraciones/${id_valoracion}/`);
            setComments(comments.filter(c => c.id_valoracion !== id_valoracion));
        } catch (err) {
            console.error("❌ Error al eliminar comentario:", err);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="edit-comments-modal"
            overlayClassName="edit-comments-modal-overlay"
        >
            <h2>Comentarios del producto</h2>

            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((c) => (
                        <div key={c.id_valoracion} className="comment-row">
                            <i className="fa fa-user"></i>
                            <span>{c.comentario}</span>
                            <button onClick={() => handleDeleteComment(c.id_valoracion)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios todavía.</p>
                )}
            </div>

            <div className="modal-buttons">
                <button onClick={onClose} className="modal-btn cancel">
                    Cerrar
                </button>
            </div>
        </Modal>
    );
};

export default EditCommentsModal;
