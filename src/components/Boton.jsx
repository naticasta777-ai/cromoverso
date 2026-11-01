import Icono from "./Icono.jsx";
import "./Boton.css";

const TEXTO = { g: "cuerpo-m-fuerte", m: "cuerpo-p-fuerte", p: "detalle-nota-fuerte" };

export default function Boton({
  como: Etiqueta = "button",
  variante = "primario",
  tamano = "g",
  icono,
  className = "",
  children,
  ...resto
}) {
  const propsBoton = Etiqueta === "button" ? { type: "button" } : {};
  const clases = ["boton", `boton--${variante}`, `boton--${tamano}`, TEXTO[tamano], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Etiqueta className={clases} {...propsBoton} {...resto}>
      {icono && <Icono nombre={icono} />}
      {children}
    </Etiqueta>
  );
}