import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import { numeroDeCromo, plantilla } from "../../utils/textos.js";
import { textoLegibleSobre } from "../../utils/contraste.js";
import Icono from "../Icono/Icono.jsx";
import "./CabeceraMundo.css";

export default function CabeceraMundo({
  mundo,
  numero,
  album,
  buscador,
  buscando,
  onBuscar,
}) {
  const rango = plantilla(album.encabezado.rango, {
    numero,
    desde: numeroDeCromo(mundo.numeros.desde),
    hasta: numeroDeCromo(mundo.numeros.hasta),
  });

  return (
    <header
      className="cabecera-mundo"
      style={{
        "--color-mundo": mundo.color,
        "--texto-cabecera": textoLegibleSobre(mundo.color),
      }}
    >
      {/* Escritorio */}
      <div className="cabecera-mundo__escritorio contenedor">
        <nav>
          <ol className="cabecera-mundo__migas cuerpo-p">
            <li>
              <Link to={RUTAS.inicio} className="cuerpo-p-fuerte">
                {album.migas.inicio}
              </Link>
            </li>
            <li aria-hidden="true">
              <Icono nombre="chevronDer" />
            </li>
            <li aria-current="page">{mundo.nombre}</li>
          </ol>
        </nav>
        <h1 className="titular-display">{mundo.nombre}</h1>
        <p className="cuerpo-g">
          {rango} {mundo.tema}
        </p>
      </div>

      {/* Móvil */}
      <div className="cabecera-mundo__movil">
        <Link
          to={RUTAS.inicio}
          className="cabecera-mundo__boton"
          aria-label={album.migas.inicio}
        >
          <Icono nombre="flechaIzq" />
        </Link>
        <div className="cabecera-mundo__nombres">
          <h1 className="titular-h3">{mundo.nombre}</h1>
          <p className="detalle-nota">{mundo.tema}</p>
        </div>
        <button
          type="button"
          className="cabecera-mundo__boton"
          aria-label={buscador.aria}
          aria-expanded={buscando}
          aria-controls="buscador-mundo"
          onClick={onBuscar}
        >
          <Icono nombre="buscar" />
        </button>
      </div>
    </header>
  );
}
