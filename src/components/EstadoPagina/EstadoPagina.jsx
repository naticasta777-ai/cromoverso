import { Link } from "react-router-dom";
import { RUTAS } from "../../config/rutas.js";
import { useTextos } from "../../context/TextosContext.jsx";
import { plantilla } from "../../utils/textos.js";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono/Icono.jsx";
import "./EstadoPagina.css";

// tipo: "cargando" | "error" | "sinConexion" | "noEncontrado" | "vacio"
export default function EstadoPagina({ tipo, mundo, onReintentar }) {
  const { estados } = useTextos();

  if (tipo === "cargando") {
    const texto = mundo
      ? plantilla(estados.cargandoMundo, { mundo })
      : estados.cargando;
    return (
      <div className="contenedor estado-pagina" role="status" aria-busy="true">
        <span className="estado-pagina__giro" aria-hidden="true" />
        <p className="cuerpo-m-fuerte">{texto}</p>
      </div>
    );
  }

  if (tipo === "vacio") {
    return (
      <section className="contenedor estado-pagina">
        <Icono nombre="album" className="estado-pagina__icono" />
        <h1 className="titular-h2">{estados.vacio.titulo}</h1>
        <Boton como={Link} to={RUTAS.inicio} tamano="m">
          {estados.noEncontrado.botones.irAlInicio}
        </Boton>
      </section>
    );
  }

  const bloque =
    tipo === "noEncontrado"
      ? estados.noEncontrado
      : tipo === "sinConexion"
        ? estados.sinConexion
        : estados.error;
  const icono =
    tipo === "noEncontrado"
      ? "mundo"
      : tipo === "sinConexion"
        ? "wifioff"
        : "alerta";

  return (
    <section
      className="contenedor estado-pagina"
      role={tipo === "noEncontrado" ? undefined : "alert"}
    >
      <Icono nombre={icono} className="estado-pagina__icono" />
      <h1 className="titular-h2">{bloque.titulo}</h1>
      <p className="cuerpo-m">{bloque.texto}</p>
      {tipo === "noEncontrado" ? (
        <Boton como={Link} to={RUTAS.inicio} tamano="m">
          {estados.noEncontrado.botones.irAlInicio}
        </Boton>
      ) : (
        <Boton tamano="m" onClick={onReintentar}>
          {estados.error.botones.reintentar}
        </Boton>
      )}
    </section>
  );
}
