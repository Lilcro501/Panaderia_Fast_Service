// src/data/db.js

// Importaciones de MECATO
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

// Importaciones de PANES
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
import PastelArequipe from '../assets/images/panes/pastel-arequipe.jpg';
import PastelGuayaba from '../assets/images/panes/pastel-guayaba.jpg';

// Importaciones de HELADOS
import Aloha from '../assets/images/helados/aloha.png';
import Artesanal from '../assets/images/helados/artesanal.png';
import Bocatto from '../assets/images/helados/bocatto.png';
import Chococono from '../assets/images/helados/chococono.png';
import Dracula from '../assets/images/helados/dracula.png';
import NubesColores from '../assets/images/helados/nubes-colores.png';
import PaletaLimon from '../assets/images/helados/paleta-limon.png';
import Polette from '../assets/images/helados/polette.png';

// Importaciones de FRITOS
import Buñuelo from '../assets/images/fritos/buñuelo.png';
import Pollo from '../assets/images/fritos/pollo.png';
import TortaPescado from '../assets/images/fritos/torta-pescado.png';

// Importaciones de BEBIDAS
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


const productCategories = {
  panes: [
    { id: 'pan1', nameProduct: 'Pan Trenza', price: 2500, quantity: 0, image: PanTrenza, description: 'Delicioso pan trenzado, suave y dorado.' },
    { id: 'pan2', nameProduct: 'Almojábana', price: 2000, quantity: 0, image: Almojabana, description: 'Tradicional almojábana con queso, esponjosa y sabrosa.' },
    { id: 'pan3', nameProduct: 'Churro', price: 1800, quantity: 0, image: Churro, description: 'Churro frito con toque de azúcar, ideal para acompañar.' },
    { id: 'pan4', nameProduct: 'Galleta Chocolate', price: 1000, quantity: 0, image: GalletaChoco, description: 'Galleta crujiente con trozos de chocolate.' },
    { id: 'pan5', nameProduct: 'Galleta Mermelada', price: 800, quantity: 0, image: GalletaMermelada, description: 'Galleta suave rellena con deliciosa mermelada.' },
    { id: 'pan6', nameProduct: 'Lengua', price: 1500, quantity: 0, image: Lengua, description: 'Pan en forma de lengua, crujiente y dulce.' },
    { id: 'pan7', nameProduct: 'Magdalena', price: 800, quantity: 0, image: Magdalena, description: 'Magdalena tradicional, esponjosa y ligera.' },
    { id: 'pan8', nameProduct: 'PanAgridulce', price: 1000, quantity: 0, image: PanAgridulce, description: 'Pan con un toque agridulce, suave y sabroso.' },
    { id: 'pan9', nameProduct: 'PanChicharron', price: 1000, quantity: 0, image: PanChicharron, description: 'Pan relleno con trozos de chicharrón.' },
    { id: 'pan10', nameProduct: 'Pera', price: 2000, quantity: 0, image: Pera, description: 'Pan con forma de pera y sabor único.' },
    { id: 'pan11', nameProduct: 'Rollo', price: 2000, quantity: 0, image: Rollo, description: 'Rollito de pan suave con un toque dulce.' },
    { id: 'pan12', nameProduct: 'PastelArequipe', price: 2000, quantity: 0, image: PastelArequipe, description: 'Pastel crujiente relleno de arequipe.' },
    { id: 'pan13', nameProduct: 'PastelGuayaba', price: 2000, quantity: 0, image: PastelGuayaba, description: 'Pastel crujiente relleno de guayaba.' },
  ],

  fritos: [
    { id: 'f1', nameProduct: 'Buñuelo', price: 1000, quantity: 0, image: Buñuelo, description: 'Buñuelo colombiano crujiente por fuera y suave por dentro.' },
    { id: 'f2', nameProduct: 'Pollo Apanado', price: 3000, quantity: 0, image: Pollo, description: 'Trozos de pollo empanizados, crocantes y jugosos.' },
    { id: 'f3', nameProduct: 'Torta de Pescado', price: 2800, quantity: 0, image: TortaPescado, description: 'Torta de pescado frita, ideal para un snack nutritivo.' },
  ],

  mecato: [
    { id: 'm1', nameProduct: 'Cheesetris', price: 3500, quantity: 0, image: Cheesetris, description: 'Palitos de queso crujientes y sabrosos.' },
    { id: 'm2', nameProduct: 'Cheetos', price: 3000, quantity: 0, image: Cheetos, description: 'Mecato de maíz con sabor a queso.' },
    { id: 'm3', nameProduct: 'Chokis', price: 1200, quantity: 0, image: Chokis, description: 'Galletas con chispas de chocolate.' },
    { id: 'm4', nameProduct: 'Detodito', price: 5000, quantity: 0, image: Detodito, description: 'Mezcla de snacks variados para todos los gustos.' },
    { id: 'm5', nameProduct: 'Dinamita', price: 2000, quantity: 0, image: Dinamita, description: 'Mecato picante con forma de tubos.' },
    { id: 'm6', nameProduct: 'Doritos', price: 4000, quantity: 0, image: Doritos, description: 'Nachos de maíz con sabor intenso a queso.' },
    { id: 'm7', nameProduct: 'Flaming Hot', price: 3500, quantity: 0, image: FlamingHot, description: 'Snacks extra picantes para los más valientes.' },
    { id: 'm8', nameProduct: 'Margaritas', price: 3000, quantity: 0, image: Margaritas, description: 'Papas fritas tradicionales, crocantes y saladas.' },
    { id: 'm9', nameProduct: 'NatuChips Maduro', price: 3200, quantity: 0, image: NatuChipsPlat, description: 'Chips de plátano maduro, dulces y crujientes.' },
    { id: 'm10', nameProduct: 'NatuChips Verde', price: 3200, quantity: 0, image: NatuChipsVerd, description: 'Chips de plátano verde, sabor natural y salado.' },
    { id: 'm11', nameProduct: 'Pasabocas', price: 1200, quantity: 0, image: Pasabocas, description: 'Bocaditos salados ideales para picar.' },
    { id: 'm12', nameProduct: 'Popetas Mix', price: 2500, quantity: 0, image: PopetasMix, description: 'Mezcla de snacks de maíz inflado en varios sabores.' },
  ],

  bebidas: [
    { id: 'b1', nameProduct: 'Agua Pool', price: 1200, quantity: 0, image: AguaPool, description: 'Agua pura y refrescante en presentación pequeña.' },
    { id: 'b2', nameProduct: 'Aguila', price: 2300, quantity: 0, image: Aguila, description: 'Cerveza tradicional colombiana.' },
    { id: 'b3', nameProduct: 'BigCola', price: 2000, quantity: 0, image: BigCola, description: 'Gaseosa con sabor a cola, ideal para compartir.' },
    { id: 'b4', nameProduct: 'Electrolit', price: 2500, quantity: 0, image: Electrolit, description: 'Bebida hidratante con electrolitos.' },
    { id: 'b5', nameProduct: 'Gatorade', price: 3000, quantity: 0, image: Gatorade, description: 'Bebida deportiva para reponer energías.' },
    { id: 'b6', nameProduct: 'Leche Alqueria', price: 2800, quantity: 0, image: LecheAlqueria, description: 'Leche pasteurizada de la marca Alquería.' },
    { id: 'b7', nameProduct: 'Leche Colanta', price: 2700, quantity: 0, image: LecheColanta, description: 'Leche fresca de la marca Colanta.' },
    { id: 'b8', nameProduct: 'Like', price: 1800, quantity: 0, image: Like, description: 'Gaseosa sabor a manzana.' },
    { id: 'b9', nameProduct: 'Malta Mini', price: 1600, quantity: 0, image: MaltaMini, description: 'Malta en presentación pequeña, energética y deliciosa.' },
    { id: 'b10', nameProduct: 'Malta', price: 2000, quantity: 0, image: Malta, description: 'Bebida de malta, rica en energía y sabor.' },
    { id: 'b11', nameProduct: 'Pilsen', price: 2200, quantity: 0, image: Pilsen, description: 'Cerveza Pilsen colombiana, ligera y refrescante.' },
    { id: 'b12', nameProduct: 'Pool', price: 1500, quantity: 0, image: Pool, description: 'Bebida refrescante sabor a uva.' },
    { id: 'b13', nameProduct: 'Yogurt Bolsa', price: 2100, quantity: 0, image: YogurtBolsa, description: 'Yogurt líquido en bolsa, sabor tradicional.' },
    { id: 'b14', nameProduct: 'Yogurt', price: 2100, quantity: 0, image: Yogurt, description: 'Yogurt cremoso en presentación individual.' },
  ],

  helados: [
    { id: 'h1', nameProduct: 'Aloha', price: 2500, quantity: 0, image: Aloha, description: 'Helado tropical con sabores exóticos.' },
    { id: 'h2', nameProduct: 'Artesanal', price: 3000, quantity: 0, image: Artesanal, description: 'Helado elaborado artesanalmente con ingredientes naturales.' },
    { id: 'h3', nameProduct: 'Bocatto', price: 3000, quantity: 0, image: Bocatto, description: 'Helado cremoso en presentación premium.' },
    { id: 'h4', nameProduct: 'Chococono', price: 2700, quantity: 0, image: Chococono, description: 'Cono helado cubierto de chocolate.' },
    { id: 'h5', nameProduct: 'Dracula', price: 2900, quantity: 0, image: Dracula, description: 'Helado de sabores intensos, edición especial.' },
    { id: 'h6', nameProduct: 'Nubes de Colores', price: 3200, quantity: 0, image: NubesColores, description: 'Helado con colores y sabores frutales, ideal para niños.' },
    { id: 'h7', nameProduct: 'Paleta Limón', price: 2600, quantity: 0, image: PaletaLimon, description: 'Paleta helada con sabor cítrico refrescante.' },
    { id: 'h8', nameProduct: 'Polette', price: 2800, quantity: 0, image: Polette, description: 'Helado tipo paleta con sabores suaves y cremosos.' },
  ],
};

export default productCategories;
