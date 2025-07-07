
/* ~~~~~ Panes ~~~~~ */
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

/* ~~~~~ Mecato ~~~~~ */
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

/* ~~~~~ Bebidas ~~~~~ */
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

/* ~~~~~ Fritos ~~~~~ */
import Buñuelo from '../assets/images/fritos/buñuelo.png';
import Pollo from '../assets/images/fritos/pollo.png';
import TortaPescado from '../assets/images/fritos/torta-pescado.png';

/* ~~~~~ Helados ~~~~~ */
import Aloha from '../assets/images/helados/aloha.png';
import Artesanal from '../assets/images/helados/artesanal.png';
import Bocatto from '../assets/images/helados/bocatto.png';
import Chococono from '../assets/images/helados/chococono.png';
import Dracula from '../assets/images/helados/dracula.png';
import NubesColores from '../assets/images/helados/nubes-colores.png';
import PaletaLimon from '../assets/images/helados/paleta-limon.png';
import Polette from '../assets/images/helados/polette.png';

// Datos agrupados en arrays
const panes = [ /* ~~~~~ Panes ~~~~~ */
  { id: 'pan1', nameProduct: 'Pan Trenza', price: 2500, image: PanTrenza, descripcion: 'Pan trenzado artesanal, suave por dentro y crocante por fuera.' },
  { id: 'pan2', nameProduct: 'Almojábana', price: 2000, image: Almojabana, descripcion: 'Pan hecho con almidón de yuca y queso, muy esponjoso.' },
  { id: 'pan3', nameProduct: 'Churro', price: 1800, image: Churro, descripcion: 'Masa frita espolvoreada con azúcar, crujiente por fuera y tierna por dentro.' },
  { id: 'pan4', nameProduct: 'Galleta Chocolate', price: 2200, image: GalletaChoco, descripcion: 'Galleta crocante con chispas de chocolate, perfecta para los amantes del dulce.' },
  { id: 'pan5', nameProduct: 'Galleta Mermelada', price: 2200, image: GalletaMermelada, descripcion: 'Galleta rellena de mermelada de frutas, suave y deliciosa.' },
  { id: 'pan6', nameProduct: 'Lengua', price: 1700, image: Lengua, descripcion: 'Pan crocante y azucarado con forma alargada.' },
  { id: 'pan7', nameProduct: 'Magdalena', price: 800, image: Magdalena, descripcion: 'Ponqué esponjoso y dulce.' },
  { id: 'pan8', nameProduct: 'Pan Agridulce', price: 1200, image: PanAgridulce, descripcion: 'Pan suave con un toque dulce y salado, perfecto para acompañar bebidas calientes.' },
  { id: 'pan9', nameProduct: 'Pan Chicharrón', price: 1000, image: PanChicharron, descripcion: 'Pan dulce y crocante.' },
  { id: 'pan10', nameProduct: 'Pera', price: 2300, image: Pera, descripcion: 'Pan con un glaseado dulce, con ralladura de coco.' },
  { id: 'pan11', nameProduct: 'Rollo', price: 3000, image: Rollo, descripcion: 'Rollo de pan relleno.' },
];

const mecato = [ /* ~~~~~ mecato ~~~~~ */
  { id: 'm1', nameProduct: 'Cheesetris', price: 3500, image: Cheesetris, descripcion: 'Mecato crujiente de queso con un sabor intenso y salado.' },
  { id: 'm2', nameProduct: 'Cheetos', price: 3800, image: Cheetos, descripcion: 'Bolitas con sabor a queso, ideales para compartir.' },
  { id: 'm3', nameProduct: 'Chokis', price: 1800, image: Chokis, descripcion: 'Galletas con chispas de chocolate, dulces y crujientes.' },
  { id: 'm4', nameProduct: 'Detodito', price: 4000, image: Detodito, descripcion: 'Mezcla de snacks con diferentes sabores y texturas.' },
  { id: 'm5', nameProduct: 'Dinamita', price: 2000, image: Dinamita, descripcion: 'Snacks picantes tipo rollito con sabor explosivo.' },
  { id: 'm6', nameProduct: 'Doritos', price: 4000, image: Doritos, descripcion: 'Triángulos de maíz con sabor a queso nacho, irresistibles.' },
  { id: 'm7', nameProduct: 'Flaming Hot', price: 4000, image: FlamingHot, descripcion: 'Doritos extra picantes para los más atrevidos.' },
  { id: 'm8', nameProduct: 'Margaritas', price: 3000, image: Margaritas, descripcion: 'Papas fritas tradicionales con sabor natural.' },
  { id: 'm9', nameProduct: 'NatuChips Maduro', price: 3200, image: NatuChipsPlat, descripcion: 'Chips de plátano maduro horneados, dulces y saludables.' },
  { id: 'm10', nameProduct: 'NatuChips Verde', price: 3200, image: NatuChipsVerd, descripcion: 'Chips de plátano verde con textura crocante.' },
  { id: 'm11', nameProduct: 'Pasabocas', price: 1200, image: Pasabocas, descripcion: 'Snacks de maíz inflado con sabor a queso y mantequilla.' },
  { id: 'm12', nameProduct: 'Popetas Mix', price: 2500, image: PopetasMix, descripcion: 'Mix de palomitas dulces y saladas con sabores variados.' },
];

const bebidas = [ /* ~~~~~ Bebidas ~~~~~ */
  { id: 'b1', nameProduct: 'Agua Pool', price: 1200, image: AguaPool, descripcion: 'Botella de agua natural, ideal para mantenerse hidratado.' },
  { id: 'b2', nameProduct: 'Águila', price: 2300, image: Aguila, descripcion: 'Cerveza nacional con sabor suave y refrescante.' },
  { id: 'b3', nameProduct: 'BigCola', price: 2000, image: BigCola, descripcion: 'Refresco con sabor a cola, ideal para acompañar comidas.' },
  { id: 'b4', nameProduct: 'Electrolit', price: 2500, image: Electrolit, descripcion: 'Bebida hidratante con electrolitos, perfecta para recuperar energía.' },
  { id: 'b5', nameProduct: 'Gatorade', price: 3000, image: Gatorade, descripcion: 'Bebida deportiva que repone líquidos y minerales.' },
  { id: 'b6', nameProduct: 'Leche Alquería', price: 2800, image: LecheAlqueria, descripcion: 'Leche entera pasteurizada, rica en calcio y vitaminas.' },
  { id: 'b7', nameProduct: 'Leche Colanta', price: 2700, image: LecheColanta, descripcion: 'Leche entera de excelente calidad, ideal para el desayuno.' },
  { id: 'b8', nameProduct: 'Like', price: 1800, image: Like, descripcion: 'Refresco sabor a cola, alternativa económica y deliciosa.' },
  { id: 'b9', nameProduct: 'Malta Mini', price: 1600, image: MaltaMini, descripcion: 'Bebida de malta en presentación mini, sabor dulce y energizante.' },
  { id: 'b10', nameProduct: 'Malta', price: 2000, image: Malta, descripcion: 'Bebida de malta en botella grande, nutritiva y deliciosa.' },
  { id: 'b11', nameProduct: 'Pilsen', price: 2200, image: Pilsen, descripcion: 'Cerveza clara tipo lager, refrescante para cualquier ocasión.' },
  { id: 'b12', nameProduct: 'Pool', price: 1500, image: Pool, descripcion: 'Agua embotellada natural, para mantener el cuerpo en equilibrio.' },
  { id: 'b13', nameProduct: 'Yogurt Bolsa', price: 2100, image: YogurtBolsa, descripcion: 'Yogurt bebible en bolsa, sabor natural y fácil de llevar.' },
  { id: 'b14', nameProduct: 'Yogurt', price: 2100, image: Yogurt, descripcion: 'Yogurt cremoso en presentación de vaso, delicioso y nutritivo.' },
];

const fritos = [ /* ~~~~~ Fritos ~~~~~ */
  { id: 'f1', nameProduct: 'Buñuelo', price: 1000, image: Buñuelo, descripcion: 'Esfera frita de masa con queso, crujiente por fuera y suave por dentro.' },
  { id: 'f2', nameProduct: 'Pollo Apanado', price: 3000, image: Pollo, descripcion: 'Filete de pollo empanizado y frito, sabroso y crujiente.' },
  { id: 'f3', nameProduct: 'Torta de Pescado', price: 2800, image: TortaPescado, descripcion: 'Torta frita hecha con pescado y especias, ideal como acompañante.' },
];

const helados = [ /* ~~~~~ Helados ~~~~~ */
  { id: 'h1', nameProduct: 'Aloha', price: 2500, image: Aloha, descripcion: 'Paleta tropical con sabores exóticos y refrescantes.' },
  { id: 'h2', nameProduct: 'Artesanal', price: 3000, image: Artesanal, descripcion: 'Helado de fabricación artesanal con sabores naturales.' },
  { id: 'h3', nameProduct: 'Bocatto', price: 3000, image: Bocatto, descripcion: 'Postre helado cremoso y elegante para los más exigentes.' },
  { id: 'h4', nameProduct: 'Chococono', price: 2700, image: Chococono, descripcion: 'Cono de galleta relleno de helado y cubierto con chocolate.' },
  { id: 'h5', nameProduct: 'Drácula', price: 2900, image: Dracula, descripcion: 'Helado tricolor con sabores surtidos y centro líquido.' },
  { id: 'h6', nameProduct: 'Nubes de Colores', price: 3200, image: NubesColores, descripcion: 'Helado con sabor dulce y colores divertidos, preferido por niños.' },
  { id: 'h7', nameProduct: 'Paleta Limón', price: 2600, image: PaletaLimon, descripcion: 'Paleta helada con sabor a limón, muy refrescante.' },
  { id: 'h8', nameProduct: 'Polette', price: 2800, image: Polette, descripcion: 'Helado cremoso en barra con cobertura de chocolate.' },
];

// Datos organizados
const datos = {
  categorias: [
    {
      nombre: "Panes",
      productos: panes,
    },

    {
      nombre: "Mecato",
      productos: mecato,
    },

    {
      nombre: "Bebidas",
      productos: bebidas,
    },

    {
      nombre: "Fritos",
      productos: fritos,
    },

    {
      nombre: "Helados",
      productos: helados,
    }
  ],
  panes, mecato, bebidas, fritos, helados /* Exportación del array plano para ser usado en otros componentes */
};

export default datos;
