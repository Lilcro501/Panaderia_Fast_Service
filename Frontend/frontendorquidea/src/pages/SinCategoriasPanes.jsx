
import React from 'react';
import Categoria from '../components/Categoria';

import PanTrenza from '../assets/images/panes/pan trenza.jpg';
import Almojabana from '../assets/images/panes/almojabana.jpg';
import Churro from '../assets/images/panes/churro.jpg';
import GalletaChoco from '../assets/images/panes/galleta-chips-choco.jpg';
import GalletaMermelada from '../assets/images/panes/galleta-mermelada.jpg';
import Lengua from '../assets/images/panes/lengua.jpg';
import Magdalena from '../assets/images/panes/magdalena.jpg';
import PanAgridulce from '../assets/images/panes/pan agridulce.jpg';
import PanChicharron from '../assets/images/panes/pan-chicharron.jpg';
import Pera from '../assets/images/panes/pera.jpg';
import Rollo from '../assets/images/panes/rollos.jpg';


export default function CategoriaPanes() {
    const categorias = [
    {
        nombre: "Panes",
        productos: [
        { imagen: PanTrenza, nombre: 'Pan trenza', precio: 4500 },
        { imagen: Almojabana, nombre: 'Almojábana', precio: 2500 },
        { imagen: Churro, nombre: 'Churro', precio: 2000 },
        { imagen: GalletaChoco, nombre: 'Galleta de chocolate', precio: 500},
        { imagen: GalletaMermelada, nombre: 'Galleta de mermelada', precio: 500},
        { imagen: Lengua, nombre: 'Lengua', precio: 1200},
        { imagen: Magdalena, nombre: 'Magdalena', precio: 800},
        { imagen: PanAgridulce, nombre: 'Pan agridulce', precio: 700},
        { imagen: PanChicharron, nombre: 'Pan chicharrón', precio: 1900},
        { imagen: Pera, nombre: "Pera", precio: 2700},
        { imagen: Rollo, nombre: "Rollo", precio: 3000}
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

