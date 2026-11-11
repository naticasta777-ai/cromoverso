import { useApi } from "./useApi.js";

export function useMundos() {
  const mundos = useApi("/mundos");
  const rarezas = useApi("/rarezas");

  return {
    mundos: mundos.datos?.datos ?? [],
    rarezas: rarezas.datos?.datos ?? [],
    cargando: mundos.cargando || rarezas.cargando,
    error: mundos.error ?? rarezas.error,
    reintentar: () => {
      mundos.reintentar();
      rarezas.reintentar();
    },
  };
}
