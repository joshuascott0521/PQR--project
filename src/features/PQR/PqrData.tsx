import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FloatingSelectLP } from "../../components/shared/FloatingSelectLP";
import PqrChat from "../../components/shared/PqrChat";
import { PqrServices, typeSelectComents } from "../../services/pqrServices";
import type { DetallePqr, Evento } from "../../interfaces/pqrInterfaces";
import { Paperclip, X, File } from "lucide-react";
import { useLoading } from "../../contexts/LoadingContext";

// import LoadingScreenBool from "../../components/shared/LoadingScreenBool";
import { showToast } from "../../utils/toastUtils";
import { EliminarEmojis } from "../../utils/EliminarEmojis";
// import LoadingSpinner from "../../components/shared/LoadingSpinner";

const PqrData = () => {
  const { showLoading, hideLoading } = useLoading();
  // const [loading, setLoading] = useState(true);
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

  const opcionesEventos = eventos.map((evento) => ({
    label: evento.nombre ?? "Sin nombre",
    value: evento.id ?? "",
  }));

  useEffect(() => {
    const fetchPqr = async () => {
      showLoading("Procesando información...");
      try {
        // setLoading(true);
        console.log(id);

        const result = await PqrServices.getById(id!);
        if (result.success) {
          setPqr(result.data);
          // setLoading(false);
          hideLoading();
        } else {
          setError(result.error || "Error desconocido");
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchEventos = async () => {
      try {
        const response = await typeSelectComents.getEvento(id!);
        if (response.success && response.data) {
          if (response.data.find((e: Evento) => e.id !== "")) {
            setEventos(response.data);
            console.log("💗💗✅✅✅", response);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchUsuarios = async () => {
      try {
        const response = await typeSelectComents.getUsuarios();
        if (response.success && response.data) {
          const opciones = response.data.map((usuario: any) => ({
            label: usuario.nombre,
            value: usuario.id,
          }));
          setUsuarios(opciones);
          // setLoading(false);
          hideLoading();
          console.log("Usuarios desde backend:", opciones);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchEventos();
    fetchPqr();
    fetchUsuarios();
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    showLoading("Procesando información...");

    try {
      // Validar que si el evento es "Asignar" (por label), haya al menos un archivo
      const eventoAsignar = eventoSeleccionado?.nombre === "Asignar";

      const requiereAnexo = eventoSeleccionado?.obligandoAnexo === true;

      if (eventoAsignar && archivos.length === 0) {
        showToast("Debe adjuntar al menos un archivo para el evento 'Asignar'");
        hideLoading();
        // setLoading(false);
        return;
      }

      if (descripcion.trim().length < 6) {
        showToast("La descripción debe tener al menos 6 caracteres");
        // setLoading(false);
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
        console.log(uploadResponse);
        if (!uploadResponse.success) {
          console.log(uploadResponse);

          showToast(uploadResponse.error || "Error al subir archivos");
          // setLoading(false);
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

      const userData = localStorage.getItem("userData");
      if (!userData) {
        setError("Usuario no encontrado");
        // setLoading(false);
        hideLoading();
        return;
      }

      const userStorage = JSON.parse(userData);
      const usuid = userStorage?.id;
      if (!usuid) {
        setError("ID de usuario inválido");
        // setLoading(false);
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

        // setLoading(false);
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
      // setLoading(false);
      hideLoading();
    }

    // setLoading(false);
    hideLoading();
  };

  const eventosQueRequierenAsignacion = ["Asignar", "Solicitar a Funcionario"];

  const nombreEventoSeleccionado = eventoSeleccionado?.nombre ?? "";

  const requiereAsignar = eventosQueRequierenAsignacion.includes(
    nombreEventoSeleccionado
  );

  useEffect(() => {
    if (!requiereAsignar) {
      setUser("");
    }
  }, [requiereAsignar]);

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
              <div className="flex flex-wrap gap-6 items-center">
                <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                  Nuevo evento:
                </label>
                <FloatingSelectLP
                  value={eventoSeleccionado?.id ?? ""}
                  onChange={(value) => {
                    const seleccionado =
                      eventos.find((e) => e.id === value) || null;
                    setEventoSeleccionado(seleccionado);
                  }}
                  options={opcionesEventos}
                />

                {requiereAsignar && (
                  <>
                    <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                      Asignar a:
                    </label>
                    <FloatingSelectLP
                      value={user}
                      onChange={(value) => {
                        setUser(value);
                        console.log("Usuario asignado:", value);
                      }}
                      options={usuarios}
                      showLabelPlaceholder={false}
                    />
                  </>
                )}
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
    </>
  );
};

export default PqrData;
