import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import GestorCookies from "./components/GestorCookies/GestorCookies.jsx";
import PanelAccesibilidad from "./components/PanelAccesibilidad/PanelAccesibilidad.jsx";
import { RUTAS } from "./config/rutas.js";
import CatalogoMundo from "./pages/CatalogoMundo.jsx";
import DetalleCromo from "./pages/DetalleCromo.jsx";
import Inicio from "./pages/Inicio.jsx";
import IniciarSesion from "./pages/IniciarSesion.jsx";
import Marcador from "./pages/Marcador.jsx";
import Mundos from "./pages/Mundos.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <Routes>
        <Route path={RUTAS.inicio} element={<Inicio />} />
        <Route path={RUTAS.mundos} element={<Mundos />} />
        <Route path="/mundos/:id" element={<CatalogoMundo />} />
        <Route path="/cromos/:id" element={<DetalleCromo />} />
        <Route path={RUTAS.ingresar} element={<IniciarSesion />} />
        <Route path={RUTAS.registro} element={<Marcador />} />
        <Route path={RUTAS.recuperar} element={<Marcador />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      <GestorCookies />
      <PanelAccesibilidad />
    </>
  );
}