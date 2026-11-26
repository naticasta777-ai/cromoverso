import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import { useSesion } from "../../context/SesionContext.jsx";
import Avatar from "../Avatar/Avatar.jsx";
import Icono from "../Icono/Icono.jsx";
import "./MenuCuenta.css";

// Menú de cuenta de escritorio: botón con el avatar y el nombre, y un panel con el
// perfil y «Cerrar sesión». textos = navbar.usuario de GET /textos.
export default function MenuCuenta({ textos }) {
  const { usuario, cerrarSesion } = useSesion();
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef(null);
  const boton = useRef(null);
  const idPanel = useId();

  // Se cierra con Escape (devolviendo el foco al botón) y al hacer clic fuera.
  useEffect(() => {
    if (!abierto) return undefined;
    function alPulsar(evento) {
      if (!raiz.current?.contains(evento.target)) setAbierto(false);
    }
    function alTeclear(evento) {
      if (evento.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    }
    document.addEventListener("pointerdown", alPulsar);
    document.addEventListener("keydown", alTeclear);
    return () => {
      document.removeEventListener("pointerdown", alPulsar);
      document.removeEventListener("keydown", alTeclear);
    };
  }, [abierto]);

  const primerNombre = usuario.nombre.split(" ")[0];

  return (
    <div
      className="menu-cuenta"
      ref={raiz}
      onBlur={(evento) => {
        // Si el foco sale del menú (con Tab), se cierra.
        if (!raiz.current?.contains(evento.relatedTarget)) setAbierto(false);
      }}
    >
      <button
        ref={boton}
        type="button"
        className="menu-cuenta__boton cuerpo-p-fuerte"
        aria-expanded={abierto}
        aria-controls={idPanel}
        aria-label={`${textos.menu}: ${usuario.nombre}`}
        onClick={() => setAbierto((valor) => !valor)}
      >
        <Avatar nombre={usuario.nombre} />
        <span className="menu-cuenta__nombre">{primerNombre}</span>
        <Icono nombre="chevronAbajo" />
      </button>

      {abierto && (
        <div id={idPanel} className="menu-cuenta__panel">
          <div className="menu-cuenta__identidad">
            <p className="cuerpo-m-fuerte">{usuario.nombre}</p>
            <p className="menu-cuenta__correo cuerpo-p">{usuario.correo}</p>
          </div>
          <Link
            to={RUTAS.perfil}
            className="menu-cuenta__item cuerpo-p-fuerte"
            onClick={() => setAbierto(false)}
          >
            {textos.perfil}
          </Link>
          <button
            type="button"
            className="menu-cuenta__item cuerpo-p-fuerte"
            onClick={() => {
              setAbierto(false);
              cerrarSesion();
            }}
          >
            {textos.cerrarSesion}
          </button>
        </div>
      )}
    </div>
  );
}
