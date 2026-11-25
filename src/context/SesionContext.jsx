import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { fijarToken, pedir } from "../api/cliente.js";

const SesionContext = createContext(null);

// Guarda quién inició sesión. El token vive en memoria (api/cliente.js).
export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // POST /sesion → 201 con { usuario, token }. Si falla, lanza ErrorApi.
  const ingresar = useCallback(async (correo, clave, { signal } = {}) => {
    const datos = await pedir("/sesion", {
      metodo: "POST",
      cuerpo: { correo, clave },
      signal,
    });
    fijarToken(datos.token);
    setUsuario(datos.usuario);
    return datos.usuario;
  }, []);

  // DELETE /sesion → 204. Aunque la API falle, la sesión se cierra en esta pestaña.
  const cerrarSesion = useCallback(async () => {
    try {
      await pedir("/sesion", { metodo: "DELETE" });
    } catch {
      // Se cierra igual en el navegador.
    }
    fijarToken(null);
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({ usuario, ingresar, cerrarSesion }),
    [usuario, ingresar, cerrarSesion],
  );

  return (
    <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>
  );
}

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) {
    throw new Error("useSesion debe usarse dentro de SesionProvider");
  }
  return contexto;
}
