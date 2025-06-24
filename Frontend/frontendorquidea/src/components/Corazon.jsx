import "../assets/styles/Corazon.css"
import React, { useState } from 'react';

export default function HeartButton() {
  const [activo, setActivo] = useState(false);

  const toggleHeart = () => {
    setActivo(!activo);
  };

  return (
    <button 
      className={`heart-button ${activo ? 'activo' : ''}`}
      onClick={toggleHeart}
    >
      ❤️
    </button>
  );
}
