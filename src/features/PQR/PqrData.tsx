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
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-sm text-black font-sans max-w-[calc(100%-56px)]">
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
                  className="font-bold flex items-center gap-1 whitespace-nowrap cursor-pointer"
                >
                  <span className="font-normal">Tipo:</span>
                  <select
                    id="tipo"
                    name="tipo"
                    className="appearance-none bg-[#F3F4F6] rounded-full py-1 px-3 text-black text-sm font-normal cursor-pointer max-w-[120px] focus:outline-none"
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
            <div className="text-sm font-sans text-black max-w-full flex flex-wrap gap-1">
              <span className="font-bold whitespace-nowrap">Asunto:</span>
              <span className="font-normal whitespace-normal max-w-[calc(100%-5rem)]">
                Solicitud para revisión
              </span>
              <span className="text-gray-600 max-w-full whitespace-normal">
                prueba para que me devuelvan el dinero porque me embargaron.
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          <PqrChat />
        </div>
      </div>
    </>
  );
};
export default PqrData;
