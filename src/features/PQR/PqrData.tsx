import PqrChat from "../../components/shared/PqrChat";

const PqrData = () => {
  return (
    <>
      <div>
        <div className="flex  gap-1 rounded-md bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] px-6 py-4 max-w-full  flex-row items-center">
          <div className="mr-[10px]">
            <div
              className="flex items-center justify-center w-[47px] h-[47px] rounded-full bg-[#FFEB3B] text-black font-semibold text-2xl flex-shrink-0"
              aria-label="Number 13"
            >
              13
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-sm text-black font-sans w-full">
                <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                  <span className="font-normal">#</span> 20240011
                </span>
                <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                  <span className="font-normal">No. Radicado:</span>{" "}
                  2024034434099
                </span>
                <span className="font-bold flex items-center gap-1 whitespace-nowrap">
                  <span className="font-normal">Fecha:</span> 20-11-2024
                </span>
                <label
                  //   for="tipo"
                  className="font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer max-w-[175px] w-full"
                >
                  <span className="font-normal">Tipo:</span>
                  <select
                    id="tipo"
                    name="tipo"
                    className="appearance-none bg-[#F3F4F6] rounded-full py-1 px-3 text-black text-sm font-normal cursor-pointer max-w-[120px] focus:outline-none w-full"
                    aria-label="Tipo select"
                  >
                    <option>Solicitud</option>
                  </select>
                  <i
                    className="fas fa-chevron-down text-black text-xs pointer-events-none ml-[-20px]"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>
              <div className="px-4 py-1 rounded-full bg-gray-400 text-gray-900 text-sm font-normal">
                Registrado
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
                  Solicitud para revisión prueba para que me devuelvan el dinero
                  porque me embargaron.
                </span>
                {/* <span className="text-gray-600 max-w-full whitespace-normal">
                  
                </span> */}
              </div>
              <div className="text-sm font-sans text-black max-w-full flex flex-wrap gap-1">
                <span className="font-bold whitespace-nowrap">
                  Responsable:
                </span>
                <span className="font-normal whitespace-normal max-w-[calc(100%-5rem)]">
                  Ronald Moreno
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-5 flex-col max-h-[300px] overflow-y-auto">
          <PqrChat />
          <PqrChat />
          <PqrChat />

          <PqrChat />

          <PqrChat />
        </div>
        <div className="border border-gray-300 rounded-md p-4  mx-auto max-h-[317px] h-full mt-3">
          <form className="space-y-4">
            <div className="flex flex-wrap gap-6 items-center">
              <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                Evento:
                <select
                  name="evento"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Asignar</option>
                </select>
              </label>

              <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
                Asignar a:
                <select
                  name="asignar"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Junior Euclides</option>
                </select>
              </label>
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
                className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none overflow-y-auto max-h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
