import React from 'react';
import Categoria from '../../components/Categoria';
import PanTrenza from '../../assets/images/panes/pan trenza.jpg';
import Almojabana from '../../assets/images/panes/almojabana.jpg';
import Churro from '../../assets/images/panes/churro.jpg';
import GalletaChoco from '../../assets/images/panes/galleta-chips-choco.jpg';
import GalletaMermelada from '../../assets/images/panes/galleta-mermelada.jpg';
import Lengua from '../../assets/images/panes/lengua.jpg';
import Magdalena from '../../assets/images/panes/magdalena.jpg';
import PanAgridulce from '../../assets/images/panes/pan agridulce.jpg';
import PanChicharron from '../../assets/images/panes/pan-chicharron.jpg';
import Pera from '../../assets/images/panes/pera.jpg';
import TortaPescado from '../../assets/images/fritos/torta-pescado.png';
import Pilsen from '../../assets/images/bebidas/pilsen.png';
import Pool from '../../assets/images/bebidas/agua-pool.png';
import YogurtBolsa from '../../assets/images/bebidas/yogurt-bolsa.png';
import Yogurt from '../../assets/images/bebidas/yogurt.jpg'
import Categorias from '../../components/Categorias';


export default function Favoritos() {
    const categorias = [
    {
        nombre: "Favoritos",
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
        { imagen: TortaPescado, nombre: 'Torta de pescado', precio: 4500 },
        { imagen: Pilsen, nombre: 'Cerveza pilsen', precio: 5000 },
        { imagen: Pool, nombre: 'Pool', precio: 4500 },
        { imagen: YogurtBolsa, nombre: 'Yogurt en bolsa', precio: 4500 },
        { imagen: Yogurt, nombre: 'Yogurt', precio: 4500 },
        
        ]
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
};

