

import React from 'react';
import Categoria from './Categoria';
import Categorias from './Categorias';


import Cheesetris from '../assets/images/mecato/cheesetris.png';
import Cheetos from '../assets/images/mecato/cheetos.png';
import Chokis from '../assets/images/mecato/chokis.png';
import Detodito from '../assets/images/mecato/detodito.png';
import Dinamita from '../assets/images/mecato/dinamita.png';
import Doritos from '../assets/images/mecato/doritos.png';
import FlamingHot from '../assets/images/mecato/flaming-hot.png';
import Margaritas from '../assets/images/mecato/margaritas.jpg';
import NatuChipsPlat from '../assets/images/mecato/natu-chips-plat.png';
import NatuChipsVerd from '../assets/images/mecato/natu-chips-verd.png';
import Pasabocas from '../assets/images/mecato/pasabocas.jpg';
import PopetasMix from '../assets/images/mecato/popetas-mixtas.png';



export default function ComponenteCategoriasMecato() {
    const categorias = [
    {
        nombre: "Mecatos",
        productos: [
        { imagen: Cheesetris, nombre: 'Cheesetris', precio: 3500 },
        { imagen: Cheetos, nombre: 'Cheetos', precio: 3800 },
        { imagen: Chokis, nombre: 'Chokis', precio: 1800 },
        { imagen: Detodito, nombre: 'Detodito', precio: 4000},
        { imagen: Dinamita, nombre: 'Dinamita', precio: 2000},
        { imagen: Doritos, nombre: 'Doritos', precio: 4000},
        { imagen: FlamingHot, nombre: 'FlamingHot', precio: 4000},
        { imagen: Margaritas, nombre: 'Margaritas', precio: 3000},
        { imagen: NatuChipsPlat, nombre: 'NatuChips platano maduro', precio: 3200},
        { imagen: NatuChipsVerd, nombre: 'NatuChips verdes', precio: 3200},
        { imagen: Pasabocas, nombre: 'Pasabocas', precio: 1200},
        { imagen: PopetasMix, nombre: 'Popetas mixtas', precio: 2500},
        ]
    }
    ];
    
    return (
    <>
    <Categorias></Categorias>

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
};
