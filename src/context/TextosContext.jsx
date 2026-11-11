import { createContext, useContext, useEffect, useState } from "react";
import { pedir } from "../api/cliente.js";
import PantallaInicial from "../components/PantallaInicial/PantallaInicial.jsx";
import { usePreferencias } from "./PreferenciasContext.jsx";

const TextosContext = createContext(null);

// Pide todos los textos de la interfaz a GET /textos. Mientras llegan por primera
// vez muestra la pantalla inicial; al cambiar de idioma conserva los anteriores.
export function TextosProvider({ children }) {
  const { idioma } = usePreferencias();
  const [textos, setTextos] = useState(null);
  const [fallo, setFallo] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    pedir(`/textos?idioma=${idioma}`, { signal: controlador.signal })
      .then((respuesta) => {
        setTextos(respuesta.textos);
        setFallo(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setFallo(true);
      });

    return () => controlador.abort();
  }, [idioma, intento]);

  if (!textos) {
    return (
      <PantallaInicial
        fallo={fallo}
        idioma={idioma}
        onReintentar={() => {
          setFallo(false);
          setIntento((valor) => valor + 1);
        }}
      />
    );
  }

  return (
    <TextosContext.Provider value={textos}>{children}</TextosContext.Provider>
  );
}

export function useTextos() {
  return useContext(TextosContext);
}
