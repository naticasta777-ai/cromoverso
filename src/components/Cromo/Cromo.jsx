import { iconoDeFigura, iconoDeRareza } from "../../config/iconos.js";
import { numeroDeCromo } from "../../utils/textos.js";
import Icono, { existeIcono } from "../Icono/Icono.jsx";
import "./Cromo.css";

const CLASES_TEXTO = {
  g: { numero: "dato-numero-de-cromo", nombre: "cromo-nombre-g" },
  m: { numero: "detalle-nota-fuerte", nombre: "cromo-nombre-m" },
  p: { numero: "cromo-numero-p", nombre: "cromo-nombre-p" },
};

export default function Cromo({ cromo, rareza, tamano = "m", detalle }) {
  const clases = CLASES_TEXTO[tamano];
  const idRareza = rareza?.id ?? cromo.rareza;
  const figura = iconoDeFigura(cromo.ilustracion?.figura);
  const emblema = existeIcono(figura) ? figura : "estrella";

  return (
    <div
      className={`cromo cromo--${tamano} cromo--${idRareza}`}
      style={{ "--cromo-color": cromo.ilustracion?.colorBase }}
    >
      <div className="cromo__carta">
        <div className="cromo__arte" aria-hidden="true">
          <span className="cromo__rayos" />
          <span className="cromo__halo" />
          <span className="cromo__hombros" />
          <span className="cromo__cabeza" />
          <span className="cromo__antifaz" />
          <span className="cromo__emblema">
            <Icono nombre={emblema} />
          </span>
          {cromo.holografico && <span className="cromo__holograma" />}
        </div>

        <span className={`cromo__numero ${clases.numero}`}>
          {numeroDeCromo(cromo.numero)}
        </span>

        <span className="cromo__rareza">
          <Icono nombre={iconoDeRareza(idRareza, rareza?.icono)} />
          <span className="visualmente-oculto">{rareza?.nombre}</span>
        </span>

        <span className="cromo__pie">
          <span className={`cromo__nombre ${clases.nombre}`}>
            {cromo.nombre}
          </span>
          {detalle && (
            <span className="cromo__detalle detalle-nota">{detalle}</span>
          )}
        </span>
      </div>
    </div>
  );
}
