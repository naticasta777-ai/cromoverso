import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(consulta) {
  const suscribirse = useCallback(
    (alCambiar) => {
      const lista = window.matchMedia(consulta);
      lista.addEventListener("change", alCambiar);
      return () => lista.removeEventListener("change", alCambiar);
    },
    [consulta],
  );

  return useSyncExternalStore(
    suscribirse,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
