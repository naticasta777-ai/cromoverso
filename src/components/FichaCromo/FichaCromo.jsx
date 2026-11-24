import { useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { rutaCromo } from "../../config/rutas.js";
import { useTextos } from "../../context/TextosContext.jsx";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import { puntosEstrella } from "../../utils/estrella.js";
import { numeroDeCromo, plantilla } from "../../utils/textos.js";
import BarraAtributo from "../BarraAtributo/BarraAtributo.jsx";
import Boton from "../Boton/Boton.jsx";
import Cromo from "../Cromo/Cromo.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import EtiquetaRareza from "../EtiquetaRareza/EtiquetaRareza.jsx";
import Icono from "../Icono/Icono.jsx";
import "./FichaCromo.css";

const ATRIBUTOS = ["fuerza", "velocidad", "mente", "energia"];
const RAYOS = puntosEstrella({
  puntas: 16,
  radioExterior: 100,
  radioInterior: 55,
});

// Detalle de un cromo: ventana en escritorio y hoja inferior en móvil.
export default function FichaCromo({
  cromo,
  rareza,
  posicion,
  anterior,
  siguiente,
  onCerrar,
}) {
  const textos = useTextos();
  const detalle = textos.paginas.detalleCromo;
  const album = textos.paginas.albumMundo;
  const escritorio = useMediaQuery("(min-width: 64rem)");
  const idTitulo = useId();
  const idAtributos = useId();
  const dialogo = useRef(null);

  // Se abre como diálogo modal: foco atrapado, Escape cierra y el fondo queda inerte.
  useEffect(() => {
    const elemento = dialogo.current;
    if (!elemento.open) elemento.showModal();
    return () => {
      if (elemento.open) elemento.close();
    };
  }, []);

  const tipo = detalle.encabezado.tipos[cromo.tipo] ?? cromo.tipo;
  const total = ATRIBUTOS.reduce(
    (suma, clave) => suma + cromo.atributos[clave],
    0,
  );
  const ubicacion = posicion
    ? plantilla(detalle.encabezado.ubicacion, {
        id: cromo.id,
        mundo: cromo.mundoNombre,
        posicion,
      })
    : cromo.id;
  const mundoYTipo = plantilla(album.tarjeta.tipo, {
    mundo: cromo.mundoNombre,
    tipo,
  });

  return (
    <dialog
      ref={dialogo}
      className="ficha"
      aria-labelledby={idTitulo}
      style={{
        "--color-cromo": cromo.ilustracion?.colorBase,
        "--suave-cromo": `var(--mundo-${cromo.mundo}-suave, var(--marca-primario-suave))`,
      }}
      onCancel={(evento) => {
        evento.preventDefault();
        onCerrar();
      }}
      onClick={(evento) => {
        if (evento.target === dialogo.current) onCerrar();
      }}
    >
      <div className="ficha__contenido">
        <span className="ficha__asa" aria-hidden="true" />

        <button
          type="button"
          className="ficha__cerrar"
          aria-label={detalle.botones.cerrar}
          onClick={onCerrar}
        >
          <Icono nombre="cerrar" />
        </button>

        <div className="ficha__carta">
          <svg
            className="ficha__rayos"
            viewBox="-100 -100 200 200"
            aria-hidden="true"
            focusable="false"
          >
            <polygon points={RAYOS} />
          </svg>
          <div className="ficha__carta-interior">
            <Cromo
              cromo={cromo}
              rareza={rareza}
              tamano={escritorio ? "g" : "m"}
              detalle={mundoYTipo}
            />
          </div>
        </div>

        <div className="ficha__etiquetas">
          <EtiquetaRareza
            id={rareza.id}
            nombre={rareza.nombre}
            icono={rareza.icono}
          />
          <Etiqueta tono="marca">{cromo.mundoNombre}</Etiqueta>
          <Etiqueta tono="neutro">{tipo}</Etiqueta>
        </div>

        <div className="ficha__titulo">
          <p className="ficha__codigo dato-numero-de-cromo">{cromo.id}</p>
          <p className="ficha__ubicacion detalle-nota-fuerte">{ubicacion}</p>
          <h1 id={idTitulo} className="ficha__nombre titular-h3">
            {cromo.nombre}
          </h1>
          <p className="ficha__mundo-tipo cuerpo-p">{mundoYTipo}</p>
          <EtiquetaRareza
            className="ficha__rareza-movil"
            id={rareza.id}
            nombre={rareza.nombre}
            icono={rareza.icono}
          />
        </div>

        <div className="ficha__poder">
          <span className="ficha__poder-circulo" aria-hidden="true">
            <Icono nombre="rayo" />
          </span>
          <div className="ficha__poder-contenido">
            <p className="ficha__poder-etiqueta detalle-etiqueta">
              <Icono nombre="rayo" className="ficha__poder-mini" />
              {detalle.poder.titulo}
            </p>
            <p className="cuerpo-m-fuerte">{cromo.poder}</p>
          </div>
        </div>

        <p className="ficha__descripcion cuerpo-m">{cromo.descripcion}</p>

        <section className="ficha__atributos" aria-labelledby={idAtributos}>
          <div className="ficha__atributos-encabezado">
            <h2 id={idAtributos} className="titular-h4">
              {detalle.atributos.titulo}
            </h2>
            <p className="ficha__total cuerpo-p-fuerte">
              {plantilla(detalle.atributos.total, { total })}
            </p>
          </div>
          <ul className="ficha__lista-atributos">
            {ATRIBUTOS.map((clave) => (
              <li key={clave}>
                <BarraAtributo
                  etiqueta={detalle.atributos.nombres[clave]}
                  valor={cromo.atributos[clave]}
                />
              </li>
            ))}
          </ul>
          <p className="ficha__escala detalle-nota">
            {detalle.atributos.escala}
          </p>
        </section>

        <nav className="ficha__navegacion" aria-label={cromo.mundoNombre}>
          {anterior ? (
            <Boton
              como={Link}
              to={rutaCromo(anterior.id)}
              replace
              variante="fantasma"
              tamano="p"
              aria-label={`${detalle.navegacion.anterior}: ${numeroDeCromo(anterior.numero)} ${anterior.nombre}`}
            >
              <Icono nombre="chevronIzq" />
              {numeroDeCromo(anterior.numero)} {anterior.nombre}
            </Boton>
          ) : (
            <span />
          )}
          {siguiente ? (
            <Boton
              como={Link}
              to={rutaCromo(siguiente.id)}
              replace
              variante="fantasma"
              tamano="p"
              aria-label={`${detalle.navegacion.siguiente}: ${numeroDeCromo(siguiente.numero)} ${siguiente.nombre}`}
            >
              {numeroDeCromo(siguiente.numero)} {siguiente.nombre}
              <Icono nombre="chevronDer" />
            </Boton>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </dialog>
  );
}
