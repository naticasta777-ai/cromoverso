import "./BarraAtributo.css";

// Una fila de atributo: nombre, barra y valor. La barra mide el valor como porcentaje
// (los atributos van de 10 a 99) y avisa a los lectores de pantalla como medidor.
export default function BarraAtributo({
  etiqueta,
  valor,
  minimo = 10,
  maximo = 99,
}) {
  const porcentaje = Math.min(100, Math.max(0, valor));

  return (
    <div className="barra-atributo">
      <span className="barra-atributo__etiqueta cuerpo-p-fuerte">
        {etiqueta}
      </span>
      <span
        className="barra-atributo__pista"
        role="meter"
        aria-label={etiqueta}
        aria-valuemin={minimo}
        aria-valuemax={maximo}
        aria-valuenow={valor}
      >
        <span
          className="barra-atributo__relleno"
          style={{ width: `calc(${porcentaje}% + 1.5px)` }}
        />
      </span>
      <span className="barra-atributo__valor cuerpo-p-fuerte">{valor}</span>
    </div>
  );
}
