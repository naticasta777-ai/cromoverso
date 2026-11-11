import { API_URL } from "../config/api.js";

export class ErrorApi extends Error {
  constructor(estado, codigo) {
    super(codigo);
    this.name = "ErrorApi";
    this.estado = estado;
    this.codigo = codigo;
  }
}

export async function pedir(ruta, { signal } = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, { signal });
  } catch (fallo) {
    if (fallo.name === "AbortError") throw fallo;
    throw new ErrorApi(0, "sin_conexion");
  }

  if (!respuesta.ok) {
    let codigo = "error_interno";
    try {
      const cuerpo = await respuesta.json();
      codigo = cuerpo?.error?.codigo ?? codigo;
    } catch {
      // El cuerpo del error no era JSON: se conserva el código por defecto.
    }
    throw new ErrorApi(respuesta.status, codigo);
  }

  return respuesta.json();
}
