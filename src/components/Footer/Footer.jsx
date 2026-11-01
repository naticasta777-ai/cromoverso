import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import Marca from "../Marca/Marca.jsx";
import "./Footer.css";

// Términos de uso no tiene vista todavía, por eso va como texto.
// Accesibilidad será un botón cuando exista el panel (onAccesibilidad).
export default function Footer({ nombre, textos, onAccesibilidad }) {
  return (
    <footer className="pie">
      <div className="contenedor pie__interior">
        <div className="pie__columnas">
          <div className="pie__marca">
            <Marca nombre={nombre} />
            <p className="pie__lema cuerpo-p">{textos.lema}</p>
          </div>

          <div className="pie__enlaces">
            <section className="pie__grupo">
              <h2 className="detalle-etiqueta">{textos.explora}</h2>
              <ul>
                <li>
                  <Link to={RUTAS.inicio} className="pie__enlace cuerpo-p">{textos.inicio}</Link>
                </li>
                <li>
                  <Link to={RUTAS.mundos} className="pie__enlace cuerpo-p">{textos.mundos}</Link>
                </li>
              </ul>
            </section>

            <section className="pie__grupo">
              <h2 className="detalle-etiqueta">{textos.cuenta}</h2>
              <ul>
                <li>
                  <Link to={RUTAS.ingresar} className="pie__enlace cuerpo-p">{textos.iniciarSesion}</Link>
                </li>
                <li>
                  <Link to={RUTAS.registro} className="pie__enlace cuerpo-p">{textos.registro}</Link>
                </li>
              </ul>
            </section>

            <section className="pie__grupo">
              <h2 className="detalle-etiqueta">{textos.legal}</h2>
              <ul>
                <li>
                  <span className="pie__enlace cuerpo-p">{textos.terminos}</span>
                </li>
                <li>
                  {onAccesibilidad ? (
                    <button type="button" className="pie__enlace cuerpo-p" onClick={onAccesibilidad}>
                      {textos.accesibilidad}
                    </button>
                  ) : (
                    <span className="pie__enlace cuerpo-p">{textos.accesibilidad}</span>
                  )}
                </li>
              </ul>
            </section>
          </div>
        </div>

        <p className="pie__creditos detalle-nota">
          © 2026 {nombre} · {textos.academico}
        </p>
      </div>
    </footer>
  );
}