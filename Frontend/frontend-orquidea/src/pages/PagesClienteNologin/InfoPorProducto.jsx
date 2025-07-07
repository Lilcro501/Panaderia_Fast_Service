
import { useParams } from 'react-router-dom'; 
import ProductoDetalle from '../../components/ProductoDetalle';
import datos from '../../Data/DatosProductos';

export default function InfoPorProducto() {
    const { id } = useParams();

    // Unificación de los productos en una sola lista
    const allProducts = Object.values(datos).flat();
    const producto = allProducts.find(p => p.id === id);

    if (!producto) return <h1>Producto no encontrado</h1>;

    return (
    <ProductoDetalle
        nombre={producto.nameProduct}
        descripcion={producto.descripcion}
        precio={producto.price}
        imagen={producto.image}
    />
    );
}
