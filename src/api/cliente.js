import { API_URL } from "../config/api.js";

export async function pedir(ruta, { signal } = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, { signal });
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
  return respuesta.json();
}