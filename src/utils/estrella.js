// Puntos de una estrella de varias puntas para dibujar con un SVG centrado en 0,0.
// Se usa para los «rayos» del diseño (no hay imágenes: todo es CSS y SVG).
export function puntosEstrella({
  puntas,
  radioExterior,
  radioInterior,
  inicio = -Math.PI / 2,
}) {
  return Array.from({ length: puntas * 2 }, (_, indice) => {
    const angulo = inicio + (Math.PI * indice) / puntas;
    const radio = indice % 2 === 0 ? radioExterior : radioInterior;
    const x = (radio * Math.cos(angulo)).toFixed(2);
    const y = (radio * Math.sin(angulo)).toFixed(2);
    return `${x},${y}`;
  }).join(" ");
}
