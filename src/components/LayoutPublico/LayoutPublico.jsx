import { proyecto } from "../../config/proyecto.js";
import { usePreferencias } from "../../context/PreferenciasContext.jsx";
import { useTextos } from "../../context/TextosContext.jsx";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import "./LayoutPublico.css";

export default function LayoutPublico({
  tonoMovil = "claro",
  sinNavbarMovil = false,
  children,
}) {
  const { idioma, cambiarIdioma } = usePreferencias();
  const textos = useTextos();
  const clases = `landing ${proyecto.id}${sinNavbarMovil ? " landing--sin-navbar-movil" : ""}`;

  return (
    <div className={clases}>
      <Navbar
        idioma={idioma}
        onCambiarIdioma={cambiarIdioma}
        textos={textos}
        tonoMovil={tonoMovil}
      />
      <main id="contenido">{children}</main>
      <Footer textos={textos} />
    </div>
  );
}
