import { File, X, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SolicitudServices, PqrServices } from "../../services/pqrServices";
import type { SolicitudRequisitoDTO } from "../../interfaces/pqrInterfaces";
import { showToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { EliminarEmojis } from "../../utils/EliminarEmojis";
import { SolicitudSkeleton } from "./SolititudSkeleton";
import { useLoading } from "../../contexts/LoadingContext";

export default function SolicitudFrm() {
  const { showLoading, hideLoading } = useLoading();
  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [solicitud, setSolicitud] = useState<SolicitudRequisitoDTO | null>(
    null
  );
  const { id } = useParams();
  //const navigate = useNavigate();

  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = e.target.files ? Array.from(e.target.files) : [];
    const size = 5;
    const maxSizeBytes = size * 1024 * 1024;

    if (archivos.length + nuevos.length > 5) {
      showToast("Solo puedes subir hasta 5 archivos.");
      return;
    }

    const archivosValidos = nuevos.filter((file) => {
      if (file.size > maxSizeBytes) {
        toast.error(`El archivo "${file.name}" excede el límite de ${size} MB.`);
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

  const handleEnviar = async () => {
    if (!id || !mensaje.trim()) {
      showToast("Debe ingresar un mensaje válido.");
      return;
    }

    const subida = await PqrServices.uploadFiles(archivos);

    if (!subida.success) {
      showToast("Error al subir los archivos adjuntos");
      return;
    }

    const result = await SolicitudServices.responderPut({
      id: parseInt(id),
      mensaje: mensaje,
      adjuntos: subida.data,
    });

    if (result.success) {
      showToast("Respuesta enviada exitosamente", "success");

    } else {
      showToast(result.error || "Error al enviar respuesta");
    }
  };

  useEffect(() => {
    if (!id) return;
    showLoading("Procesando información...");
    const cargarDatos = async () => {
      const result = await SolicitudServices.getById(id);
      if (result.success) {
        setSolicitud(result.data);
        hideLoading();
      } else {
        showToast(result.error || "Error al cargar solicitud");
      }
    };

    cargarDatos();
  }, [id]);

  const esVencida = solicitud?.diasVencidos?.toLowerCase().includes("vencida");
  const esRespondida = solicitud?.diasVencidos?.toLowerCase().includes("respondido");
  const esEditable = !esVencida && !esRespondida;


  return (
    <div>
      {solicitud ? (
        <>
          <div className="bg-white p-4 w-full flex flex-col overflow-hidden shadow-xl rounded-xl">
            {/* Encabezado */}
            <div className="w-full mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-4 max-w-6xl mx-auto">
                <div className="relative flex justify-center mb-5">
                  <div className="absolute left-[50px] top-[50%]  mt-2 z-0 text-[8px] bg-yellow-200 rounded-full py-1 px-2 text-black md:text-xs text-center">
                    Alcaldía de Baranoa - NIT: 890.112.371
                  </div>
                  <div
                    className="bg-yellow-400 text-black font-bold text-[10px] xl:text-xs px-6 md:px-8 py-2 rounded-full text-center whitespace-nowrap shadow"
                  >
                    Sistema de Gestión de solicitudes PQR+
                  </div>

                </div>

                <div className="flex justify-center md:justify-end">
                  <img
                    className="w-[220px] md:w-[300px] h-auto"
                    src="/public/Logo-static.png"
                    alt="Logo"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-4 items-center">
              {/* Información de la solicitud */}
              {solicitud && (
                <div className="border border-gray-300 rounded-md p-4 w-full max-w-4xl text-sm font-sans">
                  <div className="flex flex-wrap gap-4">
                    <p>
                      <span className="font-bold">No. de Solicitud:</span>{" "}
                      {solicitud.idTxt}
                    </p>
                    <p>
                      <span className="font-bold">Fecha Solicitud:</span>{" "}
                      {new Date(solicitud.fechaSolicitud).toLocaleDateString()}{" "}
                      {esVencida && (
                        <span className="text-red-600 font-semibold">
                          ({solicitud.diasVencidos})
                        </span>
                      )}
                      {esRespondida && (
                        <span className="text-[#6D28D9] font-semibold">
                          ({solicitud.diasVencidos})
                        </span>
                      )}
                      {esEditable && (
                        <span className="text-green-600 font-semibold">
                          ({solicitud.diasVencidos})
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="mt-2">
                    <span className="font-bold">Asunto: </span> {solicitud.asunto}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <p>
                      <span className="font-bold">Solicitante:</span>{" "}
                      {solicitud.solicitanteNombre}
                    </p>
                    <p>
                      <span className="font-bold">Cargo Solicitante:</span>{" "}
                      {solicitud.solicitanteCargo}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="w-full max-h-[120px] border border-gray-300 rounded-lg p-3 overflow-y-auto whitespace-pre-wrap text-black bg-white">
                      {solicitud.mensaje}
                    </div>
                  </div>
                </div>
              )}

              {/* Respuesta */}
              <div className="border border-gray-300 rounded-md p-4 w-full max-w-4xl text-sm font-sans">
                <p className="font-bold mb-2">Responder</p>

                <textarea
                  id="respuesta"
                  placeholder="Responda a la solicitud"
                  className="w-full border border-gray-300 rounded-md p-2 h-[120px] resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={mensaje}
                  onChange={(e) => setMensaje(EliminarEmojis(e.target.value))}
                  disabled={!esEditable}
                />


                {esEditable && (
                  <>
                    <div className="space-y-3 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {archivos.map((archivo, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 max-w-xs"
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
                        ))}
                      </div>
                      <label
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer w-fit
                        ${archivos.length >= 5
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-emerald-400 text-white hover:bg-emerald-500"
                          }`}
                      >
                        <Paperclip className="w-4 h-4" />
                        {archivos.length >= 5 ? "Límite alcanzado" : "Subir archivos"}
                        <input
                          key={inputKey}
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleArchivos}
                          disabled={archivos.length >= 5}
                        />
                      </label>
                    </div>
                    <div className="flex justify-end mt-1">
                      <button
                        onClick={handleEnviar}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
                      >
                        Enviar Respuesta
                      </button>

                    </div>
                  </>
                )}
                {esVencida && (
                  <div className="flex justify-end mt-2">
                    <button
                      className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Solicitud Vencida
                    </button>
                  </div>
                )}
                {esRespondida && (
                  <div className="flex justify-end mt-2">
                    <button
                      className="bg-[#6D28D9] text-white font-semibold px-6 py-2 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Solicitud Respuesta
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <SolicitudSkeleton />
      )}
    </div>
  );
}
