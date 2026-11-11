function luminancia(hex) {
  const limpio = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((posicion) => {
    const canal = parseInt(limpio.slice(posicion, posicion + 2), 16) / 255;
    return canal <= 0.03928 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(colorA, colorB) {
  const [claro, oscuro] = [luminancia(colorA), luminancia(colorB)].sort(
    (a, b) => b - a,
  );
  return (claro + 0.05) / (oscuro + 0.05);
}

// Devuelve el color de texto (blanco u oscuro) que se lee bien sobre un fondo.
export function textoLegibleSobre(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return "var(--texto-inverso)";
  return contraste(hex, "#ffffff") >= 4.5
    ? "var(--texto-inverso)"
    : "var(--texto-principal)";
}
