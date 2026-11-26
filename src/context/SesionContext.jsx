import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { fijarToken, pedir, registrarSesionVencida } from "../api/cliente.js";
import { RUTAS } from "../config/rutas.js";

const SesionContext = createContext(null);

// La sesión vive en la cookie httpOnly «sesion» de la API (12 h): el token nunca se
// guarda en localStorage ni en sessionStorage. Solo se recuerda la preferencia de
// «Mantener la sesión iniciada»:
//  - CLAVE_MANTENER (localStorage): «si» o «no».
//  - CLAVE_ACTIVA (sessionStorage): esta pestaña ya tiene la sesión en uso.
// Con «no» y una pestaña nueva, la sesión no se restaura y se cierra.
const CLAVE_MANTENER = "cromoverso-mantener-sesion";
const CLAVE_ACTIVA = "cromoverso-sesion-activa";

function leerLocal(clave) {
  try {
    return localStorage.getItem(clave);
  } catch {
    return null;
  }
}
function escribirLocal(clave, valor) {
  try {
    if (valor === null) localStorage.removeItem(clave);
    else localStorage.setItem(clave, valor);
  } catch {
    // Sin almacenamiento se usan los valores por defecto.
  }
}
function leerPestana(clave) {
  try {
    return sessionStorage.getItem(clave);
  } catch {
    return null;
  }
}
function escribirPestana(clave, valor) {
  try {
    if (valor === null) sessionStorage.removeItem(clave);
    else sessionStorage.setItem(clave, valor);
  } catch {
    // Sin almacenamiento se usan los valores por defecto.
  }
}

function debeRestaurar() {
  const mantener = leerLocal(CLAVE_MANTENER) !== "no";
  const pestanaActiva = leerPestana(CLAVE_ACTIVA) === "si";
  return mantener || pestanaActiva;
}

export function SesionProvider({ children }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);

  // Al abrir la página se pregunta quién inició sesión: GET /sesion.
  // Sin sesión responde 401 no_autenticado y la persona queda como visitante.
  useEffect(() => {
    const control = new AbortController();

    async function restaurar() {
      if (!debeRestaurar()) {
        try {
          await pedir("/sesion", { metodo: "DELETE", signal: control.signal });
        } catch {
          // Si no se pudo cerrar, igual no se restaura en esta pestaña.
        }
        return;
      }
      try {
        const datos = await pedir("/sesion", { signal: control.signal });
        escribirPestana(CLAVE_ACTIVA, "si");
        setUsuario(datos.usuario);
      } catch {
        // 401 no_autenticado (o sin red): se queda como visitante.
      }
    }

    restaurar().finally(() => {
      if (!control.signal.aborted) setVerificando(false);
    });
    return () => control.abort();
  }, []);

  // La sesión venció (401 no_autenticado): se limpia y se lleva a ingresar.
  const expirar = useCallback(() => {
    fijarToken(null);
    escribirPestana(CLAVE_ACTIVA, null);
    setUsuario(null);
    navigate(RUTAS.ingresar, { replace: true, state: { vencida: true } });
  }, [navigate]);

  useEffect(() => {
    registrarSesionVencida(expirar);
    return () => registrarSesionVencida(null);
  }, [expirar]);

  // Al volver a la pestaña se confirma que la sesión sigue viva.
  useEffect(() => {
    if (!usuario) return undefined;
    async function revisar() {
      if (document.visibilityState !== "visible") return;
      try {
        await pedir("/sesion");
      } catch (error) {
        if (error.estado === 401) expirar();
      }
    }
    document.addEventListener("visibilitychange", revisar);
    return () => document.removeEventListener("visibilitychange", revisar);
  }, [usuario, expirar]);

  // POST /sesion → 201 con { usuario, token } y la cookie httpOnly «sesion».
  const ingresar = useCallback(
    async (correo, clave, { signal, mantener = true } = {}) => {
      const datos = await pedir("/sesion", {
        metodo: "POST",
        cuerpo: { correo, clave },
        signal,
      });
      fijarToken(datos.token);
      escribirLocal(CLAVE_MANTENER, mantener ? "si" : "no");
      escribirPestana(CLAVE_ACTIVA, "si");
      setUsuario(datos.usuario);
      return datos.usuario;
    },
    [],
  );

  // DELETE /sesion → 204. Después se vuelve al inicio como visitante.
  const cerrarSesion = useCallback(async () => {
    try {
      await pedir("/sesion", { metodo: "DELETE" });
    } catch {
      // Se cierra igual en el navegador.
    }
    fijarToken(null);
    escribirLocal(CLAVE_MANTENER, null);
    escribirPestana(CLAVE_ACTIVA, null);
    setUsuario(null);
    navigate(RUTAS.inicio);
  }, [navigate]);

  const valor = useMemo(
    () => ({ usuario, verificando, ingresar, cerrarSesion }),
    [usuario, verificando, ingresar, cerrarSesion],
  );

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) {
    throw new Error("useSesion debe usarse dentro de SesionProvider");
  }
  return contexto;
}