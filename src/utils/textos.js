// Reemplaza marcadores como {mundo} o {cantidad} en un texto de la API.
export function plantilla(texto, valores = {}) {
  return texto.replace(/\{(\w+)\}/g, (coincidencia, clave) =>
    clave in valores ? String(valores[clave]) : coincidencia,
  );
}

// Elige entre { uno, otro } según la cantidad.
export function plural(forma, cantidad, valores = {}) {
  const texto = cantidad === 1 ? forma.uno : forma.otro;
  return plantilla(texto, { cantidad, ...valores });
}

export function numeroDeCromo(numero) {
  return String(numero).padStart(3, "0");
}

export function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
