import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { borrarCookie, guardarCookie, leerCookie } from "../utils/cookies.js";
import { usePreferencias } from "./PreferenciasContext.jsx";

const AccesibilidadContext = createContext(null);

const INICIAL = {
  tamano: "normal",
  altoContraste: false,
  reducirMovimiento: false,
  subrayarEnlaces: false,
  fuenteLecturaFacil: false,
};

const TAMANOS = { normal: "", grande: "112.5%", muyGrande: "125%" };

const CLASES = {
  altoContraste: "alto-contraste",
  reducirMovimiento: "reducir-movimiento",
  subrayarEnlaces: "subrayar-enlaces",
  fuenteLecturaFacil: "fuente-facil",
};

function leerGuardado() {
  if (leerCookie("consentimiento") !== "aceptado") return INICIAL;
  try {
    return { ...INICIAL, ...JSON.parse(leerCookie("accesibilidad") ?? "{}") };
  } catch {
    return INICIAL;
  }
}

export function AccesibilidadProvider({ children }) {
  const { consentimiento } = usePreferencias();
  const [preferencias, setPreferencias] = useState(leerGuardado);
  const [abierto, setAbierto] = useState(false);
  const retorno = useRef(null);

  // Aplica las preferencias a <html>.
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.fontSize = TAMANOS[preferencias.tamano] ?? "";
    Object.entries(CLASES).forEach(([clave, clase]) => {
      raiz.classList.toggle(clase, Boolean(preferencias[clave]));
    });
  }, [preferencias]);

  // Solo se guardan en una cookie si la persona aceptó las cookies.
  useEffect(() => {
    if (consentimiento === "aceptado") {
      guardarCookie("accesibilidad", JSON.stringify(preferencias));
    } else {
      borrarCookie("accesibilidad");
    }
  }, [consentimiento, preferencias]);

  const abrir = useCallback((elemento) => {
    retorno.current = elemento ?? document.activeElement;
    setAbierto(true);
  }, []);

  const cerrar = useCallback(() => {
    setAbierto(false);
    retorno.current?.focus?.();
  }, []);

  const actualizar = useCallback((cambios) => {
    setPreferencias((anterior) => ({ ...anterior, ...cambios }));
  }, []);

  const restablecer = useCallback(() => setPreferencias(INICIAL), []);

  const valor = useMemo(
    () => ({ abierto, abrir, cerrar, preferencias, actualizar, restablecer }),
    [abierto, abrir, cerrar, preferencias, actualizar, restablecer],
  );

  return (
    <AccesibilidadContext.Provider value={valor}>
      {children}
    </AccesibilidadContext.Provider>
  );
}

export function useAccesibilidad() {
  return useContext(AccesibilidadContext);
}
