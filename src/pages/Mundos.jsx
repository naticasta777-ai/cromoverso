import { Navigate } from "react-router-dom";
import EstadoPagina from "../components/EstadoPagina/EstadoPagina.jsx";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import { rutaMundo } from "../config/rutas.js";
import { useMundos } from "../hooks/useMundos.js";

// «Mundos» en la navegación lleva al catálogo del primer mundo que devuelve la API.
export default function Mundos() {
  const { mundos, error, reintentar } = useMundos();

  if (mundos.length > 0) {
    return <Navigate to={rutaMundo(mundos[0].id)} replace />;
  }

  const tipo = error
    ? error.estado === 0
      ? "sinConexion"
      : "error"
    : "cargando";

  return (
    <LayoutPublico>
      <EstadoPagina tipo={tipo} onReintentar={reintentar} />
    </LayoutPublico>
  );
}
