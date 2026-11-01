import { useState } from "react";
import { useInterfaz, usePreferencias } from "../../context/PreferenciasContext.jsx";
import BannerCookies from "../BannerCookies/BannerCookies.jsx";
import Icono from "../Icono.jsx";
import "./GestorCookies.css";

export default function GestorCookies() {
  const { consentimiento, guardarConsentimiento, error } = usePreferencias();
  const textos = useInterfaz();
  const [mensaje, setMensaje] = useState(false);

  function decidir(permitir) {
    if (guardarConsentimiento(permitir)) setMensaje(true);
  }

  return (
    <>
      {!consentimiento && (
        <BannerCookies
          textos={textos}
          onAceptar={() => decidir(true)}
          onRechazar={() => decidir(false)}
        />
      )}
      {error && (
        <p className="error-cookies cuerpo-p-fuerte" role="alert">
          <Icono nombre="alerta" />
          {textos.errorCookies}
        </p>
      )}
      <span className="visualmente-oculto" role="status">
        {mensaje ? textos.guardado : ""}
      </span>
    </>
  );
}