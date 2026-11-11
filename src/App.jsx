import SelectorIdioma from "./components/SelectorIdioma/SelectorIdioma.jsx";
import { usePreferencias } from "./context/PreferenciasContext.jsx";
import { useTextos } from "./context/TextosContext.jsx";

// Página temporal para revisar el idioma (S1-05). El PR de navegación la reemplaza.
export default function App() {
  const { idioma, cambiarIdioma } = usePreferencias();
  const textos = useTextos();

  return (
    <main
      id="contenido"
      className="contenedor"
      style={{
        display: "grid",
        gap: "var(--espacio-5)",
        paddingBlock: "var(--espacio-6)",
      }}
    >
      <SelectorIdioma idioma={idioma} onCambiar={cambiarIdioma} />
      <h1 className="titular-h1">{textos.paginas.inicio.hero.titulo}</h1>
      <p className="cuerpo-m">{textos.footer.lema}</p>
    </main>
  );
}
