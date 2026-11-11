import { useState } from "react";
import { useTextos } from "../../context/TextosContext.jsx";
import { usePreferencias } from "../../context/PreferenciasContext.jsx";
import BannerCookies from "../BannerCookies/BannerCookies.jsx";
import Icono from "../Icono/Icono.jsx";
import "./GestorCookies.css";

export default function GestorCookies() {
  const { consentimiento, guardarConsentimiento, error } = usePreferencias();
  const textos = useTextos();
  const [guardado, setGuardado] = useState(false);

  function decidir(permitir) {
    if (guardarConsentimiento(permitir)) setGuardado(true);
  }

  return (
    <>
      {!consentimiento && (
        <BannerCookies
          textos={textos.cookies.banner}
          onAceptar={() => decidir(true)}
          onRechazar={() => decidir(false)}
        />
      )}
      {error && (
        <p className="error-cookies cuerpo-p-fuerte" role="alert">
          <Icono nombre="alerta" />
          {textos.errores.generico}
        </p>
      )}
      <span className="visualmente-oculto" role="status">
        {guardado ? textos.estados.mensajes.guardado : ""}
      </span>
    </>
  );
}
