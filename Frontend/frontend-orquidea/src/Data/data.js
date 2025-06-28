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
    { id: 'pan1', nameProduct: 'Pan Trenza', price: 2500, quantity: 0, image: PanTrenza },
    { id: 'pan2', nameProduct: 'Almojábana', price: 2000, quantity: 0, image: Almojabana },
    { id: 'pan3', nameProduct: 'Churro', price: 1800, quantity: 0, image: Churro },
    { id: 'pan4', nameProduct: 'Galleta Chocolate', price: 2200, quantity: 0, image: GalletaChoco },
    { id: 'pan5', nameProduct: 'Galleta Mermelada', price: 2200, quantity: 0, image: GalletaMermelada },
  ],
  fritos: [
    { id: 'f1', nameProduct: 'Buñuelo', price: 1000, quantity: 0, image: Buñuelo },
    { id: 'f2', nameProduct: 'Pollo Apanado', price: 3000, quantity: 0, image: Pollo },
    { id: 'f3', nameProduct: 'Torta de Pescado', price: 2800, quantity: 0, image: TortaPescado },
  ],
  mecato: [
    { id: 'm1', nameProduct: 'Cheesetris', price: 3500, quantity: 0, image: Cheesetris },
    { id: 'm2', nameProduct: 'Cheetos', price: 3800, quantity: 0, image: Cheetos },
    { id: 'm3', nameProduct: 'Chokis', price: 1800, quantity: 0, image: Chokis },
    { id: 'm4', nameProduct: 'Detodito', price: 4000, quantity: 0, image: Detodito },
    { id: 'm5', nameProduct: 'Dinamita', price: 2000, quantity: 0, image: Dinamita },
    { id: 'm6', nameProduct: 'Doritos', price: 4000, quantity: 0, image: Doritos },
    { id: 'm7', nameProduct: 'Flaming Hot', price: 4000, quantity: 0, image: FlamingHot },
    { id: 'm8', nameProduct: 'Margaritas', price: 3000, quantity: 0, image: Margaritas },
    { id: 'm9', nameProduct: 'NatuChips Maduro', price: 3200, quantity: 0, image: NatuChipsPlat },
    { id: 'm10', nameProduct: 'NatuChips Verde', price: 3200, quantity: 0, image: NatuChipsVerd },
    { id: 'm11', nameProduct: 'Pasabocas', price: 1200, quantity: 0, image: Pasabocas },
    { id: 'm12', nameProduct: 'Popetas Mix', price: 2500, quantity: 0, image: PopetasMix },
  ],
  bebidas: [
    { id: 'b1', nameProduct: 'Agua Pool', price: 1200, quantity: 0, image: AguaPool },
    { id: 'b2', nameProduct: 'Aguila', price: 2300, quantity: 0, image: Aguila },
    { id: 'b3', nameProduct: 'BigCola', price: 2000, quantity: 0, image: BigCola },
    { id: 'b4', nameProduct: 'Electrolit', price: 2500, quantity: 0, image: Electrolit },
    { id: 'b5', nameProduct: 'Gatorade', price: 3000, quantity: 0, image: Gatorade },
    { id: 'b6', nameProduct: 'Leche Alqueria', price: 2800, quantity: 0, image: LecheAlqueria },
    { id: 'b7', nameProduct: 'Leche Colanta', price: 2700, quantity: 0, image: LecheColanta },
    { id: 'b8', nameProduct: 'Like', price: 1800, quantity: 0, image: Like },
    { id: 'b9', nameProduct: 'Malta Mini', price: 1600, quantity: 0, image: MaltaMini },
    { id: 'b10', nameProduct: 'Malta', price: 2000, quantity: 0, image: Malta },
    { id: 'b11', nameProduct: 'Pilsen', price: 2200, quantity: 0, image: Pilsen },
    { id: 'b12', nameProduct: 'Yogurt Bolsa', price: 2100, quantity: 0, image: YogurtBolsa },
    { id: 'b13', nameProduct: 'Yogurt', price: 2100, quantity: 0, image: Yogurt },
  ],
  helados: [
    { id: 'h1', nameProduct: 'Aloha', price: 2500, quantity: 0, image: Aloha },
    { id: 'h2', nameProduct: 'Artesanal', price: 3000, quantity: 0, image: Artesanal },
    { id: 'h3', nameProduct: 'Bocatto', price: 3000, quantity: 0, image: Bocatto },
    { id: 'h4', nameProduct: 'Chococono', price: 2700, quantity: 0, image: Chococono },
    { id: 'h5', nameProduct: 'Dracula', price: 2900, quantity: 0, image: Dracula },
    { id: 'h6', nameProduct: 'Nubes de Colores', price: 3200, quantity: 0, image: NubesColores },
    { id: 'h7', nameProduct: 'Paleta Limón', price: 2600, quantity: 0, image: PaletaLimon },
    { id: 'h8', nameProduct: 'Polette', price: 2800, quantity: 0, image: Polette },
  ],
};

export default productCategories;
