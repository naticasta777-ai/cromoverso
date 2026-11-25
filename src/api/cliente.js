import { API_URL } from "../config/api.js";

export class ErrorApi extends Error {
  constructor(estado, codigo) {
    super(codigo);
    this.name = "ErrorApi";
    this.estado = estado;
    this.codigo = codigo;
  }
}

// Pruebas de los estados de carga y error (cabeceras de la API):
//   ?latencia=2000  → X-Simular-Latencia: 2000
//   ?error=503      → X-Simular-Error: 503 (también 500 o 504)
//   ?simular=no     → apaga la simulación
// La dirección se lee una sola vez, al abrir la página, y se guarda en
// sessionStorage para que la simulación siga activa al navegar entre vistas.
const CLAVE_SIMULACION = "cromoverso-simulacion";
const ERRORES_SIMULABLES = ["500", "503", "504"];

function guardarSimulacionDeLaDireccion() {
  const params = new URLSearchParams(window.location.search);
  try {
    if (params.get("simular") === "no") {
      sessionStorage.removeItem(CLAVE_SIMULACION);
    } else if (params.has("latencia") || params.has("error")) {
      sessionStorage.setItem(
        CLAVE_SIMULACION,
        JSON.stringify({
          latencia: params.get("latencia"),
          error: params.get("error"),
        }),
      );
    }
  } catch {
    // Sin sessionStorage no se simula nada; la aplicación funciona igual.
  }
}

guardarSimulacionDeLaDireccion();

function cabecerasSimulacion() {
  let guardado = {};
  try {
    guardado = JSON.parse(sessionStorage.getItem(CLAVE_SIMULACION) ?? "{}");
  } catch {
    // Sin simulación guardada.
  }

  const cabeceras = {};
  const milisegundos = Number(guardado?.latencia);
  if (Number.isFinite(milisegundos) && milisegundos > 0) {
    cabeceras["X-Simular-Latencia"] = String(Math.min(milisegundos, 15000));
  }
  if (ERRORES_SIMULABLES.includes(String(guardado?.error))) {
    cabeceras["X-Simular-Error"] = String(guardado.error);
  }
  return cabeceras;
}

export async function pedir(ruta, { signal } = {}) {
  // Los textos de la interfaz nunca se simulan: sin ellos no se vería ningún estado.
  const headers = ruta.startsWith("/textos") ? {} : cabecerasSimulacion();

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, { signal, headers });
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