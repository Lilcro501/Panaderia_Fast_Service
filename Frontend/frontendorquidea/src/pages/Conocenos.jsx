import React from 'react';
import '../assets/styles/Conocenos.css';

import VitrinaPanes from '../assets/icons/vitrina_panes.jpg';
import VitrinaGalletas from '../assets/icons/vitrina_galletas.jpg';
import Mostrador from '../assets/icons/mostrador.jpg';
import Location from '../assets/icons/location.png';

export default function Conocenos() {
    return (
    <section className='AcercaDe'>
        <div className="info">
            <h1 className='SobreNosotros'>Sobre nosotros</h1>

            <div className='ContenedorMision'>
                <br/>
                <p className='PMision'>
                    <h2 className='Mision'>Misión</h2> 
                    Ofrecer productos frescos y deliciosos, elaborados con ingredientes de alta calidad.
                    Nos comprometemos a brindar un servicio excepcional y crear experiencias memorables
                    para nuestros clientes.
                </p>
                <img className="VitrinaPanes" src={VitrinaPanes} alt="Vitrina de panes" />
            </div>

            <br/><br/>
                
            <div className='ContenedorVision'>
                <img className='Mostrador' src={Mostrador} alt="Mostrador" />
                <p className='PVision'>
                    <h2 className='Vision'>Visión</h2>
                    Destacarnos por nuestros productos de calidad y atención al cliente. Queremos ser el
                    lugar preferido para que puedas disfrutar de momentos especiales, donde cada visita
                    sea una experiencia gratificante y cada producto sea una expresión de nuestra dedicación.
                </p>
            </div>

            <br/><br/>
            <div className='ContenedorPagoEntrega'>

            <span className='PPagoEntrega'>
                <h2 className='PagoEntrega'>Formas de entrega</h2>
                <h3>Métodos de pago</h3>
                <li className='PPagoEntrega'> Manejamos pagos en efectivo o por QR.</li>

                <br/>

                <h3>Formas de entrega</h3>
                <li className='PPagoEntrega'>Puedes realizar tus pedidos y recogerlos en la panadería o que lleguen directamente
                    a la puerta de tu casa. </li> 
            </span>
            <img className="VitrinaGalletas" src={VitrinaGalletas} alt="Galletas en vitrina" />
            </div>

            
            <div className='ContenedorLocacion'>
            <img className="Location" src={Location} alt="Ubicación" />
            <p className='PLocation'>
                <h2 className='Locacion'>Horarios de atención</h2>
                Inicio de servicio: 5:00 AM <br />
                Cierre de servicio: 11:00 PM
            </p>
            </div>
        </div>
    </section>
    );
}
