import type { DetallePqr } from "../../interfaces/pqrInterfaces";
import { ArchivoServices } from "../../services/pqrServices";
import { showToast } from "../../utils/toastUtils";

const PqrChat = ({ detalles }: { detalles: DetallePqr["detalle"] }) => {
  console.log("CHATTT", detalles);
  return (
    <>
      {detalles?.map((detalle) => (
        <div className="max-w-[1150px] w-full  mx-auto bg-white rounded-lg p-6 shadow-sm mb-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-3">
              <div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200 text-green-700">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight text-gray-900">
                  {detalle.tercero.nombre +
                    " " +
                    "(" +
                    detalle.tercero.tipoTercero +
                    ")"}
                </p>
                <p className="text-xs text-gray-700 leading-tight">
                  {detalle.fechaCreacion?.slice(0, 10)}
                </p>
              </div>
            </div>
            <div>
              <span
                className="inline-block bg-gray-300 text-gray-800 text-xs font-normal rounded-full px-4 py-1"
                style={{ backgroundColor: detalle.codigoColorEstado }}
              >
                {detalle.estado}
              </span>
            </div>
          </div>
          <div
            className=" rounded-md p-4 text-gray-900 text-sm font-normal whitespace-pre-line ml-9 opacity-80"
            style={{
              backgroundColor:
                detalle.tercero.tipoTercero === "Cliente"
                  ? "#e2ffed"
                  : detalle.tercero.tipoTercero === "Funcionario"
                  ? "#fff1dc"
                  : "gray",
            }}
          >
            {/* {pqr?.asunto}c */}
            {detalle.descripcion}
            {detalle.terceroAsignado && (
              <div className="flex max-w-96 mt-2 gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-yellow-700 bg-opacity-50">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  {detalle.terceroAsignado.accion && (
                    <p className="text-xs text-gray-700 leading-tight">
                      {detalle.terceroAsignado.accion}
                    </p>
                  )}
                  <p className="font-semibold text-sm leading-tight text-gray-900">
                    {`${detalle.terceroAsignado.nombre} (${detalle.terceroAsignado.tipoTercero})`}
                  </p>
                </div>
              </div>
            )}

            {detalle.adjuntos?.length > 0 && (
              <div className="mt-4 flex space-x-3">
                {detalle.adjuntos.map((archivo) => (
                  <button
                    className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                    type="button"
                    key={archivo.item}
                    onClick={async () => {
                      const result = await ArchivoServices.descargar(
                        archivo.urlArchivo,
                        archivo.nombre
                      );
                      if (!result.success) {
                        showToast("Error al descargar el archivo");
                      }
                    }}
                  >
                    <i className="far fa-file-pdf text-gray-600 text-sm leading-none"></i>
                    <span className="leading-none">{archivo.nombre}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PqrChat;
