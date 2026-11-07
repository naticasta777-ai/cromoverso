import { RESPALDO } from "../../config/respaldo.js";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import "./PantallaInicial.css";

// Se muestra mientras llegan los primeros textos de la API (o si fallan).
export default function PantallaInicial({ fallo, idioma, onReintentar }) {
  if (!fallo) {
    return (
      <div className="pantalla-inicial" role="status" aria-busy="true">
        <span className="pantalla-inicial__giro" aria-hidden="true" />
      </div>
    );
  }

  const texto = RESPALDO[idioma] ?? RESPALDO.es;
  return (
    <div className="pantalla-inicial" role="alert">
      <Icono nombre="wifioff" className="pantalla-inicial__icono" />
      <h1 className="titular-h2">{texto.titulo}</h1>
      <p className="cuerpo-m">{texto.texto}</p>
      <Boton tamano="m" onClick={onReintentar}>
        {texto.reintentar}
      </Boton>
    </div>
  );
}
