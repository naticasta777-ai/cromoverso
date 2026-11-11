import { iconoDeFigura, iconoDeRareza } from "../../config/iconos.js";
import { numeroDeCromo } from "../../utils/textos.js";
import Icono, { existeIcono } from "../Icono/Icono.jsx";
import "./Cromo.css";

// Los «rayos» del Figma: una estrella grande de 16 puntas, blanca al 14 %.
// Se dibuja con un SVG (no hay imágenes) y se calcula una sola vez.
const PUNTAS = 16;
const RADIO_EXTERIOR = 100;
const RADIO_INTERIOR = 55;
const PUNTOS_RAYOS = Array.from({ length: PUNTAS * 2 }, (_, indice) => {
  const angulo = (Math.PI * indice) / PUNTAS - Math.PI / 2;
  const radio = indice % 2 === 0 ? RADIO_EXTERIOR : RADIO_INTERIOR;
  const x = (radio * Math.cos(angulo)).toFixed(2);
  const y = (radio * Math.sin(angulo)).toFixed(2);
  return `${x},${y}`;
}).join(" ");

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
          <svg
            className="cromo__rayos"
            viewBox="-100 -100 200 200"
            focusable="false"
          >
            <polygon points={PUNTOS_RAYOS} />
          </svg>
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
