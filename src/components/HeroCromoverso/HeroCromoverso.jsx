import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import AbanicoCromos from "../AbanicoCromos/AbanicoCromos.jsx";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import "./HeroCromoverso.css";

export default function HeroCromoverso({ inicio, heroes, rarezas, tipos }) {
  const { hero } = inicio;
  // "Seis mundos. 120 héroes. Un álbum tuyo." → la última frase baja a su propia línea en escritorio.
  const frases = hero.titulo.split(/(?<=\.)\s+/);
  const ultima = frases.pop();

  return (
    <section className="hero-cromoverso" aria-labelledby="titulo-inicio">
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
