import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import { useTextos } from "../../context/TextosContext.jsx";
import Icono from "../Icono/Icono.jsx";
import "./Marca.css";

export default function Marca({ className = "", onClick }) {
  const { logo } = useTextos().navbar;

  return (
    <Link
      to={RUTAS.inicio}
      className={`marca-home ${className}`.trim()}
      aria-label={logo.aria}
      onClick={onClick}
    >
      <span className="marca-home__emblema" aria-hidden="true">
        <Icono nombre="estrella" />
      </span>
      <span className="marca-home__nombre titular-h3">{logo.texto}</span>
    </Link>
  );
}
