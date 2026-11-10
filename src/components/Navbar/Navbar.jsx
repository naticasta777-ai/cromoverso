import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import { useAccesibilidad } from "../../context/AccesibilidadContext.jsx";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import Marca from "../Marca/Marca.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import "./Navbar.css";

const ID_MENU = "menu-movil";

// "fin" evita que Inicio (/) se marque como activo en todas las rutas.
const ENLACES = [
  { clave: "inicio", ruta: RUTAS.inicio, icono: "inicio", fin: true },
  { clave: "mundos", ruta: RUTAS.mundos, icono: "mundo", fin: false },
];

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

  // El menú móvil es un <dialog>: foco atrapado, Escape cierra y el resto queda inerte.
  useEffect(() => {
    const dialogo = menu.current;
    if (!dialogo) return;
    if (abierto && !dialogo.open) {
      try {
        dialogo.showModal();
      } catch {
        dialogo.setAttribute("open", "");
      }
    }
    if (!abierto && dialogo.open) dialogo.close();
  }, [abierto]);

  // Si la ventana pasa a escritorio con el menú abierto, se cierra.
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
    // Cierra primero el menú y después abre el panel, para que no se estorben.
    menu.current?.close();
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
              {ENLACES.map((enlace) => (
                <li key={enlace.clave}>
                  <NavLink
                    to={enlace.ruta}
                    end={enlace.fin}
                    className="navbar__enlace cuerpo-p-fuerte"
                  >
                    {navbar.enlaces[enlace.clave]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="navbar__derecha">
          <div className="navbar__escritorio">
            <SelectorIdioma idioma={idioma} onCambiar={onCambiarIdioma} />
          </div>
          <div className="navbar__escritorio">
            <button
              type="button"
              className="navbar__accesibilidad"
              aria-label={navbar.aria.accesibilidad}
              onClick={(evento) => abrirAccesibilidad(evento.currentTarget)}
            >
              <Icono nombre="accesibilidad" />
            </button>
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
            {ENLACES.map((enlace) => (
              <li key={enlace.clave}>
                <NavLink
                  to={enlace.ruta}
                  end={enlace.fin}
                  className="menu-movil__enlace cuerpo-m-fuerte"
                  onClick={cerrar}
                >
                  {({ isActive }) => (
                    <>
                      <Icono nombre={enlace.icono} />
                      <span className="menu-movil__texto">
                        {menuMovil.enlaces[enlace.clave]}
                      </span>
                      {isActive ? (
                        <span className="menu-movil__marca detalle-etiqueta">
                          {menuMovil.aria.estasAqui}
                        </span>
                      ) : (
                        <Icono
                          nombre="chevronDer"
                          className="menu-movil__chevron"
                        />
                      )}
                    </>
                  )}
                </NavLink>
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
