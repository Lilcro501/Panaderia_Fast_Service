import React from "react"

import "../assets/styles/Categorias.css"
import Bebidas from "../assets/icons/bebidas.png"
import Helados from "../assets/icons/helados.png"
import Mecato from "../assets/icons/mecato.png"
import Fritos from "../assets/icons/pollo.png"
import Pan from  "../assets/icons/pan.png"



function Categorias() {
    return <section class="categorias">
        <div class="recuadro-categoria">
        <div class="categoria"><img src={Pan} alt="Panes" width="60" /><h5 class="nom-categoria">Panes</h5></div>
        <div class="categoria"><img src={Fritos} alt="Fritos" width="60" /><h5 class="nom-categoria">Fritos</h5></div>
        <div class="categoria"><img src={Mecato} alt="Mecato" width="60" /><h5 class="nom-categoria">Mecato</h5></div>
        <div class="categoria"><img src={Bebidas} alt="Bebidas" width="60" /><h5 class="nom-categoria">Bebidas</h5></div>
        <div class="categoria"><img src={Helados} alt="Helados" width="62" /><h5 class="nom-categoria">Helados</h5></div>
        </div>
    </section>
}

export default Categorias;

