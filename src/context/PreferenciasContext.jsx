import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { borrarCookie, guardarCookie, leerCookie } from "../utils/cookies.js";

const PreferenciasContext = createContext(null);

function leerConsentimiento() {
  const valor = leerCookie("consentimiento");
  return valor === "aceptado" || valor === "rechazado" ? valor : null;
}

function leerIdiomaInicial() {
  if (leerConsentimiento() !== "aceptado") return "es";
  return leerCookie("idioma") === "en" ? "en" : "es";
}

export function PreferenciasProvider({ children }) {
  const [consentimiento, setConsentimiento] = useState(leerConsentimiento);
  const [idioma, setIdioma] = useState(leerIdiomaInicial);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.documentElement.lang = idioma === "es" ? "es-CO" : "en";
  }, [idioma]);

  const cambiarIdioma = useCallback((valor) => {
    setIdioma(valor);
    // El idioma solo se recuerda si la persona aceptó las cookies.
    if (leerConsentimiento() === "aceptado") guardarCookie("idioma", valor);
  }, []);

  const guardarConsentimiento = useCallback(
    (permitir) => {
      const valor = permitir ? "aceptado" : "rechazado";
      guardarCookie("consentimiento", valor);
      if (leerCookie("consentimiento") !== valor) {
        setError(true);
        return false;
      }
      setError(false);
      setConsentimiento(valor);
      if (permitir) guardarCookie("idioma", idioma);
      else borrarCookie("idioma");
      return true;
    },
    [idioma],
  );

  const valor = useMemo(
    () => ({
      idioma,
      cambiarIdioma,
      consentimiento,
      guardarConsentimiento,
      error,
    }),
    [idioma, cambiarIdioma, consentimiento, guardarConsentimiento, error],
  );

  return (
    <PreferenciasContext.Provider value={valor}>
      {children}
    </PreferenciasContext.Provider>
  );
}

export function usePreferencias() {
  return useContext(PreferenciasContext);
}
