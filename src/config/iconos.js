// La API devuelve nombres de figura que no son íconos del paquete.
// Esta tabla los traduce a los íconos que muestra el Figma.
const FIGURA_A_ICONO = {
  rayo: "rayo",
  ola: "mundo",
  hoja: "destellos",
  llama: "llama",
  orbita: "estrella",
  runa: "ojo",
};

export function iconoDeFigura(figura) {
  return FIGURA_A_ICONO[figura] ?? figura;
}

// La rareza siempre se muestra con símbolo y palabra: círculo común,
// rombo rara, estrella épica y corona legendaria.
const ICONO_RAREZA = {
  comun: "circulo",
  rara: "rombo",
  epica: "estrella",
  legendaria: "corona",
};

export function iconoDeRareza(id, respaldo) {
  return ICONO_RAREZA[id] ?? respaldo;
}
