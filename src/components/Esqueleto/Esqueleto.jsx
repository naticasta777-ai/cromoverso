import "./Esqueleto.css";

// Bloque gris animado. Quien lo usa lo marca con aria-hidden y avisa con un texto
// oculto de estados.cargando.
export default function Esqueleto({ className = "" }) {
  return <span className={`esqueleto ${className}`.trim()} />;
}

export function EsqueletoCromo() {
  return <span className="esqueleto esqueleto-cromo" aria-hidden="true" />;
}

// Esqueleto de toda la vista 2: cabecera, barra lateral y cuadrícula.
export function EsqueletoCatalogo({ texto }) {
  return (
    <div role="status" aria-busy="true">
      <span className="visualmente-oculto">{texto}</span>

      <div className="esq-catalogo__cabecera" aria-hidden="true">
        <div className="contenedor esq-catalogo__cabecera-interior">
          <Esqueleto className="esq-linea esq-linea--corta" />
          <Esqueleto className="esq-titulo" />
          <Esqueleto className="esq-linea esq-linea--media" />
        </div>
      </div>

      <div className="contenedor esq-catalogo__cuerpo" aria-hidden="true">
        <div className="esq-catalogo__barra">
          <Esqueleto className="esq-panel" />
          <Esqueleto className="esq-panel" />
          <Esqueleto className="esq-panel" />
        </div>
        <ul className="esq-catalogo__grilla">
          {Array.from({ length: 10 }, (_, indice) => (
            <li key={indice}>
              <EsqueletoCromo />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Esqueleto de la vista 3: carta a la izquierda y la información a la derecha.
export function EsqueletoFicha({ texto }) {
  return (
    <div
      className="contenedor esq-ficha-contenedor"
      role="status"
      aria-busy="true"
    >
      <span className="visualmente-oculto">{texto}</span>
      <div className="esq-ficha" aria-hidden="true">
        <Esqueleto className="esq-ficha__carta" />
        <div className="esq-ficha__info">
          <Esqueleto className="esq-linea esq-linea--corta" />
          <Esqueleto className="esq-titulo" />
          <Esqueleto className="esq-ficha__poder" />
          <Esqueleto className="esq-linea" />
          <Esqueleto className="esq-linea esq-linea--media" />
          <Esqueleto className="esq-ficha__atributos" />
        </div>
      </div>
    </div>
  );
}