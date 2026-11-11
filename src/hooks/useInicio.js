import { useApi } from "./useApi.js";
import { useMundos } from "./useMundos.js";

export function useInicio() {
  const base = useMundos();
  const legendarias = useApi("/cromos?rareza=legendaria&porPagina=100");

  // Los guardianes holográficos, uno por mundo, ordenados por número.
  const guardianes = (legendarias.datos?.datos ?? [])
    .filter((cromo) => cromo.holografico)
    .sort((a, b) => a.numero - b.numero);

  // Izquierda, centro y derecha del abanico de la portada.
  const heroes = [guardianes[2], guardianes[0], guardianes[4]].filter(Boolean);

  return {
    ...base,
    heroes,
    cargando: base.cargando || legendarias.cargando,
    error: base.error ?? legendarias.error,
    reintentar: () => {
      base.reintentar();
      legendarias.reintentar();
    },
  };
}
