import Icono from "../Icono.jsx";
import "./Cromo.css";

const CLASES_TEXTO = {
  g: { numero: "dato-numero-de-cromo", nombre: "cromo-nombre-g" },
  m: { numero: "detalle-nota-fuerte", nombre: "cromo-nombre-m" },
  p: { numero: "cromo-numero-p", nombre: "cromo-nombre-p" },
};

export default function Cromo({ cromo, rareza, tamano = "g", detalle, className = "" }) {
  const clases = CLASES_TEXTO[tamano];
  const idRareza = rareza?.id ?? cromo.rareza;

  return (
    <div
      className={`cromo cromo--${tamano} cromo--${idRareza} ${className}`.trim()}
      style={{ "--cromo-color": cromo.ilustracion.colorBase }}
    >
      <div className="cromo__carta">
        <div className="cromo__arte" aria-hidden="true">
          <span className="cromo__rayos" />
          <span className="cromo__halo" />
          <span className="cromo__hombros" />
          <span className="cromo__cabeza" />
          <span className="cromo__antifaz" />
          <span className="cromo__emblema">
            <Icono nombre={cromo.ilustracion.figura} />
          </span>
          {cromo.holografico && <span className="cromo__holograma" />}
        </div>

        <span className={`cromo__numero ${clases.numero}`}>
          {String(cromo.numero).padStart(3, "0")}
        </span>

        <span className="cromo__rareza">
          <Icono nombre={rareza?.icono} />
          <span className="visualmente-oculto">{rareza?.nombre}</span>
        </span>

        <span className="cromo__pie">
          <span className={`cromo__nombre ${clases.nombre}`}>{cromo.nombre}</span>
          {detalle && <span className="cromo__detalle detalle-nota">{detalle}</span>}
        </span>
      </div>
    </div>
  );
}