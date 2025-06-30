import React from "react";
import "../assets/styles/ProductCard.css";

const ProductCard = ({
  id,
  image,
  description,
  active,
  onEditProduct,
  onEditComments,
  onToggleActive,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt="Producto" className="product-image" />
      <p className="product-description">{description}</p>
      <div className="icons-row">
        <button onClick={() => onEditComments(id)} className="icon-btn">
          <i className="fa fa-comment"></i>
        </button>

        <button onClick={() => onEditComments(id)} className="icon-btn">
          <i className="fa fa-pencil"></i>
        </button>
      </div>

      <div className="icons-row">
        <label className="switch">
          <input
            type="checkbox"
            checked={active}
            onChange={() => onToggleActive(id, !active)}
          />
          <span className="slider round"></span>
        </label>

        <button
          onClick={() => onEditProduct(id)}
          className="edit-btn-bottom"
        >
          <i className="fa fa-pencil"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
