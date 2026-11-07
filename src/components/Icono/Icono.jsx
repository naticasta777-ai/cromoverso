// Carga todos los SVG de assets/icons. El nombre del archivo (sin mayúsculas)
// es el nombre del ícono: <Icono nombre="chevronAbajo" />.
const modulos = import.meta.glob("../../assets/icons/*.svg", {
  eager: true,
  query: "?react",
  import: "default",
});

const ICONOS = Object.fromEntries(
  Object.entries(modulos).map(([ruta, Componente]) => [
    ruta.split("/").pop().replace(".svg", "").toLowerCase(),
    Componente,
  ]),
);

export function existeIcono(nombre) {
  return Boolean(nombre) && nombre.toLowerCase() in ICONOS;
}

export default function Icono({ nombre, className = "" }) {
  const Componente = ICONOS[nombre?.toLowerCase()];
  if (!Componente) return null;
  return (
    <Componente
      className={`icono ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    />
  );
}
