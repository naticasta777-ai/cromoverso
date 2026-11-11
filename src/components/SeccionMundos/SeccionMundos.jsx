import { Link } from "react-router-dom";
import { rutaMundo } from "../../config/rutas.js";
import { plantilla } from "../../utils/textos.js";
import Icono from "../Icono/Icono.jsx";
import TarjetaMundo from "../TarjetaMundo/TarjetaMundo.jsx";
import "./SeccionMundos.css";

export default function SeccionMundos({ mundos, inicio }) {
  const textos = inicio.mundos;
  const primero = mundos[0];

  return (
    <section
      id="mundos"
      className="seccion-mundos"
      aria-labelledby="titulo-mundos"
    >
      <div className="contenedor seccion-mundos__interior">
        <div className="seccion-mundos__cabecera">
          <div>
            <h2 id="titulo-mundos" className="titular-h2">
              {textos.titulo}
            </h2>
            <p className="seccion-mundos__subtitulo cuerpo-m">
              {textos.subtitulo}
            </p>
          </div>
          {primero && (
            <Link
              to={rutaMundo(primero.id)}
              className="seccion-mundos__ver cuerpo-p-fuerte"
            >
              <Icono nombre="flechaDer" />
              <span>
                {plantilla(textos.enlaces.ver, { mundo: primero.nombre })}
              </span>
            </Link>
          )}
        </div>

        <ul className="seccion-mundos__lista">
          {mundos.map((mundo, indice) => (
            <li key={mundo.id}>
              <TarjetaMundo
                mundo={mundo}
                etiqueta={
                  indice === 0
                    ? plantilla(textos.etiquetas.mundo, { numero: indice + 1 })
                    : null
                }
                cantidad={plantilla(textos.etiquetas.cromos, {
                  cantidad: mundo.totalCromos,
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
