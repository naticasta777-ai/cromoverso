import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import App from "./App.jsx";
import { PreferenciasProvider } from "./context/PreferenciasContext.jsx";
import { TextosProvider } from "./context/TextosContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PreferenciasProvider>
      <TextosProvider>
        <App />
      </TextosProvider>
    </PreferenciasProvider>
  </StrictMode>,
);
