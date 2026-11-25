import { useLocation, useNavigate, useParams } from "react-router-dom";
import EstadoPagina from "../components/EstadoPagina/EstadoPagina.jsx";
import FichaCromo from "../components/FichaCromo/FichaCromo.jsx";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import { RUTAS, rutaMundo } from "../config/rutas.js";
import { useTextos } from "../context/TextosContext.jsx";
import { useDetalleCromo } from "../hooks/useDetalleCromo.js";
import { useMetadatos } from "../hooks/useMetadatos.js";
import { plantilla } from "../utils/textos.js";
import CatalogoMundo from "./CatalogoMundo.jsx";

// Vista 3: el detalle de un cromo en /cromos/:id. Se dibuja como una ventana
// sobre el catálogo del mundo del cromo, como en el Figma.
export default function DetalleCromo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const detalle = useTextos().paginas.detalleCromo;
  const {
    cromo,
    rarezas,
    anterior,
    siguiente,
    posicion,
    noEncontrado,
    error,
    reintentar,
  } = useDetalleCromo(id);

  // Título y descripción propios de la página (en Next.js sería generateMetadata).
  useMetadatos(
    cromo ? plantilla(detalle.seo.titulo, { nombre: cromo.nombre }) : undefined,
    cromo
      ? plantilla(detalle.seo.descripcion, { poder: cromo.poder })
      : undefined,
  );

  // Si la API responde 404, se muestra la página de no encontrado (notFound() en Next.js).
  if (noEncontrado) {
    return (
      <LayoutPublico>
        <EstadoPagina
          tipo="noEncontrado"
          personalizado={{
            titulo: detalle.noEncontrado.titulo,
            texto: detalle.noEncontrado.texto,
            boton: detalle.noEncontrado.botones.volver,
            ruta: RUTAS.mundos,
          }}
        />
      </LayoutPublico>
    );
  }

  if (error) {
    return (
      <LayoutPublico>
        <EstadoPagina
          tipo={error.estado === 0 ? "sinConexion" : "error"}
          onReintentar={reintentar}
        />
      </LayoutPublico>
    );
  }

  if (!cromo) {
    return (
      <LayoutPublico>
        <EstadoPagina tipo="cargando" />
      </LayoutPublico>
    );
  }

  const rareza = rarezas.find((item) => item.id === cromo.rareza) ?? {
    id: cromo.rareza,
    nombre: cromo.rareza,
  };

  // «default» es la clave de la primera entrada del historial: se entró directo por la
  // dirección. En ese caso se va al catálogo del mundo; si no, se vuelve atrás.
  function cerrar() {
    if (ubicacion.key !== "default") navigate(-1);
    else navigate(rutaMundo(cromo.mundo), { replace: true });
  }

  return (
    <>
      <CatalogoMundo idMundo={cromo.mundo} incrustado />
      <FichaCromo
        cromo={cromo}
        rareza={rareza}
        posicion={posicion}
        anterior={anterior}
        siguiente={siguiente}
        onCerrar={cerrar}
      />
    </>
  );
}
