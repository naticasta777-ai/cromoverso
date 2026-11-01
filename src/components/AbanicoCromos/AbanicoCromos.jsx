import { Link } from "react-router-dom";
import { rutaCromo } from "../../config/rutas.js";
import Cromo from "../Cromo/Cromo.jsx";
import Icono from "../Icono/Icono.jsx";
import "./AbanicoCromos.css";

const POSICIONES = ["izquierda", "centro", "derecha"];

export default function AbanicoCromos({ heroes, rarezas, textos }) {
  if (heroes.length === 0) return null;

  return (
    <div className="abanico">
      {heroes.map((cromo, indice) => {
        const posicion = POSICIONES[indice];
        const rareza = rarezas.find((item) => item.id === cromo.rareza);
        return (
          <Link
            key={cromo.id}
            to={rutaCromo(cromo.id)}
            className={`abanico__carta abanico__carta--${posicion}`}
          >
            <Cromo
              cromo={cromo}
              rareza={rareza}
              detalle={`${cromo.mundoNombre} • ${textos.tipos[cromo.tipo]}`}
            />
            {posicion === "centro" && (
              <span className="abanico__sello detalle-etiqueta">
                <Icono nombre="destellos" />
                {textos.guardiana}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}