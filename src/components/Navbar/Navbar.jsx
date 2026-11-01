import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import Boton from "../Boton.jsx";
import Icono from "../Icono.jsx";
import Marca from "../Marca/Marca.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import "./Navbar.css";

const ID_MENU = "menu-movil";

export default function Navbar({ nombre, idioma, onCambiarIdioma, textos, tonoMovil = "claro" }) {
  const [abierto, setAbierto] = useState(false);
  const menu = useRef(null);
  const botonMenu = useRef(null);
  const { pathname } = useLocation();

  const enlaces = [
    { clave: "inicio", ruta: RUTAS.inicio, texto: textos.inicio, icono: "inicio", activo: pathname === RUTAS.inicio },
    { clave: "mundos", ruta: RUTAS.mundos, texto: textos.mundos, icono: "mundo", activo: pathname.startsWith("/mundos") },
  ];

  useEffect(() => {
    const dialogo = menu.current;
    if (!dialogo) return;
    if (abierto && !dialogo.open) dialogo.showModal();
    if (!abierto && dialogo.open) dialogo.close();
  }, [abierto]);

  useEffect(() => {
    const consulta = window.matchMedia("(min-width: 64rem)");
    const alCambiar = (evento) => {
      if (evento.matches) setAbierto(false);
    };
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  function cerrar() {
    setAbierto(false);
  }

  function alCerrarDialogo() {
    setAbierto(false);
    botonMenu.current?.focus();
  }

  return (
    <header className={`navbar navbar--movil-${tonoMovil}`}>
      <div className="navbar__interior">
        <div className="navbar__izquierda">
          <Marca nombre={nombre} />
          <nav className="navbar__enlaces" aria-label={textos.principal}>
            <ul>
              {enlaces.map((enlace) => (
                <li key={enlace.clave}>
                  <Link
                    to={enlace.ruta}
                    className="navbar__enlace cuerpo-p-fuerte"
                    aria-current={enlace.activo ? "page" : undefined}
                  >
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="navbar__derecha">
          <div className="navbar__escritorio">
            <SelectorIdioma idioma={idioma} onCambiar={onCambiarIdioma} etiqueta={textos.idioma} />
          </div>
          <Boton como={Link} to={RUTAS.ingresar} variante="secundario" tamano="p">
            {textos.ingresar}
          </Boton>
          <div className="navbar__escritorio">
            <Boton como={Link} to={RUTAS.registro} variante="primario" tamano="p">
              {textos.registro}
            </Boton>
          </div>
          <MenuMovil
            abierto={abierto}
            onAlternar={() => setAbierto((valor) => !valor)}
            menuId={ID_MENU}
            botonRef={botonMenu}
            textos={textos}
          />
        </div>
      </div>

      <dialog
        ref={menu}
        id={ID_MENU}
        className="menu-movil"
        aria-label={textos.principal}
        onClose={alCerrarDialogo}
      >
        <div className="menu-movil__encabezado">
          <Marca nombre={nombre} />
          <button type="button" className="menu-movil__cerrar" aria-label={textos.cerrarMenu} onClick={cerrar}>
            <Icono nombre="cerrar" />
          </button>
        </div>

        <nav className="menu-movil__enlaces" aria-label={textos.principal}>
          <ul>
            {enlaces.map((enlace) => (
              <li key={enlace.clave}>
                <Link
                  to={enlace.ruta}
                  className="menu-movil__enlace cuerpo-m-fuerte"
                  aria-current={enlace.activo ? "page" : undefined}
                  onClick={cerrar}
                >
                  <Icono nombre={enlace.icono} />
                  <span className="menu-movil__texto">{enlace.texto}</span>
                  {enlace.activo ? (
                    <span className="menu-movil__marca detalle-etiqueta">{textos.estasAqui}</span>
                  ) : (
                    <Icono nombre="chevronDer" className="menu-movil__chevron" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu-movil__fila cuerpo-m-fuerte">
          <span>{textos.idioma}</span>
          <SelectorIdioma idioma={idioma} onCambiar={onCambiarIdioma} etiqueta={textos.idioma} />
        </div>

        <div className="menu-movil__sesion">
          <Boton como={Link} to={RUTAS.ingresar} variante="secundario" tamano="m" onClick={cerrar}>
            {textos.ingresar}
          </Boton>
          <Boton como={Link} to={RUTAS.registro} variante="primario" tamano="m" onClick={cerrar}>
            {textos.registro}
          </Boton>
        </div>
      </dialog>
    </header>
  );
}