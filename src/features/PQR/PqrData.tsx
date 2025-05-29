import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FloatingSelectLP } from "../../components/shared/FloatingSelectLP";
import PqrChat from "../../components/shared/PqrChat";
import { PqrServices, typeSelectComents } from "../../services/pqrServices";
import type { DetallePqr, Evento } from "../../interfaces/pqrInterfaces";
import { Paperclip, X, File } from "lucide-react";
import toast from "react-hot-toast";

const PqrData = () => {
  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const { id } = useParams();
  const [descripcion, setDescripcion] = useState("");

  const [pqr, setPqr] = useState<DetallePqr | null>(null);
  const [, setError] = useState<string>("");

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<string>("");
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
      console.log(id);

      const result = await PqrServices.getById(id!);
      if (result.success) {
        setPqr(result.data);
      } else {
        setError(result.error || "Error desconocido");
      }
    };

    const fetchEventos = async () => {
      const response = await typeSelectComents.getEvento(id!);
      if (response.success && response.data) {
        setEventos(response.data);
        console.log("💗💗✅✅✅", response);
      }
    };
    const fetchUsuarios = async () => {
      const response = await typeSelectComents.getUsuarios();
      if (response.success && response.data) {
        const opciones = response.data.map((usuario: any) => ({
          label: usuario.nombre,
          value: usuario.id,
        }));
        setUsuarios(opciones);
        console.log("Usuarios desde backend:", opciones);
      }
    };

    fetchUsuarios();
    fetchEventos();
    fetchPqr();
  }, [id]);

  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = e.target.files ? Array.from(e.target.files) : [];

    if (archivos.length + nuevos.length > 5) {
      toast.error("Solo puedes subir hasta 5 archivos.");
      return;
    }

    const size = 5;
    const maxSizeBytes = size * 1024 * 1024;
    const archivosValidos = nuevos.filter((file) => {
      if (file.size > maxSizeBytes) {
        toast.error(
          `El archivo "${file.name}" excede el límite de ${size} MB.`
        );
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

    try {
      // Subir archivos antes de enviar los datos
      const uploadResponse = await PqrServices.uploadFiles(archivos);

      if (!uploadResponse.success) {
        console.log(uploadResponse);

        toast.error(uploadResponse.error || "Error al subir archivos");
        return;
      }

      // Formatear los archivos subidos
      const adjuntos = uploadResponse.data.map((archivo, index) => ({
        item: index,
        nombre: archivo.nombre,
        extension: archivo.extension,
        urlArchivo: archivo.urlArchivo,
      }));
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setError("Usuario no encontrado");
        return;
      }

      const userStorage = JSON.parse(userData);
      const usuid = userStorage?.id;
      if (!usuid) {
        setError("ID de usuario inválido");
        return;
      }

      const datos = {
        pqrId: id || "",
        eventoId: eventoSeleccionado,
        descripcion,
        usuarioId: usuid, // Aquí pon el ID del usuario que crea esto si aplica
        funcionarioAsignadoId: user,
        fechaCreacion: new Date().toISOString(),
        tipoNotificacion: null, // o el tipo que corresponda
        fechaNotificacion: null,
        diasAmpliacion: 0,
        adjuntos,
      };

      console.log("📦 Datos a enviar:", datos);
      // Aquí puedes llamar al método para guardar los datos, por ejemplo:
      // const response = await PqrServices.crearEvento(datos);
    } catch (error) {
      toast.error("Ocurrió un error al procesar el formulario");
      console.error(error);
    }
  };

  return (
    <div className="h-full max-h-[928px]">
      <div className="flex gap-1 rounded-md bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] px-6 py-4 max-w-full flex-row items-center">
        <div className="mr-[10px]">
          <div
            className="flex items-center justify-center w-[47px] h-[47px] rounded-full bg-[#FFEB3B] text-black font-semibold text-lg flex-shrink-0"
            aria-label="Number 13"
          >
            {pqr?.diasRestantes}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-sm text-black font-sans w-full">
              <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                <span className="font-normal">#</span> {pqr?.consecutivo}
              </span>
              <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                <span className="font-normal">No. Radicado:</span>{" "}
                {pqr?.radicado}
              </span>
              <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                <span className="font-normal">Fecha:</span> {pqr?.fecha}
              </span>
              <label className="font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer max-w-[175px] w-full">
                <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                  <span className="font-normal">Tipo:</span>{" "}
                  {pqr?.tipoPQRNombre}
                </span>
              </label>
            </div>
            <div
              className="px-4 w-full flex justify-center max-w-32 py-1 rounded-full bg-gray-400 text-gray-900 text-sm font-normal whitespace-nowrap overflow-hidden text-ellipsis"
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
                title="   Solicitud para revisión prueba para que me devuelvan el dinero porque me embargaron."
              >
                {pqr?.asunto}
              </span>
            </div>
            <div className="text-sm font-sans text-black max-w-full flex flex-wrap gap-1">
              <span className="font-bold whitespace-nowrap">Responsable:</span>
              <span className="font-normal whitespace-normal max-w-[calc(100%-5rem)]">
                {pqr?.funcionario?.nombre}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-5 flex-col max-h-[300px] overflow-y-auto h-full">
        <div className="space-y-4">
          {pqr?.detalle && <PqrChat key={pqr.id} detalles={pqr.detalle} />}
        </div>
      </div>
      <div className="border border-gray-300 rounded-md p-4 mx-auto h-full mt-3 max-h-[265px]">
        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-6 items-center">
            <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
              Evento:
            </label>
            <FloatingSelectLP
              value={eventoSeleccionado}
              onChange={setEventoSeleccionado}
              options={opcionesEventos}
              showLabelPlaceholder={false}
            />
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
          </div>

          <div>
            <label
              htmlFor="descripcion"
              className="block text-xs text-gray-600 mb-1"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none overflow-y-auto max-h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
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
            <label
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer w-fit ${
                archivos.length >= 5
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
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white text-lg rounded-3xl px-[22px] py-[7px]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PqrData;
