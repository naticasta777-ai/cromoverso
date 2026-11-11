import { plantilla } from "../../utils/textos.js";
import Campo from "../Campo/Campo.jsx";
import Icono from "../Icono/Icono.jsx";
import "./FiltrosMovil.css";

export default function FiltrosMovil({
  album,
  buscador,
  rarezas,
  tipos,
  rarezaActiva,
  tipoActivo,
  onRareza,
  onTipo,
  buscando,
  consulta,
  onConsulta,
}) {
  return (
    <div className="filtros-movil">
      <div className="filtros-movil__selectores">
        <label className="filtro-pildora">
          <select
            className="cuerpo-p-fuerte"
            aria-label={album.filtros.rareza.titulo}
            value={rarezaActiva}
            onChange={(evento) => onRareza(evento.target.value)}
          >
            <option value="">{album.filtros.rareza.todas}</option>
            {rarezas.map((rareza) => (
              <option key={rareza.id} value={rareza.id}>
                {plantilla(album.filtros.rareza.valor, {
                  rareza: rareza.nombre,
                })}
              </option>
            ))}
          </select>
          <Icono nombre="chevronAbajo" />
        </label>

        <label className="filtro-pildora">
          <select
            className="cuerpo-p-fuerte"
            aria-label={album.filtros.tipo.titulo}
            value={tipoActivo}
            onChange={(evento) => onTipo(evento.target.value)}
          >
            <option value="">{album.filtros.tipo.todos}</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {plantilla(album.filtros.tipo.valor, {
                  tipo: album.filtros.tipo.opciones[tipo],
                })}
              </option>
            ))}
          </select>
          <Icono nombre="chevronAbajo" />
        </label>
      </div>

      {buscando && (
        <Campo
          id="buscador-mundo"
          type="search"
          etiqueta={buscador.aria}
          ocultarEtiqueta
          placeholder={buscador.placeholder}
          value={consulta}
          onChange={(evento) => onConsulta(evento.target.value)}
          autoFocus
        />
      )}
    </div>
  );
}
