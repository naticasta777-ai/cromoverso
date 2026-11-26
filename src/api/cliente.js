import { API_URL } from "../config/api.js";

export class ErrorApi extends Error {
  constructor(estado, codigo, extra = {}) {
    super(codigo);
    this.name = "ErrorApi";
    this.estado = estado;
    this.codigo = codigo;
    // Mensajes por campo de un 422 y segundos de espera de un 429 (Retry-After).
    this.campos = extra.campos ?? null;
    this.reintentarEn = extra.reintentarEn ?? null;
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

// La cookie httpOnly «sesion» viaja sola cuando la API se pide por la misma dirección
// del sitio (/api/v1). Solo si se usa una dirección completa de otro origen se manda
// el token (guardado únicamente en memoria) en la cabecera Authorization.
const MISMO_ORIGEN = API_URL.startsWith("/");
let tokenSesion = null;

export function fijarToken(token) {
  tokenSesion = token;
}

// Quien administra la sesión (SesionContext) avisa aquí qué hacer si vence.
let alVencerLaSesion = null;

export function registrarSesionVencida(manejador) {
  alVencerLaSesion = manejador;
}

// El catálogo y los textos son públicos: no llevan el token.
const RUTAS_PUBLICAS = [
  "/textos",
  "/mundos",
  "/cromos",
  "/rarezas",
  "/idiomas",
];

export async function pedir(ruta, { signal, metodo = "GET", cuerpo } = {}) {
  const esPublica = RUTAS_PUBLICAS.some((prefijo) => ruta.startsWith(prefijo));

  // Los textos de la interfaz nunca se simulan: sin ellos no se vería ningún estado.
  const headers = ruta.startsWith("/textos") ? {} : cabecerasSimulacion();
  if (tokenSesion && !esPublica && !MISMO_ORIGEN) {
    headers.Authorization = `Bearer ${tokenSesion}`;
  }
  if (cuerpo !== undefined) headers["Content-Type"] = "application/json";

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: metodo,
      signal,
      headers,
      body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
    });
  } catch (fallo) {
    if (fallo.name === "AbortError") throw fallo;
    throw new ErrorApi(0, "sin_conexion");
  }

  if (!respuesta.ok) {
    let codigo = "error_interno";
    let campos = null;
    try {
      const contenido = await respuesta.json();
      codigo = contenido?.error?.codigo ?? codigo;
      campos = contenido?.error?.campos ?? null;
    } catch {
      // El cuerpo del error no era JSON: se conserva el código por defecto.
    }
    const espera = Number(respuesta.headers.get("Retry-After"));

    // Sesión vencida: cualquier petición que pida sesión y reciba 401 no_autenticado.
    // Las de /sesion se manejan en SesionContext (ahí un 401 es lo normal sin sesión).
    if (
      respuesta.status === 401 &&
      codigo === "no_autenticado" &&
      !ruta.startsWith("/sesion")
    ) {
      alVencerLaSesion?.();
    }

    throw new ErrorApi(respuesta.status, codigo, {
      campos,
      reintentarEn: Number.isFinite(espera) && espera > 0 ? espera : null,
    });
  }

  if (respuesta.status === 204) return null;
  return respuesta.json();
}
