import EstadoPagina from "../components/EstadoPagina/EstadoPagina.jsx";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";

export default function NoEncontrado() {
  return (
    <LayoutPublico>
      <EstadoPagina tipo="noEncontrado" />
    </LayoutPublico>
  );
}
