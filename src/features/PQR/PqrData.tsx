import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FloatingSelectLP } from "../../components/shared/FloatingSelectLP";
import PqrChat from "../../components/shared/PqrChat";
import { PqrServices, typeSelectComents } from "../../services/pqrServices";
import type { DetallePqr, Evento } from "../../interfaces/pqrInterfaces";

const PqrData = () => {
  const { id } = useParams();

  const [pqr, setPqr] = useState<DetallePqr | null>(null);
  const [, setError] = useState<string>("");

  // Lista de eventos
  const [eventos, setEventos] = useState<Evento[]>([]);
  // Id del evento seleccionado (string)
  const [eventoSeleccionado, setEventoSeleccionado] = useState<string>("");

  const [origen2, setOrigen2] = useState("");

  // Opciones para el select (label/value)
  const opcionesEventos = eventos.map((evento) => ({
    label: evento.nombre,
    value: evento.id,
  }));

  useEffect(() => {
    const fetchPqr = async () => {
      const result = await PqrServices.getById(id!);
      if (result.success) {
        setPqr(result.data);
      } else {
        setError(result.error || "Error desconocido");
      }
    };

    const fetchEventos = async () => {
      const response = await typeSelectComents.getEvento();
      if (response.success && response.data) {
        setEventos(response.data);
      }
    };

    fetchEventos();
    fetchPqr();
  }, [id]);
  return (
    <>
      <div className="h-full max-h-[928px]">
        <div className="flex  gap-1 rounded-md bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] px-6 py-4 max-w-full  flex-row items-center">
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
                <label
                  //   for="tipo"
                  className="font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer max-w-[175px] w-full"
                >
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
                  title="   Solicitud para revisión prueba para que me devuelvan el dinero
                  porque me embargaron."
                >
                  {pqr?.asunto}
                </span>
                {/* <span className="text-gray-600 max-w-full whitespace-normal">
                  
                </span> */}
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
        <div className="flex mt-5 flex-col max-h-[288px] overflow-y-auto h-full">
          {/* <PqrChat pqr={pqr?.detalles} /> */}
          {/* <PqrChat detalles={pqr?.detalle} /> */}
          <div className="space-y-4">
            {pqr?.detalle && <PqrChat key={pqr.id} detalles={pqr.detalle} />}
          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4  mx-auto  h-full mt-3 max-h-[280px]">
          <form className="space-y-4">
            <div className="flex flex-wrap gap-6 items-center">
              <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                Evento:{" "}
              </label>

              <FloatingSelectLP
                value={eventoSeleccionado} // <-- valor seleccionado string
                onChange={setEventoSeleccionado} // <-- recibe string y setea
                options={opcionesEventos} // <-- opciones para el select
                showLabelPlaceholder={false}
              />

              <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                Asignar a:
              </label>
              <FloatingSelectLP
                value={origen2}
                onChange={setOrigen2}
                options={[
                  { value: "web", label: "Portal Web" },
                  { value: "presencial", label: "Atención presencial" },
                  { value: "telefono", label: "Llamada telefónica" },
                  { value: "correo", label: "Correo electrónico" },
                  { value: "redes", label: "Redes sociales" },
                ]}
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
                rows={3}
                className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none overflow-y-auto max-h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Se procede a asignar PQR
              </textarea>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-xs select-none">
                <i className="far fa-file-alt"></i>
                <span>Ejemplo de nombre cualq</span>
                <button
                  type="button"
                  aria-label="Eliminar archivo"
                  className="text-black font-bold text-xs leading-none ml-1"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-1 bg-green-400 hover:bg-green-500 text-white text-xs rounded-md px-3 py-1"
              >
                <i className="fas fa-link"></i>
                Subir archivos
              </button>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white text-sm rounded-md px-4 py-1"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default PqrData;
