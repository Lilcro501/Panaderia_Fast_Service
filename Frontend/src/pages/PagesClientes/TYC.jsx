import React, { useState } from 'react';
import '../../assets/styles/Legalidades.css';

export default function TYC() {
    const [mostrarTodo, setMostrarTodo] = useState(false);

    // Definiendo cada sección como un objeto
    const secciones = [
        {
            titulo: "1. Manejo de la cuenta (sobre los datos personales)",
            contenido: `El registro de los datos personales del usuario (cliente) de la página web 
                es requisito necesario para la compra o adquisición de los productos ofrecidos 
                en nuestra plataforma virtual (https://LaOrquidea.com). 
                El usuario deberá completar el formulario, bajo el cual se solicitará únicamente 
                los siguientes datos: nombre completo, número telefónico, correo electrónico, 
                dirección de domicilio (únicamente para efectos de delivery o despacho a domicilio), 
                además de la creación de una contraseña. Se deberá manifestar como conocidos los 
                “Términos y Condiciones” al momento de crear al usuario.`
        },
        {
            titulo: "2. Procedimiento de servicio online",
            contenido: `La empresa informará los productos ofrecidos por medio de este sitio web de manera clara 
                y fácil junto con los pasos a seguir para la compra de éstos. 
                El usuario será informado en el sitio web sobre la validación de su pedido, 
                con el respectivo proceso de este. La validación del pedido pasará por un proceso de 
                validación de datos, método de pago, forma de entrega, validación de stocks de productos 
                disponibles y fecha y hora de despacho a domicilio para así poder cerrar la solicitud del 
                pedido y poder enviarle al usuario vía correo electrónico el comprobante de pago 
                de la orden del producto de compra. Por último, el producto, debidamente empaquetado, 
                se le envía al domicilio indicado por cliente.`
        },
        {
            titulo: "3. Condiciones de envío",
            contenido: `Para utilizar nuestro servicio de entrega, 
                los usuarios deberán ingresar la dirección de domicilio donde se enviará su pedido. 
                Después de realizar este paso, la panadería La Orquídea aprueba el pedido 
                y se podrá continuar con el proceso de compra. Sin embargo, existe una limitación, 
                esta limitación esta ligada a la cobertura para despachos.
                
                Cobertura: El servicio de pedidos online verifica que la 
                dirección ingresada se encuentre en una zona de entrega donde esté 
                disponible el servicio de entrega. Si su dirección no coincide con nuestra área de entrega, 
                se le notificará y enviará a su correo electrónico la información requerida 
                indicando las zonas en las cuales si se hace entrega.
                
                Una vez aceptado y validado el pedido, un driver (motorizado o chofer) 
                se acercará a la dirección de entrega brindada y en el rango de horario acordado. 
                Al llegar, se pondrá en contacto al número telefónico registrado. 
                Es importante estar atentos a nuestra comunicación a fin de garantizar la entrega. 
                El driver tendrá un tiempo de espera de máximo de diez (10) minutos. 
                En caso de no tener respuesta en los próximos diez (10) minutos, el driver retornará 
                con el pedido a la sede de la cual se atendió el mismo, dando el servicio de entrega 
                por concluido. Los pedidos que no fueron recibidos en el tiempo acordado, 
                no darán lugar a reclamo o devolución alguna. Para coordinar un nuevo envío 
                (con un nuevo costo de entrega) puede comunicarse a nuestros diferentes canales 
                de atención (página web y/o WhatsApp).`
        },
        {
            titulo: "4. Disponibilidad de productos (stocks)",
            contenido: `Ciertos productos de la panadería La Orquídea podrán estar 
                disponibles exclusivamente en nuestra sede física. 
                Estos productos pueden contar con un stock limitado en 
                el sitio web de la panadería La Orquídea.
                
                Cuando el usuario realice un pedido en la página web el sitio 
                de la panadería La Orquídea le enviará un correo electrónico confirmando 
                la recepción de su pedido. En caso de no haber stock de alguno 
                de los productos comprados, el sitio le informará de dichos artículos y, 
                en caso de ser necesario, realizará la devolución del dinero correspondiente 
                al producto al mismo medio de pago utilizado para la compra.`
        },
        {
            titulo: "5. Horarios de atención y de entrega",
            contenido: `Los plazos de entrega pueden variar por diversos motivos, 
                incluidas nuevas regulaciones gubernamentales, cierres de tiendas, 
                días festivos, etc. Esto le será comunicado al cliente cuando se ponga 
                en contacto con nosotros para realizar su pedido y por nuestros canales digitales.
                
                Las entregas se clasifican en pedidos “recibir hoy” y en “pedidos programados”.
                
                “Recibir hoy”: El horario de atención es de 05:00AM a 11:00PM. 
                Los plazos de entrega se inician cuando se ha validado correctamente 
                la solicitud de compra y produce la confirmación vía correo electrónico 
                proporcionado por el cliente en el formulario, siempre sujeto al stock de productos 
                disponible en la respectiva panadería.
                
                “Pedidos programados”: Los pedidos programados serán entregados en el tiempo 
                acordado luego de haberse validado correctamente la solicitud de compra y 
                su confirmación vía correo electrónico.
                
                En cualquiera de las dos (2) modalidades, es responsabilidad 
                del cliente recibir o recoger los pedidos.`
        },
        {
            titulo: "6. Condiciones de cambios y/o cancelación",
            contenido: `Nuestros productos en su mayoría son frescos (es decir, los elaboramos en el día).
                En caso de que necesite realizar un cambio y/o cancelación, deberá comunicarse 
                directamente por medio del sitio con el trabajador que aceptó su pedido o 
                vía WhatsApp +57 358 927 1058.`
        },
        {
            titulo: "7. Método y comprobantes de pago",
            contenido: `Los productos ofrecidos en esta plataforma podrán 
                ser pagados bajo la modalidad detallada a continuación:

                Pago en sitio web: Se acepta transacción mediante código QR o contra entrega. 
                En caso de alguna anulación o devolución, se dará inicio al reembolso 
                del dinero por el monto total de dicha compra por este mismo medio.

                En la panadería: Podrá realizarse el pedido y posteriormente ser pagado 
                en la panadería La Orquídea, allá mismo se le hará entre del comprobante de pago.

                El cliente al recibir el pedido y cancelarlo, deberá verificar su comprobante 
                de pago inmediatamente para corroborar que todo esté en orden, 
                posteriormente al recibimiento del pedido no podrá realizar cambio o modificación alguna.
                
                Los comprobantes de pago que emite la empresa son facturas, 
                conforme a la normativa respectiva de comprobantes de pago, 
                los mismos que podrán ser requeridos por el usuario del servicio de pedidos online.`
        },
        {
            titulo: "8. Propiedad intelectual",
            contenido: `Las imágenes de los productos, local y del personal de la panadería 
                La Orquídea en la plataforma web son referenciales. Asimismo, 
                el usuario se compromete a respetar la integridad y derecho de 
                la propiedad intelectual de los elementos 
                (diseños, fotos, códigos, material comercial, entre otros) de la página web. 
                Para tener un mejor detalle de las características del producto, se recomienda, 
                leer la descripción de éstos ingresando o haciendo clic a los hipervínculos 
                o ventanas respectivas.`
        },
        {
            titulo: "9. Consultas, sugerencias y reclamos",
            contenido: `En nuestra panadería siempre tenemos presente la opinión de nuestros clientes. 
                Por lo que se tiene habilitada la línea de WhatsApp con número +57 358 927 1058 
                para que el usuario pueda ser escuchado y/o leído y podamos apoyarlo de la mejor manera, 
                también se encuentra disponible nuestro correo electrónico fservice28.076@gmail.com 
                o incluso enviar un reclamo más detallado en nuestro apartado de "Libro de reclamaciones" 
                en el sitio web, ubicado en la parte final de este. 
                El horario de atención de estos canales es de 5:00AM a 11:00PM. 
                El período de respuesta a la consulta, sugerencia y/o reclamo variará dependiendo la 
                demanda que se tenga, no excediéndose de un plazo mayor a 2 días hábiles.`
        }
    ];

    // Definiendo cuántas secciones mostrar inicialmente
    const limiteInicial = 3;
    const seccionesAMostrar = mostrarTodo ? secciones : secciones.slice(0, limiteInicial);

    return (
        <section className='ContenedorContenido'> 
            <h1 className='Titulo'>Términos y Condiciones de los pedidos a efectuar por la página web de la panadería La Orquídea</h1>
            
            <div className='ContenedorInfo'>
                {seccionesAMostrar.map((sec, index) => (
                    <div key={index}>
                        <h2 className='Subtitulo'>{sec.titulo}</h2>
                        <div className='ContenedorParrafo'>
                            <p className='Parrafo'>{sec.contenido}</p>
                        </div>
                    </div>
                ))}

                {!mostrarTodo && secciones.length > limiteInicial && (
                    <button 
                        onClick={() => setMostrarTodo(true)} 
                        style={{
                            backgroundColor: '#4a3939',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Ver más
                    </button>
                )}
            </div>
        </section>
    );
}
