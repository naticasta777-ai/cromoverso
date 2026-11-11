import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BarraLateralMundo from "../components/BarraLateralMundo/BarraLateralMundo.jsx";
import CabeceraMundo from "../components/CabeceraMundo/CabeceraMundo.jsx";
import EstadoPagina from "../components/EstadoPagina/EstadoPagina.jsx";
import FiltrosMovil from "../components/FiltrosMovil/FiltrosMovil.jsx";
import GrillaCromos from "../components/GrillaCromos/GrillaCromos.jsx";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import { useTextos } from "../context/TextosContext.jsx";
import { useCatalogo } from "../hooks/useCatalogo.js";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import { useMetadatos } from "../hooks/useMetadatos.js";
import {
  normalizar,
  numeroDeCromo,
  plantilla,
  plural,
} from "../utils/textos.js";
import "./CatalogoMundo.css";

export default function CatalogoMundo() {
  const { id } = useParams();
  const textos = useTextos();
  const album = textos.paginas.albumMundo;
  const buscador = textos.navbar.buscador;
  const [params, setParams] = useSearchParams();
  const escritorio = useMediaQuery("(min-width: 64rem)");
  const [buscando, setBuscando] = useState(false);
  const [consulta, setConsulta] = useState("");

  // Los filtros viven en la URL: ?rareza=legendaria&tipo=villano
  const tipos = Object.keys(album.filtros.tipo.opciones);
  const tipoParam = params.get("tipo") ?? "";
  const tipoActivo = tipos.includes(tipoParam) ? tipoParam : "";

  const {
    mundo,
    mundos,
    rarezas,
    todos,
    lista,
    rarezaValida,
    noEncontrado,
    error,
    cargandoLista,
    reintentar,
  } = useCatalogo(id, params.get("rareza") ?? "", tipoActivo);

  const nombreMundo =
    mundo?.nombre ?? mundos.find((item) => item.id === id)?.nombre;
  const numero = mundos.findIndex((item) => item.id === id) + 1;

  useMetadatos(
    mundo ? plantilla(album.seo.titulo, { mundo: mundo.nombre }) : undefined,
    mundo
      ? plantilla(album.seo.descripcion, { mundo: mundo.nombre })
      : undefined,
  );

  const conteoTipos = useMemo(
    () =>
      todos.reduce(
        (conteo, cromo) => ({
          ...conteo,
          [cromo.tipo]: (conteo[cromo.tipo] ?? 0) + 1,
        }),
        {},
      ),
    [todos],
  );

  // La búsqueda solo existe en móvil.
  const busqueda = escritorio ? "" : normalizar(consulta.trim());
  const visibles = useMemo(() => {
    if (!busqueda) return lista;
    return lista.filter(
      (cromo) =>
        normalizar(cromo.nombre).includes(busqueda) ||
        numeroDeCromo(cromo.numero).includes(busqueda) ||
        String(cromo.numero) === busqueda,
    );
  }, [lista, busqueda]);

  function fijarFiltro(clave, valor) {
    const siguiente = new URLSearchParams(params);
    if (valor) siguiente.set(clave, valor);
    else siguiente.delete(clave);
    setParams(siguiente, { replace: true });
  }

  const alternarRareza = (valor) =>
    fijarFiltro("rareza", rarezaValida === valor ? "" : valor);
  const alternarTipo = (valor) =>
    fijarFiltro("tipo", tipoActivo === valor ? "" : valor);

  function limpiarFiltros() {
    setParams({}, { replace: true });
    setConsulta("");
  }

  function alternarBuscador() {
    setBuscando((valor) => !valor);
    setConsulta("");
  }

  if (noEncontrado) {
    return (
      <LayoutPublico>
        <EstadoPagina tipo="noEncontrado" />
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

  if (!mundo) {
    return (
      <LayoutPublico>
        <EstadoPagina tipo="cargando" mundo={nombreMundo} />
      </LayoutPublico>
    );
  }

  return (
    <LayoutPublico sinNavbarMovil>
      <CabeceraMundo
        mundo={mundo}
        numero={numero}
        album={album}
        buscador={buscador}
        buscando={buscando}
        onBuscar={alternarBuscador}
      />

      <div
        className="contenedor catalogo"
        style={{
          "--fondo-mundo": `var(--mundo-${mundo.id}-suave, var(--mundo-neon-suave))`,
        }}
      >
        <BarraLateralMundo
          album={album}
          mundos={mundos}
          mundo={mundo}
          rarezas={rarezas}
          tipos={tipos}
          conteoTipos={conteoTipos}
          rarezaActiva={rarezaValida}
          tipoActivo={tipoActivo}
          onRareza={alternarRareza}
          onTipo={alternarTipo}
        />

        <div className="catalogo__principal">
          <FiltrosMovil
            album={album}
            buscador={buscador}
            rarezas={rarezas}
            tipos={tipos}
            rarezaActiva={rarezaValida}
            tipoActivo={tipoActivo}
            onRareza={(valor) => fijarFiltro("rareza", valor)}
            onTipo={(valor) => fijarFiltro("tipo", valor)}
            buscando={buscando}
            consulta={consulta}
            onConsulta={setConsulta}
          />
          <GrillaCromos
            album={album}
            cromos={visibles}
            rarezas={rarezas}
            tamano={escritorio ? "m" : "p"}
            cargando={cargandoLista}
            resumen={plural(album.filtros.cantidad, visibles.length)}
            onLimpiar={limpiarFiltros}
          />
        </div>
      </div>
    </LayoutPublico>
  );
}
