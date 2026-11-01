import "./SaltarContenido.css";

export default function SaltarContenido({ texto }) {
  return (
    <a className="saltar-contenido cuerpo-p-fuerte" href="#contenido">
      {texto}
    </a>
  );
}