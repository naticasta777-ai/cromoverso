import { Link } from "react-router-dom";
import { rutaCromo } from "../../config/rutas.js";
import { plantilla } from "../../utils/textos.js";
import Cromo from "../Cromo/Cromo.jsx";
import Icono from "../Icono/Icono.jsx";
import "./AbanicoCromos.css";

const POSICIONES = ["izquierda", "centro", "derecha"];

export default function AbanicoCromos({
  heroes,
  rarezas,
  guardiana,
  plantillaTipo,
  tipos,
}) {
  if (heroes.length === 0) return null;

  return (
    <div className="abanico">
      {heroes.map((cromo, indice) => {
        const posicion = POSICIONES[indice];
        const rareza = rarezas.find((item) => item.id === cromo.rareza) ?? {
          id: cromo.rareza,
          nombre: cromo.rareza,
        };
        const detalle = plantilla(plantillaTipo, {
          mundo: cromo.mundoNombre,
          tipo: tipos[cromo.tipo] ?? cromo.tipo,
        });

        return (
          <Link
            key={cromo.id}
            to={rutaCromo(cromo.id)}
            className={`cromo-enlace abanico__carta abanico__carta--${posicion}`}
          >
            <Cromo cromo={cromo} rareza={rareza} tamano="g" detalle={detalle} />
            {posicion === "centro" && (
              <span className="abanico__sello detalle-etiqueta">
                <Icono nombre="destellos" />
                {guardiana}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
