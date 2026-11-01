import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import Icono from "../Icono.jsx";
import "./Marca.css";

export default function Marca({ nombre, className = "" }) {
  return (
    <Link to={RUTAS.inicio} className={`marca-home ${className}`.trim()}>
      <span className="marca-home__emblema" aria-hidden="true">
        <Icono nombre="estrella" />
      </span>
      <span className="marca-home__nombre titular-h3">{nombre.toLowerCase()}</span>
    </Link>
  );
}