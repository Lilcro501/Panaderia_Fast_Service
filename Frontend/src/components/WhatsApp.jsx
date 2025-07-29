// src/components/WhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../assets/styles/WhatsApp.css";

export default function WhatsApp({ numero, mensaje }) {
  const enlace = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={enlace}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span>WhatsApp</span>
    </a>
  );
}
