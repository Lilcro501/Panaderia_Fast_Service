
import React from 'react';
import Categoria from './Categoria';
import Categorias from './Categorias';

import AguaPool from '../assets/images/bebidas/agua-pool.png';
import Aguila from '../assets/images/bebidas/aguila.png';
import BigCola from '../assets/images/bebidas/bigcola.jpg';
import Electrolit from '../assets/images/bebidas/electrolit.png';
import Gatorade from '../assets/images/bebidas/gatorade.png';
import LecheAlqueria from '../assets/images/bebidas/leche-alqueria.png';
import LecheColanta from '../assets/images/bebidas/leche-colanta.png';
import Like from '../assets/images/bebidas/like.jpg';
import MaltaMini from '../assets/images/bebidas/malta-mini.jpg';
import Malta from '../assets/images/bebidas/malta.png';
import Pilsen from '../assets/images/bebidas/pilsen.png';
import Pool from '../assets/images/bebidas/agua-pool.png';
import YogurtBolsa from '../assets/images/bebidas/yogurt-bolsa.png';
import Yogurt from '../assets/images/bebidas/yogurt.jpg';


const ComponenteCategoriasBebidas = () => {
    const categorias = [
    {
        nombre: "Bebidas",
        productos: [
        { imagen: AguaPool, nombre: 'Agua Pool', precio: 1500 },
        { imagen: Aguila, nombre: 'Cerveza águila', precio: 5000 },
        { imagen: BigCola, nombre: 'v', precio: 4500 },
        { imagen: Electrolit, nombre: 'Electrolit', precio: 5000 },
        { imagen: Gatorade, nombre: 'Gatorade', precio: 4500 },
        { imagen: LecheAlqueria, nombre: 'Bolsa de leche alqueria', precio: 5000 },
        { imagen: LecheColanta, nombre: 'Bolsa de leche colanta', precio: 4500 },
        { imagen: Like, nombre: 'Like', precio: 5000 },
        { imagen: MaltaMini, nombre: 'Pony malta mini', precio: 4500 },
        { imagen: Malta, nombre: 'Pony malta', precio: 5000 },
        { imagen: Pilsen, nombre: 'Cerveza pilsen', precio: 5000 },
        { imagen: Pool, nombre: 'Pool', precio: 4500 },
        { imagen: YogurtBolsa, nombre: 'Yogurt en bolsa', precio: 4500 },
        { imagen: Yogurt, nombre: 'Yogurt', precio: 4500 },
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

export default ComponenteCategoriasBebidas;
