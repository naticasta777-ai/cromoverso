import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/tokens.css";
import "./styles/global.css";
import App from "./App.jsx";
import { AccesibilidadProvider } from "./context/AccesibilidadContext.jsx";
import { PreferenciasProvider } from "./context/PreferenciasContext.jsx";
import { TextosProvider } from "./context/TextosContext.jsx";
import "./styles/accesibilidad.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PreferenciasProvider>
        <TextosProvider>
          <AccesibilidadProvider>
            <App />
          </AccesibilidadProvider>
        </TextosProvider>
      </PreferenciasProvider>
    </BrowserRouter>
  </StrictMode>,
);
