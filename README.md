# Cromoverso

Interfaz web del álbum de cromos **Cromoverso** (Sprint 1): inicio público, catálogo de un mundo con filtros, cambio de idioma español e inglés, aviso de cookies y panel de accesibilidad.

**Despliegue:** https://cromoverso-flax.vercel.app

## Tecnologías

- React y Vite
- React Router (navegación entre páginas sin recargar)
- CSS con los tokens de diseño del Figma
- API REST de prueba: `https://yanethm-cromoverso-api.fly.dev/api/v1`
- ESLint y Prettier
- Despliegue en Vercel

## Requisitos

- Node.js 20 o superior
- npm

## Instalar y ejecutar el proyecto

```bash
git clone https://github.com/naticasta777-ai/cromoverso
cd cromoverso
npm install
cp .env.example .env
npm run dev
```

Abre la dirección que muestra la terminal (normalmente `http://localhost:5173`).

En Windows, si `cp` no funciona, copia el archivo `.env.example` y renombra la copia a `.env`.

## Variables de entorno

| Variable       | Descripción                                                               |
| -------------- | ------------------------------------------------------------------------- |
| `VITE_API_URL` | Dirección base de la API: `https://yanethm-cromoverso-api.fly.dev/api/v1` |

El archivo `.env` no se sube al repositorio. La plantilla es `.env.example`.

## Scripts

| Comando                | Qué hace                                    |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo                      |
| `npm run build`        | Compilación de producción (carpeta `dist`)  |
| `npm run preview`      | Sirve la compilación como si fuera producción |
| `npm run lint`         | Revisa el código con ESLint                 |
| `npm run format`       | Da formato con Prettier (escribe cambios)   |
| `npm run format:check` | Comprueba el formato sin cambiar archivos   |

## Estructura

```
src/
├─ api/          cliente de la API (pedir y manejo de errores)
├─ assets/icons/ los 49 íconos SVG del diseño
├─ components/   una carpeta por componente (.jsx y .css)
├─ config/       dirección de la API, rutas, íconos y texto de respaldo
├─ context/      idioma y cookies, textos de la API y accesibilidad
├─ hooks/        peticiones a la API y utilidades de React
├─ pages/        las vistas (inicio, catálogo, páginas provisionales)
├─ styles/       tokens del Figma, estilos globales y modos de accesibilidad
└─ utils/        cookies, textos con marcadores y contraste
```

## Datos y textos

- Todos los textos de la interfaz salen de `GET /textos?idioma=es|en`. Ningún texto queda escrito dentro de un componente (solo hay un mensaje de respaldo por si esa petición falla).
- Los datos del catálogo salen de `GET /mundos`, `GET /mundos/:id`, `GET /cromos` y `GET /rarezas`.
- Los cromos se dibujan con CSS y SVG, no con imágenes.

## Cookies

| Cookie          | Cuándo se guarda                                                 |
| --------------- | ---------------------------------------------------------------- |
| `consentimiento` | Al aceptar o rechazar el aviso de cookies                       |
| `idioma`        | Solo si la persona aceptó las cookies                            |
| `accesibilidad` | Solo si la persona aceptó las cookies                            |

## Despliegue en Vercel

1. Importa el repositorio en Vercel (Add New, Project).
2. Framework: **Vite**. Build Command: `npm run build`. Output Directory: `dist`.
3. En Environment Variables agrega `VITE_API_URL` para **Production y Preview**.
4. `vercel.json` redirige todas las rutas a `index.html`, para que direcciones como `/mundos/neon` funcionen al recargar.

La rama `main` es la de producción. Cada rama con su pull request genera un despliegue de prueba (*Preview*) que se revisa antes de fusionar.

## Flujo de trabajo

- Una rama y un pull request por historia de usuario (`feat/s1-01-...`, `feat/s1-05-...`).
- Commits convencionales: `feat:`, `fix:`, `docs:`, `style:`, `chore:`.
- Los PR se fusionan en `main` con «Create a merge commit».

## Fuera del alcance del Sprint 1

Detalle de un cromo, iniciar sesión, crear cuenta, verificación del correo, recuperación de la contraseña y sesión (sprints 2 y 3). Esas rutas existen como páginas provisionales.