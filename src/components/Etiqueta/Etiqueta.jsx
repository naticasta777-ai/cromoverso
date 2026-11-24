import "./Etiqueta.css";

export default function Etiqueta({
  tono = "neutro",
  className = "",
  children,
  ...resto
}) {
  const clases =
    `etiqueta etiqueta--${tono} detalle-nota-fuerte ${className}`.trim();
  return (
    <span className={clases} {...resto}>
      {children}
    </span>
  );
}
