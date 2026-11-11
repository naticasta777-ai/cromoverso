import "./Tarjeta.css";

export default function Tarjeta({
  como: Etiqueta = "div",
  fondo,
  className = "",
  style,
  children,
  ...resto
}) {
  const estilo = fondo ? { "--tarjeta-fondo": fondo, ...style } : style;
  return (
    <Etiqueta
      className={`tarjeta ${className}`.trim()}
      style={estilo}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
}