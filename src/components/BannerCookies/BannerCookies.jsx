import { useId } from "react";
import Boton from "../Boton.jsx";
import "./BannerCookies.css";

export default function BannerCookies({ textos, onAceptar, onRechazar }) {
  const idTitulo = useId();
  return (
    <aside className="banner-cookies" aria-labelledby={idTitulo}>
      <div className="banner-cookies__texto">
        <h2 id={idTitulo} className="cuerpo-m-fuerte">{textos.cookiesTitulo}</h2>
        <p className="cuerpo-p">{textos.cookiesTexto}</p>
      </div>
      <div className="banner-cookies__acciones">
        <Boton variante="secundario" tamano="m" onClick={onRechazar}>
          {textos.rechazar}
        </Boton>
        <Boton variante="primario" tamano="m" onClick={onAceptar}>
          {textos.aceptar}
        </Boton>
      </div>
    </aside>
  );
}