import { Link } from "react-router-dom";
import { rutaMundo } from "../../config/rutas.js";
import { plantilla, plural } from "../../utils/textos.js";
import EtiquetaRareza from "../EtiquetaRareza/EtiquetaRareza.jsx";
import Icono from "../Icono/Icono.jsx";
import Tarjeta from "../Tarjeta/Tarjeta.jsx";
import "./BarraLateralMundo.css";

export default function BarraLateralMundo({
  album,
  mundos,
  mundo,
  rarezas,
  tipos,
  conteoTipos,
  rarezaActiva,
  tipoActivo,
  onRareza,
  onTipo,
}) {
  return (
    <aside className="barra-mundo">
      <Tarjeta
        como="section"
        className="panel-mundo"
        aria-labelledby="panel-mundos"
      >
        <h2 id="panel-mundos" className="titular-h4">
          {album.mundos.titulo}
        </h2>
        <ul className="lista-mundos">
          {mundos.map((item) => {
            const actual = item.id === mundo.id;
            return (
              <li key={item.id}>
                <Link
                  to={rutaMundo(item.id)}
                  className={`fila-mundo${actual ? " fila-mundo--actual" : ""}`}
                  aria-current={actual ? "page" : undefined}
                  style={{
                    "--color-mundo": item.color,
                    "--fondo-mundo": `var(--mundo-${item.id}-suave, var(--fondo-sutil))`,
                  }}
                >
                  <span className="fila-mundo__principal">
                    <span className="fila-mundo__punto" aria-hidden="true" />
                    <span
                      className={`fila-mundo__nombre cuerpo-p${actual ? "-fuerte" : ""}`}
                    >
                      {item.nombre}
                    </span>
                    <span className="fila-mundo__cantidad cuerpo-p-fuerte">
                      {plantilla(album.mundos.cromos, {
                        cantidad: item.totalCromos,
                      })}
                    </span>
                  </span>
                  {actual && (
                    <span className="fila-mundo__actual detalle-nota-fuerte">
                      {album.mundos.aria.paginaActual}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </Tarjeta>

      <Tarjeta
        como="section"
        className="panel-mundo"
        aria-labelledby="filtro-rareza"
      >
        <h2 id="filtro-rareza" className="titular-h4">
          {album.filtros.rareza.titulo}
        </h2>
        <ul className="filtro-lista">
          {[...rarezas].reverse().map((rareza) => {
            const activa = rarezaActiva === rareza.id;
            return (
              <li key={rareza.id}>
                <button
                  type="button"
                  className="filtro-fila"
                  aria-pressed={activa}
                  onClick={() => onRareza(rareza.id)}
                >
                  <EtiquetaRareza
                    id={rareza.id}
                    nombre={rareza.nombre}
                    icono={rareza.icono}
                  />
                  <span className="filtro-fila__cantidad cuerpo-p">
                    {plural(
                      album.filtros.cantidad,
                      mundo.porRareza?.[rareza.id] ?? 0,
                    )}
                  </span>
                  {activa && (
                    <Icono nombre="check" className="filtro-fila__marca" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Tarjeta>

      <Tarjeta
        como="section"
        className="panel-mundo"
        aria-labelledby="filtro-tipo"
      >
        <h2 id="filtro-tipo" className="titular-h4">
          {album.filtros.tipo.titulo}
        </h2>
        <ul className="filtro-lista">
          {tipos.map((tipo) => {
            const activo = tipoActivo === tipo;
            return (
              <li key={tipo}>
                <button
                  type="button"
                  className="filtro-fila"
                  aria-pressed={activo}
                  onClick={() => onTipo(tipo)}
                >
                  <span className="filtro-fila__nombre titular-h4">
                    {album.filtros.tipo.opciones[tipo]}
                  </span>
                  <span className="filtro-fila__cantidad cuerpo-p">
                    {plural(album.filtros.cantidad, conteoTipos[tipo] ?? 0)}
                  </span>
                  {activo && (
                    <Icono nombre="check" className="filtro-fila__marca" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Tarjeta>
    </aside>
  );
}
