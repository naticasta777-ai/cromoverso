import HeroCromoverso from "../components/HeroCromoverso/HeroCromoverso.jsx";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import { useInterfaz } from "../context/PreferenciasContext.jsx";
import { useInicio } from "../hooks/useInicio.js";

export default function Inicio() {
  const textos = useInterfaz();
  const { heroes, rarezas } = useInicio();

  return (
    <LayoutPublico tonoMovil="oscuro">
      <HeroCromoverso textos={textos} heroes={heroes} rarezas={rarezas} />
    </LayoutPublico>
  );
}