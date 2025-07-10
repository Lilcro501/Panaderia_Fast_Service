// src/components/ComponenteProductos.jsx

import React from 'react';
//importo la base de datos 
import productCategories from '../Data/data';
// importacion de componentes
import Categoria from './Categoria';
import Categorias from "./Categorias"


export default function ComponenteProductos({ nombreCategoria }) {
  const productos = productCategories[nombreCategoria?.toLowerCase()];

  if (!productos) {
    return <p>Categoría no encontrada</p>;
  }

  return (
    <>
    <div>
      <Categorias/>
    </div>
    <br />
    <br />

    <div>
      <Categoria nombre={nombreCategoria} productos={productos} />
    </div>
    
    </>
  );
}
