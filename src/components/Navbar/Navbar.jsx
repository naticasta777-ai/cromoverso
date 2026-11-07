import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import { useAccesibilidad } from "../../context/AccesibilidadContext.jsx";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import Marca from "../Marca/Marca.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import "./Navbar.css";

const ID_MENU = "menu-movil";

export default function Navbar({
  idioma,
  onCambiarIdioma,
  textos,
  tonoMovil = "claro",
}) {
  const { navbar, menuMovil } = textos;
  const { abrir: abrirAccesibilidad } = useAccesibilidad();
  const [abierto, setAbierto] = useState(false);
  const menu = useRef(null);
  const botonMenu = useRef(null);
  const { pathname } = useLocation();

  const enlaces = [
    {
      clave: "inicio",
      ruta: RUTAS.inicio,
      icono: "inicio",
      activo: pathname === RUTAS.inicio,
    },
    {
      clave: "mundos",
      ruta: RUTAS.mundos,
      icono: "mundo",
      activo: pathname.startsWith(RUTAS.mundos),
    },
  ];

  // El menú móvil es un <dialog>: foco atrapado, Escape cierra y el resto queda inerte.
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

  function abrirOpcionesAccesibilidad() {
    setAbierto(false);
    abrirAccesibilidad(botonMenu.current);
  }

  return (
    <header className={`navbar navbar--movil-${tonoMovil}`}>
      <div className="navbar__interior">
        <div className="navbar__izquierda">
          <Marca />
          <nav className="navbar__enlaces">
            <ul>
              {enlaces.map((enlace) => (
                <li key={enlace.clave}>
                  <Link
                    to={enlace.ruta}
                    className="navbar__enlace cuerpo-p-fuerte"
                    aria-current={enlace.activo ? "page" : undefined}
                  >
                    {navbar.enlaces[enlace.clave]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="navbar__derecha">
          <div className="navbar__escritorio">
            <SelectorIdioma idioma={idioma} onCambiar={onCambiarIdioma} />
          </div>
          <Boton
            como={Link}
            to={RUTAS.ingresar}
            variante="secundario"
            tamano="p"
          >
            {navbar.botones.ingresar}
          </Boton>
          <div className="navbar__escritorio">
            <Boton
              como={Link}
              to={RUTAS.registro}
              variante="primario"
              tamano="p"
            >
              {navbar.botones.crearCuenta}
            </Boton>
          </div>
          <MenuMovil
            abierto={abierto}
            onAlternar={() => setAbierto((valor) => !valor)}
            menuId={ID_MENU}
            botonRef={botonMenu}
            textos={menuMovil}
          />
        </div>
      </div>

      <dialog
        ref={menu}
        id={ID_MENU}
        className="menu-movil"
        aria-label={navbar.logo.texto}
        onClose={() => setAbierto(false)}
      >
        <div className="menu-movil__encabezado">
          <Marca onClick={cerrar} />
          <button
            type="button"
            className="menu-movil__cerrar"
            aria-label={menuMovil.cerrar}
            onClick={cerrar}
          >
            <Icono nombre="cerrar" />
          </button>
        </div>

        <nav className="menu-movil__enlaces">
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
                  <span className="menu-movil__texto">
                    {menuMovil.enlaces[enlace.clave]}
                  </span>
                  {enlace.activo ? (
                    <span className="menu-movil__marca detalle-etiqueta">
                      {menuMovil.aria.estasAqui}
                    </span>
                  ) : (
                    <Icono
                      nombre="chevronDer"
                      className="menu-movil__chevron"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu-movil__fila cuerpo-m-fuerte">
          <span>{menuMovil.secciones.idioma}</span>
          <SelectorIdioma idioma={idioma} onCambiar={onCambiarIdioma} />
        </div>

        <div className="menu-movil__fila cuerpo-m-fuerte">
          <span>{menuMovil.secciones.accesibilidad}</span>
          <button
            type="button"
            className="menu-movil__accesibilidad"
            aria-label={navbar.aria.accesibilidad}
            onClick={abrirOpcionesAccesibilidad}
          >
            <Icono nombre="accesibilidad" />
          </button>
        </div>

        <div className="menu-movil__sesion">
          <Boton
            como={Link}
            to={RUTAS.ingresar}
            variante="secundario"
            tamano="m"
            onClick={cerrar}
          >
            {menuMovil.botones.ingresar}
          </Boton>
          <Boton
            como={Link}
            to={RUTAS.registro}
            variante="primario"
            tamano="m"
            onClick={cerrar}
          >
            {menuMovil.botones.crearCuenta}
          </Boton>
        </div>
      </dialog>
    </header>
  );
}
