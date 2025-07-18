
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, rolPermitido }) => {
  const rol = localStorage.getItem("rol");

  if (!rol || rol !== rolPermitido) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default RutaProtegida;
