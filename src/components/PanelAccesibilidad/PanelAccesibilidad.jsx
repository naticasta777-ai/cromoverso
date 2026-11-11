import { useEffect, useId, useRef } from "react";
import { useAccesibilidad } from "../../context/AccesibilidadContext.jsx";
import { useTextos } from "../../context/TextosContext.jsx";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import "./PanelAccesibilidad.css";

const TAMANOS = ["normal", "grande", "muyGrande"];
const INTERRUPTORES = [
  "altoContraste",
  "reducirMovimiento",
  "subrayarEnlaces",
  "fuenteLecturaFacil",
];

export default function PanelAccesibilidad() {
  const textos = useTextos().accesibilidad;
  const { abierto, cerrar, preferencias, actualizar, restablecer } =
    useAccesibilidad();
  const dialogo = useRef(null);
  const base = useId();
  const idTitulo = `${base}-titulo`;
  const idTamano = `${base}-tamano`;

  useEffect(() => {
    const elemento = dialogo.current;
    if (abierto && !elemento.open) elemento.showModal();
    if (!abierto && elemento.open) elemento.close();
  }, [abierto]);

  return (
    <dialog
      ref={dialogo}
      className="panel-accesibilidad"
      aria-labelledby={idTitulo}
      onClose={cerrar}
      onClick={(evento) => {
        if (evento.target === dialogo.current) cerrar();
      }}
    >
      <div className="panel-accesibilidad__contenido">
        <div className="panel-accesibilidad__encabezado">
          <h2 id={idTitulo} className="titular-h3">
            {textos.titulo}
          </h2>
          <button
            type="button"
            className="panel-accesibilidad__cerrar"
            aria-label={textos.titulo}
            onClick={cerrar}
          >
            <Icono nombre="cerrar" />
          </button>
        </div>

        <div className="panel-accesibilidad__tamano">
          <p id={idTamano} className="cuerpo-m-fuerte">
            {textos.tamanoTexto.titulo}
          </p>
          <div
            className="control-tamano"
            role="radiogroup"
            aria-labelledby={idTamano}
          >
            {TAMANOS.map((clave) => (
              <label key={clave} className="control-tamano__opcion">
                <input
                  type="radio"
                  name={`${base}-tamano`}
                  checked={preferencias.tamano === clave}
                  onChange={() => actualizar({ tamano: clave })}
                />
                <span className="cuerpo-p-fuerte">
                  {textos.tamanoTexto.opciones[clave]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <ul className="panel-accesibilidad__opciones">
          {INTERRUPTORES.map((clave) => (
            <li key={clave}>
              <label className="interruptor">
                <span className="interruptor__texto">
                  <span id={`${base}-${clave}`} className="cuerpo-m-fuerte">
                    {textos[clave].titulo}
                  </span>
                  <span id={`${base}-${clave}-ayuda`} className="cuerpo-p">
                    {textos[clave].ayuda}
                  </span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={preferencias[clave]}
                  aria-labelledby={`${base}-${clave}`}
                  aria-describedby={`${base}-${clave}-ayuda`}
                  onChange={(evento) =>
                    actualizar({ [clave]: evento.target.checked })
                  }
                />
                <span className="interruptor__pista" aria-hidden="true">
                  <span className="interruptor__perilla" />
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="panel-accesibilidad__pie">
          <span className="panel-accesibilidad__declaracion cuerpo-p-fuerte">
            {textos.enlaces.declaracion}
          </span>
          <Boton
            variante="secundario"
            tamano="m"
            className="panel-accesibilidad__restablecer"
            onClick={restablecer}
          >
            {textos.botones.restablecer}
          </Boton>
        </div>
      </div>
    </dialog>
  );
}
