
import React from 'react';
import Categoria from '../components/Categoria';

import Buñuelo from '../assets/images/fritos/buñuelo.png';
import Pollo from '../assets/images/fritos/pollo.png';
import TortaPescado from '../assets/images/fritos/torta-pescado.png';

export default function CategoriasFritos() {
    const categorias = [
    {
        nombre: "Fritos",
        productos: [
        { imagen: Buñuelo, nombre: 'Buñuelo', precio: 1500 },
        { imagen: Pollo, nombre: 'Pollo', precio: 5000 },
        { imagen: TortaPescado, nombre: 'Torta de pescado', precio: 4500 },
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

