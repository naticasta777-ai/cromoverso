import { Route, Routes } from "react-router-dom";
import LayoutPublico from "./components/LayoutPublico/LayoutPublico.jsx";
import Inicio from "./pages/Inicio.jsx";

// Marcadores provisionales: las vistas reales se construyen en S1-04 y en los sprints 2 y 3.
function Marcador({ titulo }) {
  return (
    <LayoutPublico>
      <div className="contenedor">
        <h1 className="titular-h1">{titulo}</h1>
      </div>
    </LayoutPublico>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/mundos/:id" element={<Marcador titulo="Catálogo" />} />
      <Route path="/cromos/:id" element={<Marcador titulo="Detalle" />} />
      <Route path="/iniciar-sesion" element={<Marcador titulo="Iniciar sesión" />} />
      <Route path="/crear-cuenta" element={<Marcador titulo="Crear cuenta" />} />
    </Routes>
  );
}