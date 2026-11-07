import { iconoDeRareza } from "../../config/iconos.js";
import Icono from "../Icono/Icono.jsx";
import "./EtiquetaRareza.css";

export default function EtiquetaRareza({ id, nombre, icono, className = "" }) {
  const clases =
    `etiqueta-rareza etiqueta-rareza--${id} detalle-etiqueta ${className}`.trim();
  return (
    <span className={clases}>
      <Icono nombre={iconoDeRareza(id, icono)} />
      {nombre}
    </span>
  );
}
