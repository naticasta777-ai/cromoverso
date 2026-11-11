import { useApi } from "./useApi.js";
import { useMundos } from "./useMundos.js";

export function useCatalogo(id, rareza, tipo) {
  const base = useMundos();
  const mundoApi = useApi(`/mundos/${id}`);

  const rarezaValida = base.rarezas.some((item) => item.id === rareza)
    ? rareza
    : "";

  const consulta = new URLSearchParams({ mundo: id, porPagina: "20" });
  if (rarezaValida) consulta.set("rareza", rarezaValida);
  if (tipo) consulta.set("tipo", tipo);

  const listaApi = useApi(
    base.rarezas.length > 0 ? `/cromos?${consulta.toString()}` : null,
  );

  const bruto = mundoApi.datos;
  const mundoBruto = bruto?.mundo ?? bruto?.datos ?? bruto;
  const mundo = mundoBruto?.id === id ? mundoBruto : null;
  const todos = mundo ? (bruto.cromos ?? mundoBruto.cromos ?? []) : [];

  const noEncontrado = mundoApi.error?.estado === 404;
  const errorMundo = noEncontrado ? null : mundoApi.error;

  return {
    ...base,
    mundo,
    todos,
    lista: listaApi.datos?.datos ?? [],
    rarezaValida,
    noEncontrado,
    error: errorMundo ?? base.error ?? listaApi.error,
    cargandoLista: listaApi.cargando,
    reintentar: () => {
      base.reintentar();
      mundoApi.reintentar();
      listaApi.reintentar();
    },
  };
}
