import React from "react";
import "../assets/styles/ProductCard.css";

/**
 * Componente reutilizable ProductCard

 * Recibe props:
  @param {string} id - ID único del producto
 * @param {string} image - URL de la imagen
 * @param {string} description - Descripción
 * @param {boolean} active - Si está activo
 * @param {function} onEditProduct - Abre modal de editar producto
 * @param {function} onEditComments - Abre modal de editar comentarios
 * @param {function} onToggleActive - Cambia activo/inactivo
 */
const ProductCard = ({
  id,
  image,
  name,
  description,
  active,
  onEditProduct,
  onEditComments,
  onToggleActive,
}) => {
  return (
    <div className="product-card">
      {/* Imagen del producto */}
      <img src={image} alt="Producto" className="product-image" />

      {/* nombre del producto */}
      <h3 className="product-name">{name}</h3>

      {/* Descripción */}
      <p className="product-description">{description}</p>

      {/* Fila de íconos arriba */}
      <div className="icons-row">
        {/* Botón de comentario */}
        <button onClick={() => onEditComments(id)} className="icon-btn">
          <i className="fa fa-comment"></i>
        </button>

        {/* Botón de editar comentarios */}
        <button onClick={() => onEditComments(id)} className="icon-btn">
          <i className="fa fa-pencil"></i>
        </button>
      </div>

      {/* Fila de switch y botón de editar */}
      <div className="icons-row">
        {/* Switch de activado/desactivado */}
        <label className="switch">
          <input
            type="checkbox"
            checked={active}
            // llamas la función con el nuevo estado invertido
            onChange={() => onToggleActive(id, !active)}
          />
          <span className="slider round"></span>
        </label>

        {/* Botón de editar contenido del producto */}
        <button
          onClick={() => onEditProduct(id)}
          className="edit-btn-bottom"
        >
          <i className="fa fa-pencil"></i>
        </button>
      </div>
    </div>
  );
};;

export default ProductCard;
