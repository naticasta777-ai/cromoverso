import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import { useAccesibilidad } from "../../context/AccesibilidadContext.jsx";
import { plantilla } from "../../utils/textos.js";
import Marca from "../Marca/Marca.jsx";
import "./Footer.css";

export default function Footer({ textos }) {
  const { footer } = textos;
  const { columnas } = footer;
  const { abrir: abrirAccesibilidad } = useAccesibilidad();

  return (
    <footer className="pie">
      <div className="contenedor pie__interior">
        <div className="pie__columnas">
          <div className="pie__marca">
            <Marca />
            <p className="pie__lema cuerpo-p">{footer.lema}</p>
          </div>

          <div className="pie__enlaces">
            <section className="pie__grupo">
              <h2 className="detalle-etiqueta">{columnas.explora.titulo}</h2>
              <ul>
                <li>
                  <Link to={RUTAS.inicio} className="pie__enlace cuerpo-p">
                    {columnas.explora.enlaces.inicio}
                  </Link>
                </li>
                <li>
                  <Link to={RUTAS.mundos} className="pie__enlace cuerpo-p">
                    {columnas.explora.enlaces.mundos}
                  </Link>
                </li>
              </ul>
            </section>

            <section className="pie__grupo">
              <h2 className="detalle-etiqueta">{columnas.cuenta.titulo}</h2>
              <ul>
                <li>
                  <Link to={RUTAS.ingresar} className="pie__enlace cuerpo-p">
                    {columnas.cuenta.enlaces.ingresar}
                  </Link>
                </li>
                <li>
                  <Link to={RUTAS.registro} className="pie__enlace cuerpo-p">
                    {columnas.cuenta.enlaces.crearCuenta}
                  </Link>
                </li>
              </ul>
            </section>

            <section className="pie__grupo">
              <h2 className="detalle-etiqueta">{columnas.legal.titulo}</h2>
              <ul>
                <li>
                  <span className="pie__enlace cuerpo-p">
                    {columnas.legal.enlaces.terminos}
                  </span>
                </li>
                <li>
                  <button
                    type="button"
                    className="pie__enlace cuerpo-p"
                    onClick={(evento) =>
                      abrirAccesibilidad(evento.currentTarget)
                    }
                  >
                    {columnas.legal.enlaces.accesibilidad}
                  </button>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <p className="pie__creditos detalle-nota">
          {plantilla(footer.legal.derechos, { anio: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
