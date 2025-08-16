
import React from 'react';
import '../assets/styles/Conocenos.css';

import VitrinaPanes from '../assets//icons/vitrina_panes.jpg'
import VitrinaGalletas from '../assets/icons/vitrina_galletas.jpg';
import Mostrador from '../assets/icons/mostrador.jpg';

export default function Conocenos() {
    return (
    <section className='AcercaDe'>
        <div className="info">
            <h1 className='SobreNosotros'>Sobre nosotros</h1>

            <p className='PLocation'>
                <h2 className='Locacion'>Horarios de atención</h2>
                Abrímos todos los días a partir las 5:00 AM hasta las 11:00 PM
                <br/>
                Cl. 34, La Gabriela, Bello, Antioquia
            </p>
            
            <div className='ContenedorMision'>
                <p className='PMision'>
                    <h2 className='Mision'>Misión</h2> 
                    Ofrecer productos frescos y deliciosos, elaborados con ingredientes de alta calidad.
                    Nos comprometemos a brindar un servicio excepcional y crear experiencias memorables
                    para nuestros clientes.
                </p>
                <img className="VitrinaPanes" src={VitrinaPanes} alt="Vitrina de panes" />
            </div>
            
            <div className='ContenedorVision'>
                <img className='Mostrador' src={Mostrador} alt="Mostrador" />
                <p className='PVision'>
                    <h2 className='Vision'>Visión</h2>
                    Destacarnos por nuestros productos de calidad y atención al cliente. Queremos ser el
                    lugar preferido para que puedas disfrutar de momentos especiales, donde cada visita
                    sea una experiencia gratificante y cada producto sea una expresión de nuestra dedicación.
                </p>
            </div>

            <div className='ContenedorPagoEntrega'>

            <div className='PPagoEntrega'>
                <h2 className='PagoEntrega'>Métodos de pago</h2>
                <p className='PagoEntrega'> Manejamos pagos en efectivo o por QR.</p>
                <h2 className='PagoEntrega'>Formas de entrega</h2>
                <p className='PagoEntrega'>Puedes realizar tus pedidos y recogerlos en la panadería o que lleguen directamente a la puerta de tu casa. </p> 
            </div>
            <img className="VitrinaGalletas" src={VitrinaGalletas} alt="Galletas en vitrina" />
            </div>
            
        </div>
    </section>
    );
}
