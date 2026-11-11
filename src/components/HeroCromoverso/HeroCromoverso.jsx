import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import AbanicoCromos from "../AbanicoCromos/AbanicoCromos.jsx";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import "./HeroCromoverso.css";

// Los «rayos» del fondo (Figma: 1500 x 1500 en escritorio y 820 x 820 en móvil):
// una estrella de 24 puntas con puntas a 750 y entrantes a 414 de radio (sobre 1500).
// Se dibuja con un SVG; no hay imágenes.
const PUNTAS = 24;
const RADIO_EXTERIOR = 750;
const RADIO_INTERIOR = 414;
const PUNTOS_RAYOS = Array.from({ length: PUNTAS * 2 }, (_, indice) => {
  const angulo = (Math.PI * indice) / PUNTAS;
  const radio = indice % 2 === 0 ? RADIO_EXTERIOR : RADIO_INTERIOR;
  const x = (radio * Math.cos(angulo)).toFixed(1);
  const y = (radio * Math.sin(angulo)).toFixed(1);
  return `${x},${y}`;
}).join(" ");

export default function HeroCromoverso({ inicio, heroes, rarezas, tipos }) {
  const { hero } = inicio;
  // «Seis mundos. 120 héroes. Un álbum tuyo.»: la última frase baja a su propia línea en escritorio.
  const frases = hero.titulo.split(/(?<=\.)\s+/);
  const ultima = frases.pop();

  return (
    <section className="hero-cromoverso" aria-labelledby="titulo-inicio">
      <svg
        className="hero-cromoverso__rayos"
        viewBox="-750 -750 1500 1500"
        aria-hidden="true"
        focusable="false"
      >
        <polygon points={PUNTOS_RAYOS} />
      </svg>

      <div className="contenedor hero-cromoverso__interior">
        <div className="hero-cromoverso__texto">
          <h1 id="titulo-inicio" className="hero-cromoverso__titulo titular-h1">
            {frases.join(" ")}{" "}
            <span className="hero-cromoverso__ultima">{ultima}</span>
          </h1>
          <p className="hero-cromoverso__descripcion cuerpo-m">
            {hero.subtituloMovil}
          </p>
          <div className="hero-cromoverso__acciones">
            <Boton
              como={Link}
              to={RUTAS.registro}
              variante="acento"
              tamano="g"
              icono="regalo"
            >
              {hero.botones.crearCuentaGratis}
            </Boton>
            <Boton
              como="a"
              href="#mundos"
              variante="secundario"
              tamano="g"
              icono="album"
            >
              {hero.botones.explorarMundos}
            </Boton>
          </div>
          <p className="hero-cromoverso__nota cuerpo-p">
            <Icono nombre="destellos" />
            {hero.subtitulo}
          </p>
        </div>

        <div className="hero-cromoverso__cartas">
          <AbanicoCromos
            heroes={heroes}
            rarezas={rarezas}
            guardiana={hero.etiquetas.guardiana}
            plantillaTipo={inicio.tarjeta.tipo}
            tipos={tipos}
          />
        </div>
      </div>
    </section>
  );
}
