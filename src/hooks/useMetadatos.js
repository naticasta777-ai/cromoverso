import { useEffect } from "react";

export function useMetadatos(titulo, descripcion) {
  useEffect(() => {
    if (titulo) document.title = titulo;
    if (!descripcion) return;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = descripcion;
  }, [titulo, descripcion]);
}
