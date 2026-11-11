import { Link } from "react-router-dom";
import { rutaCromo } from "../../config/rutas.js";
import { plantilla } from "../../utils/textos.js";
import Boton from "../Boton/Boton.jsx";
import Cromo from "../Cromo/Cromo.jsx";
import Icono from "../Icono/Icono.jsx";
import "./GrillaCromos.css";

export default function GrillaCromos({
  album,
  cromos,
  rarezas,
  tamano,
  cargando,
  resumen,
  onLimpiar,
}) {
  const textoOrden = plantilla(album.orden.etiqueta, {
    orden: album.orden.opciones.numero,
  });

  return (
    <section className="grilla-cromos" aria-busy={cargando}>
      <div className="grilla-cromos__herramientas">
        <label className="orden-pildora">
          <select
            className="cuerpo-p-fuerte"
            aria-label={textoOrden}
            defaultValue="numero"
          >
            <option value="numero">{textoOrden}</option>
          </select>
          <Icono nombre="chevronAbajo" />
        </label>
      </div>

      <div className="grilla-cromos__casillas">
        {cromos.length > 0 ? (
          <ul className="grilla-cromos__lista">
            {cromos.map((cromo) => {
              const rareza = rarezas.find(
                (item) => item.id === cromo.rareza,
              ) ?? {
                id: cromo.rareza,
                nombre: cromo.rareza,
              };
              const detalle = plantilla(album.tarjeta.tipo, {
                mundo: cromo.mundoNombre,
                tipo: album.filtros.tipo.opciones[cromo.tipo] ?? cromo.tipo,
              });
              return (
                <li key={cromo.id}>
                  <Link to={rutaCromo(cromo.id)} className="cromo-enlace">
                    <Cromo
                      cromo={cromo}
                      rareza={rareza}
                      tamano={tamano}
                      detalle={detalle}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          !cargando && (
            <div className="grilla-cromos__vacio">
              <h2 className="titular-h4">{album.vacio.titulo}</h2>
              <p className="cuerpo-p">{album.vacio.texto}</p>
              <Boton variante="secundario" tamano="m" onClick={onLimpiar}>
                {album.vacio.botones.limpiar}
              </Boton>
            </div>
          )
        )}
      </div>

      <p className="visualmente-oculto" role="status">
        {resumen}
      </p>
    </section>
  );
}
