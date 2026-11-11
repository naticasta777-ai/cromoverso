import { Link } from "react-router-dom";
import { iconoDeFigura } from "../../config/iconos.js";
import { rutaMundo } from "../../config/rutas.js";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import Icono from "../Icono/Icono.jsx";
import Tarjeta from "../Tarjeta/Tarjeta.jsx";
import "./TarjetaMundo.css";

export default function TarjetaMundo({ mundo, etiqueta, cantidad }) {
  return (
    <Tarjeta
      como={Link}
      to={rutaMundo(mundo.id)}
      fondo={`var(--mundo-${mundo.id}-suave, var(--fondo-sutil))`}
      className="tarjeta-mundo"
      style={{ "--color-mundo": mundo.color }}
    >
      <span className="tarjeta-mundo__arriba">
        <span className="tarjeta-mundo__emblema">
          <Icono nombre={iconoDeFigura(mundo.figura)} />
        </span>
        {etiqueta && <Etiqueta tono="alerta">{etiqueta}</Etiqueta>}
      </span>
      <span className="tarjeta-mundo__nombre titular-h4">{mundo.nombre}</span>
      <span className="tarjeta-mundo__cantidad cuerpo-p">{cantidad}</span>
    </Tarjeta>
  );
}
