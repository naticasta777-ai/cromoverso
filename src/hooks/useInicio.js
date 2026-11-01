import { useEffect, useState } from "react";
import { pedir } from "../api/cliente.js";

export function useInicio() {
  const [datos, setDatos] = useState({ heroes: [], rarezas: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controlador = new AbortController();
    const { signal } = controlador;

    async function cargar() {
      try {
        const [rarezas, cromos] = await Promise.all([
          pedir("/rarezas", { signal }),
          pedir("/cromos?rareza=legendaria&porPagina=100", { signal }),
        ]);
        const guardianes = cromos.datos.filter((cromo) => cromo.holografico);
        // izquierda, centro y derecha del abanico
        const heroes = [guardianes[2], guardianes[0], guardianes[4]].filter(Boolean);
        setDatos({ heroes, rarezas: rarezas.datos });
      } catch (fallo) {
        if (fallo.name !== "AbortError") setError(true);
      } finally {
        if (!signal.aborted) setCargando(false);
      }
    }

    cargar();
    return () => controlador.abort();
  }, []);

  return { ...datos, cargando, error };
}