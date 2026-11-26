import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Boton from "../components/Boton/Boton.jsx";
import Campo from "../components/Campo/Campo.jsx";
import CampoClave from "../components/CampoClave/CampoClave.jsx";
import Icono from "../components/Icono/Icono.jsx";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import { RUTAS } from "../config/rutas.js";
import { useSesion } from "../context/SesionContext.jsx";
import { useTextos } from "../context/TextosContext.jsx";
import { useMetadatos } from "../hooks/useMetadatos.js";
import { plantilla } from "../utils/textos.js";
import "./IniciarSesion.css";

const ID_CORREO = "ingresar-correo";
const ID_CLAVE = "ingresar-clave";
const CORREO_VALIDO = /^\S+@\S+\.\S+$/;
const ESPERA_POR_DEFECTO = 30;

// Vista 4: iniciar sesión con POST /sesion.
export default function IniciarSesion() {
  const textos = useTextos();
  const pagina = textos.paginas.ingresar;
  const { formulario } = pagina;
  const { usuario, ingresar } = useSesion();

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [camposError, setCamposError] = useState({});
  const [aviso, setAviso] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [espera, setEspera] = useState(0);
  const control = useRef(null);

  useMetadatos(pagina.seo.titulo, pagina.seo.descripcion);

  // Si la persona sale de la página con una petición en curso, se cancela.
  useEffect(() => () => control.current?.abort(), []);

  // Cuenta regresiva del 429 (demasiados intentos).
  useEffect(() => {
    if (espera <= 0) return undefined;
    const temporizador = setTimeout(
      () => setEspera((segundos) => segundos - 1),
      1000,
    );
    return () => clearTimeout(temporizador);
  }, [espera]);

  // El aviso de «demasiados intentos» desaparece cuando termina la espera.
  const avisoVisible =
    aviso && (aviso.tipo !== "intentos" || espera > 0) ? aviso : null;
  const bloqueado = enviando || espera > 0;

  function enfocar(errores) {
    const id = errores.correo ? ID_CORREO : ID_CLAVE;
    document.getElementById(id)?.focus();
  }

  function mostrarErrorDeCampos(errores) {
    setCamposError(errores);
    setAviso({ tipo: "campos", ...pagina.errores.camposObligatorios });
    enfocar(errores);
  }

  function mostrarErrorDeApi(error) {
    if (error.estado === 401) {
      setAviso({ tipo: "credenciales", ...pagina.errores.credenciales });
      document.getElementById(ID_CLAVE)?.focus();
    } else if (
      error.estado === 422 &&
      (error.campos?.correo || error.campos?.clave)
    ) {
      mostrarErrorDeCampos({
        correo: error.campos.correo,
        clave: error.campos.clave,
      });
    } else if (error.estado === 429) {
      const segundos = error.reintentarEn ?? ESPERA_POR_DEFECTO;
      setEspera(segundos);
      setAviso({
        tipo: "intentos",
        titulo: pagina.errores.demasiadosIntentos.titulo,
        texto: plantilla(pagina.errores.demasiadosIntentos.texto, { segundos }),
      });
    } else if (error.estado === 0) {
      setAviso({
        tipo: "conexion",
        titulo: pagina.errores.conexion.titulo,
        texto: pagina.errores.conexion.texto,
        botonReintentar: pagina.errores.conexion.botones.reintentar,
      });
    } else {
      setAviso({
        tipo: "servidor",
        titulo: textos.estados.error.titulo,
        texto: textos.errores[error.codigo] ?? textos.errores.generico,
        botonReintentar: textos.estados.error.botones.reintentar,
      });
    }
  }

  async function intentarIngreso() {
    if (bloqueado) return;

    const valorCorreo = correo.trim();
    const errores = {};
    if (!valorCorreo) errores.correo = pagina.errores.correoObligatorio;
    else if (!CORREO_VALIDO.test(valorCorreo)) {
      errores.correo = textos.formularios.validacion.correoInvalido;
    }
    if (!clave) errores.clave = pagina.errores.claveObligatoria;

    if (errores.correo || errores.clave) {
      mostrarErrorDeCampos(errores);
      return;
    }

    setEnviando(true);
    setAviso(null);
    setCamposError({});
    control.current = new AbortController();

    try {
      await ingresar(valorCorreo, clave, { signal: control.current.signal });
      // Con la sesión iniciada, esta misma página redirige al inicio (ver abajo).
    } catch (error) {
      if (error.name === "AbortError") return;
      mostrarErrorDeApi(error);
      setEnviando(false);
    }
  }

  function alEnviar(evento) {
    evento.preventDefault();
    intentarIngreso();
  }

  // Con la sesión iniciada (o si ya estaba iniciada) se vuelve al inicio.
  if (usuario) return <Navigate to={RUTAS.inicio} replace />;

  return (
    <LayoutPublico>
      <div className="ingresar">
        <section className="ingresar__presentacion">
          <p className="ingresar__temporada detalle-etiqueta">
            {pagina.presentacion.etiquetas.temporada}
          </p>
          <p className="ingresar__lema titular-h1">
            {pagina.presentacion.titulo}
          </p>
          <p className="ingresar__texto cuerpo-m">
            {pagina.presentacion.texto}
          </p>
        </section>

        <div className="ingresar__panel">
          <section className="ingresar__tarjeta">
            <div className="ingresar__encabezado">
              <h1 className="titular-h2">{formulario.titulo}</h1>
              <p className="cuerpo-m ingresar__subtitulo">
                {formulario.subtitulo}
              </p>
            </div>

            {avisoVisible && (
              <div className="ingresar__aviso" role="alert">
                <Icono nombre="alerta" />
                <div className="ingresar__aviso-cuerpo">
                  <p className="cuerpo-p-fuerte">{avisoVisible.titulo}</p>
                  <p className="cuerpo-p">{avisoVisible.texto}</p>
                  {avisoVisible.botonReintentar && (
                    <Boton
                      variante="secundario"
                      tamano="p"
                      aria-disabled={bloqueado}
                      onClick={intentarIngreso}
                    >
                      {avisoVisible.botonReintentar}
                    </Boton>
                  )}
                </div>
              </div>
            )}

            <form
              className="ingresar__formulario"
              onSubmit={alEnviar}
              noValidate
            >
              <Campo
                id={ID_CORREO}
                etiqueta={formulario.etiquetas.correo}
                type="email"
                name="correo"
                autoComplete="email"
                inputMode="email"
                placeholder={formulario.placeholders.correo}
                value={correo}
                onChange={(evento) => {
                  setCorreo(evento.target.value);
                  setCamposError((previo) => ({
                    ...previo,
                    correo: undefined,
                  }));
                }}
                error={camposError.correo}
                aria-required="true"
              />

              <CampoClave
                id={ID_CLAVE}
                etiqueta={formulario.etiquetas.clave}
                textoMostrar={formulario.botones.mostrarClave}
                textoOcultar={formulario.botones.ocultarClave}
                name="clave"
                autoComplete="current-password"
                value={clave}
                onChange={(evento) => {
                  setClave(evento.target.value);
                  setCamposError((previo) => ({ ...previo, clave: undefined }));
                }}
                error={camposError.clave}
                aria-required="true"
              />

              <Link
                to={RUTAS.recuperar}
                className="ingresar__olvido cuerpo-p-fuerte"
              >
                {formulario.enlaces.olvidasteClave}
              </Link>

              <div className="ingresar__acciones">
                <Boton
                  type="submit"
                  tamano="g"
                  className="ingresar__enviar"
                  aria-disabled={bloqueado}
                >
                  {enviando
                    ? formulario.mensajes.ingresando
                    : formulario.botones.ingresar}
                </Boton>
              </div>
              <p className="visualmente-oculto" role="status">
                {enviando ? formulario.mensajes.ingresando : ""}
              </p>
            </form>

            <p className="ingresar__crear cuerpo-p">
              {formulario.mensajes.sinCuenta}{" "}
              <Link
                to={RUTAS.registro}
                className="ingresar__enlace cuerpo-p-fuerte"
              >
                {formulario.enlaces.crearCuenta}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </LayoutPublico>
  );
}
