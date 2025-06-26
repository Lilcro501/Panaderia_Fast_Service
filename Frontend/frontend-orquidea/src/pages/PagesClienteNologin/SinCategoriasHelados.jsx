
import React from 'react';
import Categoria from '../../components/Categoria';

import Aloha from '../../assets/images/helados/aloha.png';
import Artesanal from '../../assets/images/helados/artesanal.png';
import Bocatto from '../../assets/images/helados/bocatto.png';
import Chococono from '../../assets/images/helados/chococono.png';
import Dracula from '../../assets/images/helados/dracula.png';
import NubesColores from '../../assets/images/helados/nubes-colores.png';
import PaletaLimon from '../../assets/images/helados/paleta-limon.png';
import Polette from '../../assets/images/helados/polette.png';


export default function CategoriasHelados() {
    const categorias = [
    {
        nombre: "Helados",
        productos: [
        { imagen: Aloha, nombre: 'Aloha', precio: 5000 },
        { imagen: Artesanal, nombre: 'Artesanal', precio: 2500 },
        { imagen: Bocatto, nombre: 'Bocatto', precio: 5500 },
        { imagen: Chococono, nombre: 'Chococono', precio: 3500},
        { imagen: Dracula, nombre: 'Paleta drácula', precio: 2800},
        { imagen: NubesColores, nombre: 'Nube de colores', precio: 3000},
        { imagen: PaletaLimon, nombre: 'Paleta de limón', precio: 2000},
        { imagen: Polette, nombre: 'Polette', precio: 4800}
        ]
    }
    ];
    
    return (
    <div>
        {categorias.map((cat, i) => (
        <Categoria key={i} nombre={cat.nombre} productos={cat.productos} />
        ))}
    </div>
    );
};


