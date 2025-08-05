import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FloatingSelectLP } from "../../components/shared/FloatingSelectLP";
import PqrChat from "../../components/shared/PqrChat";
import { IA, PqrServices, typeSelectComents } from "../../services/pqrServices";
import type { DetallePqr, Evento } from "../../interfaces/pqrInterfaces";
import { Paperclip, X, File, Sparkles } from "lucide-react";
import { useLoading } from "../../contexts/LoadingContext";

import { showToast } from "../../utils/toastUtils";
import { EliminarEmojis } from "../../utils/EliminarEmojis";
import RespuestaIA from "../../components/shared/RespuestaIA";
import { useCallback } from "react";

const PqrData = () => {
  // const [usuid, setUsuid] = useState<string | null>(null);

  const [isWideScreen, setIsWideScreen] = useState(false);
  const [loadingEventoSeleccionado, setLoadingEventoSeleccionado] =
    useState(true);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  const { showLoading, hideLoading } = useLoading();
  const [, setRefreshChat] = useState(false);

  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const { id } = useParams();
  const [descripcion, setDescripcion] = useState("");

  const [pqr, setPqr] = useState<DetallePqr | null>(null);
  const [, setError] = useState<string>("");

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(
    null
  );
  const [user, setUser] = useState("");
  const [usuarios, setUsuarios] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isModalOpenIA, setIsModalOpenIA] = useState(false);
  const opcionesEventos = eventos.map((evento) => ({
    label: evento.nombre ?? "Sin nombre",
    value: evento.id ?? "",
  }));

  const fetchEventos = useCallback(async () => {
    setLoadingEventoSeleccionado(true);
    try {
      const response = await typeSelectComents.getEvento(id!);
      if (response.success && response.data) {
        if (response.data.some((e: Evento) => e.id && e.id !== "")) {
          setEventos(response.data);
        } else {
          setEventos([]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEventoSeleccionado(false);
    }
  }, [id]);
  const getUsuarioId = (): string | null => {
    const userData = localStorage.getItem("userData");
    if (!userData) return null;
    const userStorage = JSON.parse(userData);
    return userStorage?.id || null;
  };

  useEffect(() => {
    const fetchPqr = async () => {
      showLoading("Procesando información...");
      try {
        const result = await PqrServices.getById(id!);
        if (result.success) {
          setPqr(result.data);
          hideLoading();
        } else {
          setError(result.error || "Error desconocido");
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUsuarios = async () => {
      setLoadingUsuarios(true); // <-- Inicia la carga
      try {
        const userDataString = localStorage.getItem("userData");
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const usuarioId = userData?.id;
        const response = await typeSelectComents.getUsuarios(usuarioId);
        if (response.success && response.data) {
          const opciones = response.data.map((usuario: any) => ({
            label: usuario.nombre,
            value: usuario.id,
          }));
          setUsuarios(opciones);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUsuarios(false); // <-- Finaliza la carga
      }
    };

    fetchEventos();
    fetchPqr();
    fetchUsuarios();
  }, [id, fetchEventos]);

  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = e.target.files ? Array.from(e.target.files) : [];

    if (archivos.length + nuevos.length > 5) {
      showToast("Solo puedes subir hasta 5 archivos.");
      return;
    }

    const size = 5;
    const maxSizeBytes = size * 1024 * 1024;
    const archivosValidos = nuevos.filter((file) => {
      if (file.size > maxSizeBytes) {
        showToast(`El archivo "${file.name}" excede el límite de ${size} MB.`);
        return false;
      }
      return true;
    });

    setArchivos((prev) => [...prev, ...archivosValidos]);
    setInputKey((prev) => prev + 1);
  };

  const eliminarArchivo = (index: number) => {
    const copia = [...archivos];
    copia.splice(index, 1);
    setArchivos(copia);
  };
  const clickIA = async () => {
    const userData = localStorage.getItem("userData");
    const userStorage = userData ? JSON.parse(userData) : null;

    const usuidGlobal = userStorage?.id;

    if (!pqr?.tipoPQRId) {
      console.error("Error: pqrId no está definido.");
      return;
    }

    if (!usuidGlobal) {
      console.error("Error: usuarioId no está definido.");
      return;
    }

    try {
      const response = await IA.resultadoIA({
        PQRId: pqr.tipoPQRId,
        usuarioId: userStorage.id,
      });

      if (response.success) {
        showToast("Análisis de IA realizado correctamente.", "success");
        console.log("Resultado IA:", response.data);
      } else {
        showToast("Error al realizar análisis con IA.");
      }
    } catch (error: any) {
      showToast("Ocurrió un error al ejecutar la IA.");
      console.error(error);
    }
    // console.log(prueba);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showLoading("Procesando información...");

    try {
      // Validar que si el evento es "Asignar" (por label), haya al menos un archivo
      const eventoAsignar = eventoSeleccionado?.nombre === "Asignar";

      const requiereAnexo = eventoSeleccionado?.obligandoAnexo === true;

      if (eventoAsignar && archivos.length === 0) {
        showToast("Debe adjuntar al menos un archivo para el evento 'Asignar'");
        hideLoading();
        return;
      }

      if (descripcion.trim().length < 6) {
        showToast("La descripción debe tener al menos 6 caracteres");
        hideLoading();
        return;
      }

      let adjuntos: {
        item: number;
        nombre: string;
        extension: string;
        urlArchivo: string;
      }[] = [];

      if (requiereAnexo) {
        const uploadResponse = await PqrServices.uploadFiles(archivos);
        if (!uploadResponse.success) {
          showToast(uploadResponse.error || "Error al subir archivos");
          hideLoading();
          return;
        }
        adjuntos = uploadResponse.data.map((archivo, index) => ({
          item: index + 1,
          nombre: archivo.nombre,
          extension: archivo.extension,
          urlArchivo: archivo.urlArchivo,
        }));
      }

      const usuid = getUsuarioId();
      if (!usuid) {
        setError("ID de usuario inválido");
        hideLoading();
        return;
      }
      const datos = {
        pqrId: id || "",
        eventoId: eventoSeleccionado?.id || "",
        descripcion,
        usuarioId: usuid,
        funcionarioAsignadoId:
          requiereAsignar && user.trim() !== "" ? user : null,
        fechaCreacion: new Date().toISOString(),
        tipoNotificacion: "Mensaje de texto",
        fechaNotificacion: new Date().toISOString(),
        diasAmpliacion: 0,
        adjuntos,
      };

      const response = await PqrServices.getDetallePqrCreate(datos);

      if (response.success) {
        showToast("Evento creado exitosamente", "success");
        setDescripcion("");
        setArchivos([]);
        setInputKey((prev) => prev + 1);
        setEventoSeleccionado(null);
        setUser("");

        await fetchEventos();

        hideLoading();
        const newPqr = await PqrServices.getById(id!);
        if (newPqr.success) {
          setPqr(newPqr.data);
          setRefreshChat((prev) => !prev);
        }
      } else {
        showToast(response.error || "Error al guardar el evento");
      }
    } catch (error: any) {
      const rawError = error?.response?.data?.errors?.PQRDetalle?.[0];
      let cleanMessage = "Ocurrió un error inesperado";
      if (rawError) {
        const match = rawError.match(/Error al insertar[^\n]+/);
        if (match) cleanMessage = match[0];
      }
      showToast(cleanMessage);
    } finally {
      hideLoading();
    }

    hideLoading();
  };

  const eventosQueRequierenAsignacion = ["Asignar", "Solicitar a Funcionario"];
  // const eventosQueRespuestaIA = "Analisis Agente IA";

  const nombreEventoSeleccionado = eventoSeleccionado?.nombre ?? "";

  const requiereAsignar = eventosQueRequierenAsignacion.includes(
    nombreEventoSeleccionado
  );

  // const requiereRespuestaIA = eventosQueRespuestaIA.includes(
  //   nombreEventoSeleccionado
  // );
  console.log("XDDDDDDDDDDDDD", requiereAsignar);
  console.log("JOSHUAAQ", eventoSeleccionado?.nombre);
  // console.log("enwociwneociwneciuebvicb", requiereRespuestaIA);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1400);
    };

    handleResize(); // chequeo inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if(!eventoSeleccionado?.obligandoAnexo && archivos.length > 0){
      setArchivos([]);
      setInputKey((prev) => prev+1);
    }
  }, [eventoSeleccionado]);
  
  const userData = localStorage.getItem("userData");
  const userStorage = userData ? JSON.parse(userData) : null;
  const usuidGlobal = userStorage?.id || null;

  console.log("CARE VERGA", usuidGlobal);

  return (
    <>
      <div className="h-full max-h-[928px] flex flex-col justify-between">
        <div className=" flex flex-col gap-4 md:max-h-[685px] lg:max-h-[685px] xl:max-h-[800px]">
          <div className="flex gap-1 rounded-md bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] px-6 py-4 max-w-full flex-row items-center">
            <div className="mr-[10px]">
              <div
                title={
                  pqr?.estadoVencimiento === "VENCIDO"
                    ? `Este pqr está vencido hace ${pqr?.diasRestantes} días.`
                    : pqr?.estadoVencimiento === "POR VENCER"
                    ? `Este pqr está por vencer en ${pqr?.diasRestantes} días.`
                    : `Este pqr está a tiempo. Quedan ${pqr?.diasRestantes} días.`
                }
                className="flex items-center justify-center w-[47px] h-[47px] rounded-full bg-[#FFEB3B] text-white  font-semibold text-lg flex-shrink-0"
                aria-label="Number 13"
                style={{
                  backgroundColor:
                    pqr?.estadoVencimiento === "VENCIDO"
                      ? " #dc2626"
                      : pqr?.estadoVencimiento === "POR VENCER"
                      ? "#ffe900"
                      : pqr?.estadoVencimiento === "EN ESPERA"
                      ? "#38b6ff"
                      : pqr?.estadoVencimiento === "A TIEMPO"
                      ? "#22c55e"
                      : "#d1d5db",
                }}
              >
                {pqr?.diasRestantes}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-4 justify-between">
                <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-sm text-black font-sans w-full">
                  <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                    <span className="font-normal">#</span>
                    {pqr?.consecutivo}
                  </span>
                  {pqr?.radicado && (
                    <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                      <span className="font-normal">No. Radicado:</span>{" "}
                      {pqr.radicado}
                    </span>
                  )}

                  <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                    <span className="font-normal">Fecha:</span> {pqr?.fecha}
                  </span>
                  <div className="font-bold flex items-center gap-1 whitespace-nowrap max-w-[175px] w-full">
                    <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                      <span className="font-normal">Tipo:</span>{" "}
                      {pqr?.tipoPQRNombre}
                    </span>
                  </div>
                </div>
                <div
                  className="px-4 w-full flex justify-center max-w-32 py-1 rounded-full bg-gray-400  text-white font-semibold text-sm  whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ backgroundColor: pqr?.codigoColorEstado }}
                >
                  {pqr?.estado}
                </div>
              </div>
              <div className="flex">
                <div className="text-sm font-sans text-black max-w-full flex flex-wrap gap-1">
                  <span className="font-bold whitespace-nowrap">Asunto:</span>
                  <span
                    className="font-normal mr-5 max-w-[525px] overflow-hidden text-ellipsis whitespace-nowrap"
                    title={pqr?.asunto}
                  >
                    {pqr?.asunto}
                  </span>
                </div>
                <div className="text-sm font-sans text-black max-w-full flex flex-wrap gap-1">
                  <span className="font-bold whitespace-nowrap">
                    Responsable:
                  </span>
                  <span className="font-normal whitespace-normal max-w-[calc(100%-5rem)]">
                    {pqr?.funcionario?.nombre}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex  flex-col h-full transition-all duration-300 ${
              ["Finalizado", "Anulado"].includes(pqr?.estado || "")
                ? "h-[calc(100vh-300px)] overflow-y-auto"
                : "max-h-[300px] overflow-y-auto"
            }`}
          >
            <div className="space-y-4">
              {pqr?.detalle && (
                <PqrChat
                  key={pqr.id}
                  detalles={pqr.detalle}
                  detallePqrId={pqr.id}
                  cliente={pqr.cliente}
                />
              )}
            </div>
          </div>
        </div>

        {pqr?.estado !== "Finalizado" && pqr?.estado !== "Anulado" && (
          <div className="border border-gray-300 rounded-md p-4 mx-auto h-full mt-3 max-h-[265px] w-full">
            <form className="" onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-6 items-center h-[38px]">
                <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                  Nuevo evento:
                </label>
                <FloatingSelectLP
                  loading={loadingEventoSeleccionado}
                  value={eventoSeleccionado?.id ?? ""}
                  onChange={(value) => {
                    const seleccionado =
                      eventos.find((e) => e.id === value) || null;
                    setEventoSeleccionado(seleccionado);
                  }}
                  options={opcionesEventos}
                  className="max-w-60"
                />

                {requiereAsignar && (
                  <>
                    {eventoSeleccionado?.nombre === "Asignar" && (
                      <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                        Asignar a:
                      </label>
                    )}
                    {eventoSeleccionado?.nombre ===
                      "Solicitar a Funcionario" && (
                      <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                        Solicitar a:
                      </label>
                    )}
                    <FloatingSelectLP
                      loading={loadingUsuarios}
                      value={user}
                      onChange={(value) => {
                        setUser(value);
                      }}
                      options={usuarios}
                      showLabelPlaceholder={false}
                      className="max-w-60"
                    />
                  </>
                )}
                {(eventoSeleccionado?.nombre === "Respuesta Agente IA" ||
                  eventoSeleccionado?.nombre ===
                    "Finalizado por Respuesta") && (
                  <div
                    className="ml-auto bg-blue-500 hover:bg-blue-700 text-white text-lg rounded-lg px-[20px] py-[5px] flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsModalOpenIA(true)}
                  >
                    <Sparkles />
                    <span>Proyectar Respuesta con IA</span>
                  </div>
                )}

                {eventoSeleccionado?.nombre === "Analisis Agente IA" && (
                  <div
                    className="ml-auto bg-blue-500 hover:bg-blue-700 text-white text-lg rounded-lg px-[20px] py-[5px] flex items-center gap-2 cursor-pointer"
                    onClick={() => clickIA()}
                  >
                    <Sparkles />

                    <span>Analizar con Agente IA</span>
                  </div>
                )}

                {/* <button
                  type="submit"
                 
                >
                 
                </button> */}
              </div>
              <div>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={(e) =>
                    setDescripcion(EliminarEmojis(e.target.value))
                  }
                  rows={3}
                  placeholder="Descripción"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none overflow-y-auto max-h-24 focus:outline-none focus:ring-2 focus:ring-green-400 mt-5"
                />
              </div>

              <div className=" mt-0">
                {/* Contenedor de archivos */}
                <div className="flex gap-2 overflow-x-auto flex-nowrap py-2 min-h-[52px] items-center">
                  {archivos.length > 0 ? (
                    archivos.map((archivo, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 max-w-[189px] flex-shrink-0"
                      >
                        <File className="w-4 h-4 text-gray-700" />
                        <p className="text-sm text-gray-800 truncate flex-1">
                          {archivo.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => eliminarArchivo(index)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Eliminar archivo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400 px-2 italic"></div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between">
                {eventoSeleccionado?.obligandoAnexo && (
                  <label
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer w-fit ${
                      archivos.length >= 5
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-emerald-400 text-white hover:bg-emerald-500"
                    }`}
                  >
                    <Paperclip className="w-4 h-4" />
                    {archivos.length >= 5
                      ? "Límite alcanzado"
                      : "Subir archivos"}
                    <input
                      key={inputKey}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleArchivos}
                      disabled={archivos.length >= 5}
                    />
                  </label>
                )}
                <button
                  type="submit"
                  className="ml-auto bg-green-600 hover:bg-green-700 text-white text-lg rounded-3xl px-[22px] py-[7px]"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <RespuestaIA
        isOpen={isModalOpenIA}
        onClose={() => setIsModalOpenIA(false)}
        numeroRadicado="202403443409"
      />
    </>
  );
};

export default PqrData;
