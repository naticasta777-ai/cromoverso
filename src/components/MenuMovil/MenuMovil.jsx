import Icono from "../Icono/Icono.jsx";
import "./MenuMovil.css";

export default function MenuMovil({ abierto, onAlternar, menuId, botonRef, textos }) {
  return (
    <button
      type="button"
      ref={botonRef}
      className="boton-menu"
      aria-label={abierto ? textos.cerrarMenu : textos.abrirMenu}
      aria-expanded={abierto}
      aria-controls={menuId}
      onClick={onAlternar}
    >
      <Icono nombre={abierto ? "cerrar" : "menu"} />
    </button>
  );
}