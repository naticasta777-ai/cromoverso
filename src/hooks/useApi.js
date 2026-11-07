import { useEffect, useState } from "react";
import { pedir } from "../api/cliente.js";

// Pide una ruta de la API. Con ruta null no hace nada.
// Conserva los datos anteriores mientras llega una respuesta nueva.
export function useApi(ruta) {
  const [estado, setEstado] = useState({
    clave: null,
    datos: null,
    error: null,
  });
  const [intento, setIntento] = useState(0);
  const clave = ruta ? `${ruta}|${intento}` : null;

  useEffect(() => {
    if (!clave) return undefined;
    const controlador = new AbortController();

    pedir(ruta, { signal: controlador.signal })
      .then((datos) => setEstado({ clave, datos, error: null }))
      .catch((fallo) => {
        if (fallo.name === "AbortError") return;
        setEstado((anterior) => ({
          clave,
          datos: anterior.datos,
          error: fallo,
        }));
      });

    return () => controlador.abort();
  }, [clave, ruta]);

  const cargando = clave !== null && estado.clave !== clave;

  return {
    datos: estado.datos,
    error: cargando ? null : estado.error,
    cargando,
    reintentar: () => setIntento((valor) => valor + 1),
  };
}
