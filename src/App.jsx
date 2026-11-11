import Boton from "./components/Boton/Boton.jsx";
import Campo from "./components/Campo/Campo.jsx";
import Etiqueta from "./components/Etiqueta/Etiqueta.jsx";
import EtiquetaRareza from "./components/EtiquetaRareza/EtiquetaRareza.jsx";
import Tarjeta from "./components/Tarjeta/Tarjeta.jsx";

const VARIANTES = ["primario", "acento", "secundario", "fantasma"];
const TAMANOS = ["g", "m", "p"];
const TONOS = ["neutro", "marca", "exito", "alerta", "error", "info"];
const RAREZAS = [
  { id: "comun", nombre: "Común", icono: "circulo" },
  { id: "rara", nombre: "Rara", icono: "rombo" },
  { id: "epica", nombre: "Épica", icono: "estrella" },
  { id: "legendaria", nombre: "Legendaria", icono: "corona" },
];

const fila = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "var(--espacio-4)",
};
const bloque = { display: "grid", gap: "var(--espacio-3)" };

// Página temporal para revisar los componentes base de S1-01.
// Los siguientes PR la reemplazan por las vistas reales.
export default function App() {
  return (
    <main
      id="contenido"
      className="contenedor"
      style={{
        display: "grid",
        gap: "var(--espacio-6)",
        paddingBlock: "var(--espacio-6)",
      }}
    >
      <h1 className="titular-h1">Componentes base</h1>

      <section style={bloque}>
        <h2 className="titular-h3">Botón</h2>
        {VARIANTES.map((variante) => (
          <div key={variante} style={fila}>
            {TAMANOS.map((tamano) => (
              <Boton
                key={tamano}
                variante={variante}
                tamano={tamano}
                icono="destellos"
              >
                {variante} {tamano}
              </Boton>
            ))}
            <Boton variante={variante} tamano="m" disabled>
              deshabilitado
            </Boton>
          </div>
        ))}
      </section>

      <section style={bloque}>
        <h2 className="titular-h3">Etiqueta</h2>
        <div style={fila}>
          {TONOS.map((tono) => (
            <Etiqueta key={tono} tono={tono}>
              {tono}
            </Etiqueta>
          ))}
        </div>
      </section>

      <section style={bloque}>
        <h2 className="titular-h3">Etiqueta de rareza</h2>
        <div style={fila}>
          {RAREZAS.map((rareza) => (
            <EtiquetaRareza key={rareza.id} {...rareza} />
          ))}
        </div>
      </section>

      <section style={bloque}>
        <h2 className="titular-h3">Tarjeta</h2>
        <div style={fila}>
          <Tarjeta>Tarjeta blanca</Tarjeta>
          <Tarjeta fondo="var(--mundo-neon-suave)">
            Tarjeta con color de mundo
          </Tarjeta>
        </div>
      </section>

      <section style={{ ...bloque, maxWidth: "20rem" }}>
        <h2 className="titular-h3">Campo</h2>
        <Campo
          etiqueta="Normal"
          placeholder="Escribe aquí"
          ayuda="Texto de ayuda"
        />
        <Campo
          etiqueta="Con error"
          defaultValue="valor"
          error="Mensaje de error"
        />
        <Campo etiqueta="Deshabilitado" disabled placeholder="No editable" />
      </section>
    </main>
  );
}
