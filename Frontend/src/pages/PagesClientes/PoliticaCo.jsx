
import React from 'react';
import '../../assets/styles/Legalidades.css';

export default function PoliticaCo() {

    return (
    <section className='ContenedorContenido'>
        <h1 className='Titulo'>Políticas de cookies</h1>

        <div className='ContenedorInfo'>
            <h2 className='Subtitulo'>Introducción</h2>
            <div className='ContenedorParrafo'>
                <p className='Parrafo'>
                    Estas cookies le permiten a la panadería La Orquídea facilitar el uso y navegación, 
                    garantizar el acceso a determinadas funcionalidades y adicionalmente, nos ayudan a mejorar 
                    la calidad del sitio web de acuerdo con los hábitos y estilos de navegación de nuestros usuarios.
                </p>
            </div>
            <br/>

            <h2 className='Subtitulo'>1. ¿Qué son las Cookies y por qué las usamos?</h2>
            <div className='ContenedorParrafo'>
                <p className='Parrafo'>
                    Las cookies son pequeños archivos de texto que las aplicaciones o 
                    los sitios web que visita colocan en su ordenador. 
                    Las cookies se usan para ayudarnos a mejorar su experiencia cuando usa nuestros 
                    sitios web, por ejemplo, guardando su ajuste de idioma preferido para la próxima vez que nos visite.
                </p>
            </div>
            <br/>

            <h2 className='Subtitulo'>2. La información que recabamos de las cookies nos permite:</h2>
            <div className='ContenedorParrafo'>
                <ul className='Circulo'>
                    <li>
                        Adecuar nuestros sitios web a sus necesidades personales
                    </li>

                    <li>
                        Recordar las notificaciones que se le han mostrado, de forma que no se le muestren de nuevo
                    </li>

                    <li>
                        Hacer mejoras y actualizaciones en nuestros sitios web basadas en la forma en la que usted quiere utilizarlas
                    </li>
                </ul>
            </div>
            <br/>

            <h2 className='Subtitulo'>3. ¿Qué tipo de Cookies usamos?</h2>
            <div className='ContenedorParrafo'>
                <p className='Parrafo'>
                    Usamos las siguientes categorías de cookies:
                </p>

                <ul className='Letras'>
                    <li>
                        <strong>Cookies técnicas o funcionales</strong>
                        <br/>
                        Algunas cookies aseguran que ciertas partes de la web funcionen correctamente 
                        y que tus preferencias de usuario sigan recordándose. 
                        Al colocar cookies funcionales, te facilitamos la visita a nuestra web. 
                        De esta manera, no necesitas introducir repetidamente la misma información 
                        cuando visitas nuestra web y, por ejemplo, los artículos permanecen en tu cesta 
                        de la compra hasta que hayas pagado.
                    </li>

                    <li>
                        <strong>Cookies analíticas</strong>
                        Usamos cookies analíticas para optimizar la experiencia en el sitio web para nuestros 
                        usuarios. Con estas cookies analíticas obtenemos conocimientos del uso de nuestra web.
                    </li>

                    <li>
                        <strong>Cookies de marketing/seguimiento</strong>
                        Las cookies de marketing/seguimiento son cookies, o cualquier otra forma de almacenamiento 
                        local, usadas para crear perfiles de usuario para mostrar publicidad o para hacer el 
                        seguimiento del usuario en esta web o en varias webs con fines de marketing similares.
                    </li>
                </ul>
            </div>
            <br/>

            <h2 className='Subtitulo'>4. ¿Cómo puede gestionar la configuración de sus cookies?</h2>
            <div className='ContenedorParrafo'>
                <p className='Parrafo'>
                    Para asegurarse la mejor experiencia posible al visitar nuestros sitios web, le recomendamos que 
                    acepte las cookies. Sin embargo, puede rechazar cada categoría de cookie (excepto las estrictamente necesarias) 
                    dirigiéndose a la parte Inferior izquierda donde le aparecerá un botón con la imagen de Cookies, 
                    al hacerle clic podrá tener visualización de las respectivas configuraciones.
                    <br/><br/>
                    Si son rechazadas se podrá seguir usando este sitio web, aunque el uso de algunos de sus 
                    servicios podrá ser limitado y por tanto la experiencia del usuario puede ser menos satisfactoria.
                </p>
            </div>
            <br/>
        </div>
    </section>
    )
}
