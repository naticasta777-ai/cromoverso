import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import AbanicoCromos from "../AbanicoCromos/AbanicoCromos.jsx";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import "./HeroCromoverso.css";

export default function HeroCromoverso({ textos, heroes, rarezas }) {
  return (
    <section className="hero-cromoverso" aria-labelledby="titulo-inicio">
      <div className="contenedor hero-cromoverso__interior">
        <div className="hero-cromoverso__texto">
          <h1 id="titulo-inicio" className="hero-cromoverso__titulo titular-h1">
            <span className="hero-cromoverso__linea">{textos.heroLinea1}</span>{" "}
            <span className="hero-cromoverso__linea">{textos.heroLinea2}</span>
          </h1>
          <p className="hero-cromoverso__descripcion cuerpo-m">{textos.heroDescripcion}</p>
          <div className="hero-cromoverso__acciones">
            <Boton como={Link} to={RUTAS.registro} variante="acento" tamano="g" icono="regalo">
              {textos.crearGratis}
            </Boton>
            <Boton como="a" href="#mundos" variante="secundario" tamano="g" icono="album">
              {textos.explorar}
            </Boton>
          </div>
          <p className="hero-cromoverso__nota cuerpo-p">
            <Icono nombre="destellos" />
            {textos.heroNota}
          </p>
        </div>
        <AbanicoCromos heroes={heroes} rarezas={rarezas} textos={textos} />
      </div>
    </section>
  );
}