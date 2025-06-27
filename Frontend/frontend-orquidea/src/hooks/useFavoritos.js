import { useState, useEffect } from "react";

const UseFavoritos = () => {
    const [favoritos,setFavoritos] = useState([]);
    
    useEffect(()=> {
        const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(favs);
    }, [])
    }