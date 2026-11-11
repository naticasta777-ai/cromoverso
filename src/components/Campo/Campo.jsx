import { useId } from "react";
import Icono from "../Icono/Icono.jsx";
import "./Campo.css";

export default function Campo({
  etiqueta,
  ayuda,
  error,
  ocultarEtiqueta = false,
  id,
  className = "",
  ...resto
}) {
  const idAuto = useId();
  const idCampo = id ?? idAuto;
  const idMensaje = `${idCampo}-mensaje`;
  const mensaje = error || ayuda;

  return (
    <div className={`campo ${className}`.trim()}>
      <label
        htmlFor={idCampo}
        className={`campo__etiqueta cuerpo-p-fuerte${ocultarEtiqueta ? " visualmente-oculto" : ""}`}
      >
        {etiqueta}
      </label>
      <input
        id={idCampo}
        className="campo__caja cuerpo-m"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={mensaje ? idMensaje : undefined}
        {...resto}
      />
      {mensaje && (
        <p
          id={idMensaje}
          className={`campo__ayuda detalle-nota${error ? " campo__ayuda--error" : ""}`}
        >
          {error && <Icono nombre="alerta" />}
          {mensaje}
        </p>
      )}
    </div>
  );
}