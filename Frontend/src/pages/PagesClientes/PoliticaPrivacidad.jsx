import React, { useState } from 'react';
import '../../assets/styles/Legalidades.css';

export default function PoliticaPrivacidad() {
    const [mostrarTodo, setMostrarTodo] = useState(false);

    // Definiendo las secciones como objetos
    const secciones = [
        {
            titulo: "1. ¿Para qué sirve esta Política de Privacidad?",
            contenido: (
                <>
                    <p>
                        En la panadería La Orquídea estamos comprometidos con prestarte un servicio óptimo. 
                        Además, también nos preocupa la privacidad de tu información personal.
                    </p>
                    <p>
                        Queremos que conozcas y tengas siempre el control sobre tus datos personales. 
                        Para ello, ponemos a tu disposición esta Política de Privacidad en la que puedes 
                        consultar en detalle, pero de forma fácil y transparente, las características
                        del uso que realizamos sobre tus datos personales.
                    </p>
                    <p>
                        Puedes acceder a esta Política de Privacidad en cualquier momento, 
                        ya que se encuentra a tu disposición en el apartado de la web de la panadería 
                        La Orquídea en el apartado “Conoce información legal aquí” que se encuentra en 
                        la parte inferior.
                    </p>
                </>
            )
        },
        {
            titulo: "2. ¿Quién es el responsable del tratamiento de tus Datos Personales?",
            contenido: (
                <>
                    <p>
                        Los responsables y Destinatarios del Tratamiento de tus Datos Personales somos 
                        la empresa <strong> FastService S.A.S.</strong> y la 
                        <strong>panadería La Orquídea</strong>. A continuación, puedes encontrar más información sobre nosotros:
                    
                        Según lo mencionado anteriormente, somos responsables de tus Datos Personales 
                        al momento de su uso y protección. Si deseas, puedes solicitarnos que te facilitemos 
                        los aspectos esenciales del mismo a través del Centro de Atención al cliente 
                        al número +57  358 927 1058, de lunes a domingo de 8:00 am a 6:00 pm o enviando 
                        un correo electrónico a fservice28.076@gmail.com para que puedas ser atendido 
                        de una manera más fácil y segura. De igual manera, a través de dichos canales 
                        de comunicación, como corresponsables del tratamiento de tus datos personales, 
                        y si así lo solicitas, podemos revocar tu consentimiento respecto al tratamiento 
                        de tus datos personales o permitirte hacer efectivo el uso de tus derechos ARCO 
                        (acceso, rectificación, cancelación y oposición) sobre tus datos personales, 
                        conforme la normativa vigente de Protección de Datos Personales.
                    </p>
                </>
            )
        },
        {
            titulo: "3. ¿Dónde obtenemos tus Datos Personales? ¿Qué Datos vamos a utilizar exactamente?",
            contenido: (
                <>
                    <p>
                        Ten en cuenta que, para que puedas disfrutar del Servicio que te ofrecemos en 
                        la panadería La Orquídea, utilizaremos algunos datos sobre ti que obtenemos a 
                        través de diferentes formas y en diferentes momentos. A continuación, 
                        puedes verlo en detalle:
                    </p>
                    <ul className="Letras">
                        <li>
                    Utilizaremos los datos personales que tú mismo nos entregas al momento 
                    de hacer una compra (formulario “Finalizar compra” – formulario de facturación) 
                    o llenar algún otro formulario de nuestra web) a través del sitio web. 
                    Los datos personales que recopilamos son: nombre completo y apellidos, 
                    documento de identidad (independientemente de su tipo), correo electrónico, 
                    número de teléfono y dirección domiciliaria.
                </li>

                <li>
                    También los datos personales que tú mismo nos entregas al crearte una cuenta 
                    de usuario: nombre y apellidos, contraseña y dirección de correo electrónico.
                </li>

                <li>
                    Utilizaremos otra información sobre ti que podamos llegar a conocer 
                    gracias al uso que realizas en nuestra página web: tu ubicación; 
                    el código de identificación que te asignamos internamente; tu navegación 
                    por la plataforma (fechas y horas en las que accedes, clics que realizas, etc.); 
                    fecha y hora del pedido realizado, etc.
                </li>
                </ul>
            <p>
                Para referirnos a toda la información anteriormente mencionada 
                y a cualquier otra que tengamos sobre ti utilizaremos el término “Datos Personales”..
            </p>
                </>
            )
        },
        {
            titulo: "4. ¿Para qué vamos a utilizar tus Datos Personales?",
            contenido: (
                <>
                    <p>Utilizaremos tus Datos Personales para las siguientes finalidades:</p>
                    <ul className='Letras'>
                <li>
                    <strong>Prestarte el Servicio</strong>
                    <p className='Parrafo'>
                    El tratamiento de tus Datos Personales es necesario para que podamos 
                    ofrecer el servicio de delivery de nuestros productos. De lo contrario, 
                    no podrás disfrutar del mismo. El servicio comprende las siguientes cuestiones:
                    </p>

                    <ul className='Circulo'>
                        <li>
                            Gestionar la creación de tu cuenta de usuario y permitirte utilizarla o modificarla. 
                            Para disfrutar del servicio, aunque en nuestra plataforma no es necesario que te crees 
                            una cuenta, pero la información que nos ofrezcas sí es vital para ofrecerte el servicio. 
                            Podrás modificar los Datos Personales que nos hayas facilitado en cualquier momento 
                            a través del apartado “Perfil” incluido en la parte derecha superior.
                        </li>

                        <li>
                            Contactar contigo para darte información relativa del proceso en que se encuentre tu pedido. 
                            Estas comunicaciones podrán ser realizadas mediante correo electrónico, teléfono, 
                            notificaciones o mensajes en el sitio web. La forma de comunicación escogida dependerá 
                            del motivo de la comunicación.
                        </li>

                        <li>
                            Permitirte consultar un histórico de todos los pedidos que hayas realizado, 
                            siempre y cuando te hayas creado una cuenta. Para ello, simplemente debes acceder 
                            al apartado “Perfil”.
                        </li>

                        <li>
                            Facilitarte a través de la dirección de correo electrónico que nos hayas proporcionado 
                            las constancias correspondientes a los pedidos completados que has realizado.
                        </li>

                        <li>
                            Ofrecerte la mejor atención y asistencia. 
                            A través de nuestro Centro de Atención al cliente al número +57 300 842 5119, 
                            de lunes a domingo de 8:00AM a 6:00PM o enviando un correo electrónico a 
                            fservice28.076@gmail.com, te ofrecemos asistencia en cualquier momento para eventuales dudas, 
                            comentarios, sugerencias o incidencias relativas al servicio que nos quieras plantear. 
                            La referida ayuda solo puede ser facilitada si disponemos de tus Datos Personales.
                        </li>

                        <li>
                            Cualquier otra cuestión relacionada con la prestación del servicio.
                        </li>
                    </ul>
                </li>

                <li>
                    <strong>Realizar acciones de marketing</strong>
                    <ul className='Circulo'>
                        <li>
                            Utilizaremos tus Datos Personales para enviarte noticias, 
                            productos y promociones relacionados con la panadería La Orquídea 
                            y empresas del grupo empresarial FastService. A tal fin, analizaremos 
                            tu histórico de pedidos, los importes incurridos, tu perfil e intereses personales 
                            y crearemos un perfil sobre ti para que las promociones que te enviemos sean personalizadas, 
                            de forma que se adapten en cada momento a tus necesidades y preferencias personales. 
                            Ten en cuenta que puedes pedirnos en cualquier momento que dejemos de analizar tus datos, 
                            aunque ello supondrá que no recibirás más noticias, ofertas y promociones. 
                            El perfil que creemos sobre ti no será utilizado para ninguna finalidad diferente a la 
                            personalización de nuestras promociones.
                        </li>

                        <li>
                            En cualquier caso, ten en cuenta que podrás darte de baja de dichas comunicaciones 
                            en cualquier momento. Para ello, simplemente tendrás que hacerlo a través de nuestro 
                            Centro de Atención al cliente al número +57 300 842 5119, de lunes a domingo de 8:00AM a 6:00PM 
                            o enviando un correo electrónico a fservice28.076@gmail.com para que puedas ser atendido de una 
                            manera más fácil y segura.
                        </li>
                    </ul>
                </li>

                    <li>
                        <strong>Mejorar nuestro servicio</strong>
                        <p className='Parrafo'>
                        En la panadería La Orquídea trabajamos permanentemente en el perfeccionamiento del Sitio Web y, 
                        por ese motivo, realizamos pruebas, investigaciones y estudios analíticos y desarrollamos nuevos 
                        productos que acaban redundando en la mejora de la calidad del servicio. Nos permiten optimizarlo, 
                        hacerlo más funcional y adaptarlo a tus necesidades. Tales trabajos requieren en muchas ocasiones 
                        el uso de algunos de tus Datos Personales.
                        </p>
                    </li>

                    <li>
                        <strong>Prevenir fraudes</strong>
                        <p className='Parrafo'>
                        Para prevenir potenciales fraudes contra ti y contra la panadería La Orquídea y 
                        el grupo empresarial FastService, hemos implantado medidas que hagan de nuestra plataforma 
                        un lugar seguro. Por ejemplo, te solicitaremos que valides tu cuenta de correo por si se te 
                        olvida la clave, siempre y cuando te hayas creado una cuenta en nuestro sitio web. 
                        Asimismo, cuando detectemos la existencia de cargos o información irregular, 
                        nos pondremos en contacto contigo para asegurarnos de que todo es correcto.
                        </p>
                    </li>
                </ul>
                </>
            )
        },
        {
            titulo: "5. ¿Durante cuánto tiempo conservaremos tus Datos Personales?",
            contenido: (
                <p>
                    Los Datos Personales que conforman nuestros Bancos de Datos Personales, 
                se encontrarán almacenados mientras que la cuenta del Usuario se encuentre activada. 
                En caso de no tener una cuenta, tus Datos Personales serán almacenados hasta cumplir 
                con prestar el servicio que haya sido contratado por el titular de los datos personales 
                y hasta tres (3) años después, salvo que el titular de los datos personales solicite la 
                cancelación de los mismos como parte de sus derechos ARCO (acceso, rectificación, cancelación y oposición) 
                sobre sus datos personales, recurriendo a los procedimientos establecidos para ello. 
                No obstante, en caso el titular de los datos personales hubiera otorgado su consentimiento 
                para el tratamiento de sus datos personales para fines adicionales, entonces podremos conservar 
                y utilizar los datos personales requeridos para dichos fines, hasta que el titular de los datos 
                Personales revoque su consentimiento para ello.
                
                Cuando lleguen los momentos indicados en el detalle anterior, 
                no eliminaremos directamente tus datos personales; los conservaremos debidamente bloqueados 
                y protegidos durante el tiempo en que pudieran surgir responsabilidades derivadas del tratamiento 
                o durante los periodos exigidos por cualquier normativa aplicable. Durante ese tiempo, tus datos 
                personales no serán tratados para ninguna finalidad que no sea atender tales posibles responsabilidades 
                o cumplir dichas obligaciones legales. En consecuencia, sólo podrán acceder a los mismos miembros con 
                especial capacidad de la panadería La Orquídea para atender dichas responsabilidades u obligaciones legales. 
                Una vez prescriban estas posibles acciones y expiren las obligaciones legales mencionadas, procederemos 
                a eliminar tus datos personales de forma definitiva.
                </p>
            )
        },
        {
            titulo: "6. ¿Compartiremos tus Datos Personales con terceros?",
            contenido: (
                <p>
                    En la panadería La Orquídea respetamos la privacidad de nuestros clientes, trabajadores 
                    y usuarios de la web; por lo que <strong>no compartimos tu información con terceros</strong>.
                </p>
            )
        },
        {
            titulo: "7. ¿Cuáles son tus derechos en cuestiones de Protección de datos? (Derechos ARCO)",
            contenido: (
                <>
                    <p>Como usuario de la panadería La Orquídea, dispones de una serie de derechos para que puedas decidir 
                    y controlar en todo momento cómo utilizamos tus datos personales. Puedes ejercitar estos derechos en 
                    cualquier momento y de forma gratuita (salvo que tu solicitud sea excesiva o infundada). 
                    Para ejercitar uno de tus derechos, simplemente debes hacerlo a través de nuestro Centro de 
                    Atención al cliente al número +57 300 842 5119, de lunes a domingo de 8:00AM a 6:00PM o enviando 
                    un correo electrónico a fservice28.076@gmail.com.
                    
                    Para que podamos atender tu solicitud, necesitamos asegurarnos de que realmente eres tú, 
                    por lo que deberás facilitarnos copia de tu documento de identidad; también te agradeceríamos 
                    que nos indicases el derecho que deseas ejercitar. Si tu solicitud no reúne los requisitos anteriores, 
                    te pediremos que la subsanes (Corrijas).
                    
                    En particular, dispones de los derechos de acceso, rectificación, cancelación y oposición, 
                    también conocidos como derecho ARCO, conforme a la normativa vigente y otros que detallamos a continuación.
                    </p>

                    <ul className="Letras">
                        <li><strong>Acceso</strong> 
                        Puedes solicitarnos que te indiquemos si estamos utilizando o no tus datos personales; 
                            en caso de que sí los estemos utilizando, también te trasladaremos información adicional 
                            como qué datos personales tenemos sobre ti, para qué los estamos utilizando, el periodo durante 
                            el que vamos a conservar tus datos o si estamos realizando perfiles, entre otras cuestiones.
                        </li>
                        <li><strong>Rectificación</strong> 
                        Puedes pedirnos que modifiquemos alguno de los datos personales que tenemos sobre ti 
                            para que sean exactos y estén actualizados. De hecho, ten en cuenta que debes mantener 
                            actualizados en todo momento los datos personales que figuran en tu cuenta de usuario. 
                            Puedes hacerlo en el apartado de “Perfil” accesible desde la parte derecha superior del sitio web.
                        </li>
                        <li><strong>Cancelación</strong> 
                            Derecho que tienes como titular de tus datos personales para solicitar la cancelación 
                            de tus datos personales en cualquiera de nuestras bases de datos, conforme a los 
                            procedimientos previstos.
                        </li>
                        <li><strong>Oposición</strong> 
                            Puedes oponerte a que utilicemos tus datos para alguna de las finalidades recogidas 
                            en el apartado 4 de esta Política de Privacidad. Queremos recordarte especialmente que 
                            puedes pedirnos que dejemos de analizar tu perfil para enviarte comunicaciones promocionales.
                        </li>
                        <li><strong>Supresión</strong> 
                            Puedes solicitarnos que eliminemos los datos personales que tenemos sobre ti cuando 
                            ya no sean necesarios para la finalidad para la que los utilizamos, cuando nos retires 
                            tu consentimiento, en el caso de que sólo los tratemos para desarrollar finalidades basadas 
                            en el mismo.
                        </li>
                        <li><strong>Limitación</strong> 
                            Puedes pedirnos que restrinjamos temporalmente la utilización de tus datos personales 
                            cuando consideres que tus datos son inexactos, hasta que los verifiquemos o actualicemos 
                            (ten en cuenta que, mientras tanto, no podrás disfrutar del Servicio); 
                            cuando ya no los necesitemos para llevar a cabo las finalidades indicadas en el apartado 4 
                            pero tú prefieras que los conservemos para que puedas ejercitar o defenderte ante reclamaciones 
                            y cuando te opongas a que utilicemos tus datos para alguna de las finalidades recogidas en el 
                            número 2 del apartado 4 de esta Política de Privacidad, mientras valoramos si el interés legítimo 
                            que tenemos prevalece sobre tu derecho a oponerte a que los utilicemos.
                        </li>
                        <li><strong>Reclamación</strong>
                            Puedes presentar una reclamación ante la autoridad de control competente en materia de protección 
                            de datos. En tu caso, la autoridad competente es la Autoridad Nacional de Protección de Datos Personales.
                        </li>
                    </ul>
                </>
            )
        },
        {
            titulo: "8. ¿Actualizaremos esta Política de Privacidad?",
            contenido: (
                <p>
                    La panadería La Orquídea se reserva el derecho de modificar la “Política de Privacidad” 
                    por lo que se recomienda que cada vez que ingrese a la plataforma virtual el usuario deberá 
                    verificar regularmente nuestras políticas.
                </p>
            )
        }
    ];

    // Mostrar solo algunas secciones primero
    const limiteInicial = 3;
    const seccionesAMostrar = mostrarTodo ? secciones : secciones.slice(0, limiteInicial);

    return (
        <section className='ContenedorContenido'>
            <h1 className='Titulo'>Políticas de Privacidad</h1>
            <div className='ContenedorInfo'>
                {seccionesAMostrar.map((sec, index) => (
                    <div key={index}>
                        <h2 className='Subtitulo'>{sec.titulo}</h2>
                        <div className='ContenedorParrafo'>{sec.contenido}</div>
                    </div>
                ))}

                {!mostrarTodo && secciones.length > limiteInicial && (
                    <button className='bntVerMas'
                        onClick={() => setMostrarTodo(true)}>
                        Ver más
                    </button>
                )}
            </div>
        </section>
    );
}
