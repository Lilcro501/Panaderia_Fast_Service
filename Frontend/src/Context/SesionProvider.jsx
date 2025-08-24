import React, { useState, useEffect } from "react";
import SesionExpirada from "../components/SesionExpirada";
import { registrarSesionExpiradaHandler } from "../api/api";
import "../assets/styles/Global.css";

export function SesionProvider({ children }) {
  const [expirada, setExpirada] = useState(false);

  useEffect(() => {
    registrarSesionExpiradaHandler(() => setExpirada(true));
  }, []);

  const handleCerrar = () => {
    setExpirada(false);
    window.location.href = "/Accedeaqui";
  };

  return (
    <>
      {children}
      {expirada && <SesionExpirada onClose={handleCerrar} />}
    </>
  );
}
