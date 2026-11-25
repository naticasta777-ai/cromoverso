import { useId, useState } from "react";
import Icono from "../Icono/Icono.jsx";
import "../Campo/Campo.css";
import "./CampoClave.css";

const ATRIBUTOS_SVG = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

function OjoAbierto() {
  return (
    <svg {...ATRIBUTOS_SVG}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function OjoTachado() {
  return (
    <svg {...ATRIBUTOS_SVG}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1" />
      <path d="M6.6 6.6C3.9 8.3 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

// Campo de contraseña con botón para mostrarla u ocultarla. El botón dice su estado
// a los lectores de pantalla con su etiqueta («Mostrar contraseña» / «Ocultar contraseña»).
export default function CampoClave({
  etiqueta,
  textoMostrar,
  textoOcultar,
  error,
  id,
  className = "",
  ...resto
}) {
  const idAuto = useId();
  const idCampo = id ?? idAuto;
  const idMensaje = `${idCampo}-mensaje`;
  const [visible, setVisible] = useState(false);

  return (
    <div className={`campo ${className}`.trim()}>
      <label htmlFor={idCampo} className="campo__etiqueta cuerpo-p-fuerte">
        {etiqueta}
      </label>
      <div className="campo-clave">
        <input
          id={idCampo}
          className="campo__caja campo-clave__caja cuerpo-m"
          type={visible ? "text" : "password"}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? idMensaje : undefined}
          {...resto}
        />
        <button
          type="button"
          className="campo-clave__ojo"
          aria-label={visible ? textoOcultar : textoMostrar}
          aria-controls={idCampo}
          onClick={() => setVisible((valor) => !valor)}
        >
          {visible ? <OjoTachado /> : <OjoAbierto />}
        </button>
      </div>
      {error && (
        <p id={idMensaje} className="campo__ayuda campo__ayuda--error detalle-nota">
          <Icono nombre="alerta" />
          {error}
        </p>
      )}
    </div>
  );
}