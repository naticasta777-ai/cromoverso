export function leerCookie(nombre) {
  const par = document.cookie.split("; ").find((c) => c.startsWith(`${nombre}=`));
  return par ? decodeURIComponent(par.split("=")[1]) : null;
}

export function guardarCookie(nombre, valor, dias = 365) {
  const caduca = new Date(Date.now() + dias * 864e5).toUTCString();
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${caduca}; path=/; SameSite=Lax`;
}

export function borrarCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}