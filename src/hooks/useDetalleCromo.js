import { useApi } from "./useApi.js";
import { useMundos } from "./useMundos.js";

// Pide el cromo y lo que necesita su ficha: las rarezas, la posición dentro
// del mundo y el cromo anterior y el siguiente del mismo mundo.
export function useDetalleCromo(id) {
  const base = useMundos();
  const cromoApi = useApi(`/cromos/${encodeURIComponent(id)}`);

  // La respuesta es el cromo; se aceptan también envolturas por si cambian.
  const bruto = cromoApi.datos;
  const candidato = bruto?.cromo ?? bruto?.datos ?? bruto;
  const cromo = candidato?.id ? candidato : null;

  // GET /mundos/:id trae los 20 cromos del mundo en orden.
  const mundoApi = useApi(cromo ? `/mundos/${cromo.mundo}` : null);
  const brutoMundo = mundoApi.datos;
  const hermanos =
    brutoMundo?.cromos ??
    brutoMundo?.mundo?.cromos ??
    brutoMundo?.datos?.cromos ??
    [];
  const indice = hermanos.findIndex((item) => item.id === cromo?.id);

  const mundo = base.mundos.find((item) => item.id === cromo?.mundo);
  const noEncontrado = cromoApi.error?.estado === 404;

  return {
    cromo,
    rarezas: base.rarezas,
    anterior: indice > 0 ? hermanos[indice - 1] : null,
    siguiente: indice >= 0 ? (hermanos[indice + 1] ?? null) : null,
    posicion: cromo && mundo ? cromo.numero - mundo.numeros.desde + 1 : null,
    noEncontrado,
    error: noEncontrado ? null : cromoApi.error,
    reintentar: cromoApi.reintentar,
  };
}
