import EstadoPagina from "../components/EstadoPagina/EstadoPagina.jsx";
import HeroCromoverso from "../components/HeroCromoverso/HeroCromoverso.jsx";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import SeccionMundos from "../components/SeccionMundos/SeccionMundos.jsx";
import { useTextos } from "../context/TextosContext.jsx";
import { useInicio } from "../hooks/useInicio.js";
import { useMetadatos } from "../hooks/useMetadatos.js";

export default function Inicio() {
  const { paginas } = useTextos();
  const inicio = paginas.inicio;
  const tipos = paginas.albumMundo.filtros.tipo.opciones;
  const { mundos, rarezas, heroes, cargando, error, reintentar } = useInicio();

  useMetadatos(inicio.seo.titulo, inicio.seo.descripcion);

  let seccion;
  if (error) {
    seccion = (
      <EstadoPagina
        tipo={error.estado === 0 ? "sinConexion" : "error"}
        onReintentar={reintentar}
      />
    );
  } else if (cargando && mundos.length === 0) {
    seccion = <EstadoPagina tipo="cargando" />;
  } else {
    seccion = <SeccionMundos mundos={mundos} inicio={inicio} />;
  }

  return (
    <LayoutPublico tonoMovil="oscuro">
      <HeroCromoverso
        inicio={inicio}
        heroes={heroes}
        rarezas={rarezas}
        tipos={tipos}
      />
      {seccion}
    </LayoutPublico>
  );
}
