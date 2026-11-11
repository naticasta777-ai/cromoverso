import { useTextos } from "../../context/TextosContext.jsx";
import "./SelectorIdioma.css";

export default function SelectorIdioma({ idioma, onCambiar }) {
  const textos = useTextos().idioma;

  return (
    <div className="idiomas-home" role="group" aria-label={textos.etiqueta}>
      {Object.keys(textos.codigos).map((valor) => (
        <button
          type="button"
          key={valor}
          lang={valor}
          className="cuerpo-p-fuerte"
          aria-pressed={idioma === valor}
          onClick={() => onCambiar(valor)}
        >
          {textos.codigos[valor]}
        </button>
      ))}
    </div>
  );
}
