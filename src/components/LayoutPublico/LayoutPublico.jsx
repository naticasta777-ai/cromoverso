import { proyecto } from "../../config/proyecto.js";
import { useInterfaz, usePreferencias } from "../../context/PreferenciasContext.jsx";
import Footer from "../Footer/Footer.jsx";
import GestorCookies from "../GestorCookies/GestorCookies.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import SaltarContenido from "../SaltarContenido/SaltarContenido.jsx";
import "./LayoutPublico.css";

export default function LayoutPublico({ tonoMovil = "claro", children }) {
  const { idioma, cambiarIdioma } = usePreferencias();
  const textos = useInterfaz();

  return (
    <div className={`landing ${proyecto.id}`}>
      <SaltarContenido texto={textos.saltar} />
      <Navbar
        nombre={proyecto.nombre}
        idioma={idioma}
        onCambiarIdioma={cambiarIdioma}
        textos={textos}
        tonoMovil={tonoMovil}
      />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <Footer nombre={proyecto.nombre} textos={textos} />
      <GestorCookies />
    </div>
  );
}