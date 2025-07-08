import React from "react";
import DetallesPedido from "../Admin/DetallesPedido";
import { useCarrito } from "../Context/CarritoContext";

export default function Orden() {
    const { carrito } = useCarrito(); // items con { nameProduct, quantity, price }
    
    // Mapea al formato que DetallesPedido espera
    const items = carrito.map(p => ({
    producto: p.nameProduct,
    cantidad: p.quantity,
    precioUnitario: p.price
    }));

    return <DetallesPedido items={items} />;
}
