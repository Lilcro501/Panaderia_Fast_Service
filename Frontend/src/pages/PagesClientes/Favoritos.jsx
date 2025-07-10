import React from 'react';
import Categoria from '../../components/Categoria';
import { useFavoritos } from '../../Context/FavoritosContext'; // 👈 importar contexto

export default function Favoritos() {
  const { favoritos } = useFavoritos(); // 👈 obtener productos favoritos del contexto

  if (favoritos.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Sin productos favoritos aún ❤️</h2>
      </div>
    );
  }

  const categorias = [
    {
      nombre: "Favoritos",
      productos: favoritos
    }
  ];

  return (
    <>
      <br />
      <br />
      <br />
      <div>
        {categorias.map((cat, i) => (
          <Categoria key={i} nombre={cat.nombre} productos={cat.productos} />
        ))}
      </div>
    </>
  );
}

