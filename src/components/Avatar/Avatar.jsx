import "./Avatar.css";

// «Laura Cardona» → «LC»
function iniciales(nombre) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join("");
}

export default function Avatar({ nombre, className = "" }) {
  return (
    <span
      className={`avatar detalle-nota-fuerte ${className}`.trim()}
      role="img"
      aria-label={nombre}
    >
      {iniciales(nombre)}
    </span>
  );
}
