import { useNavigate } from "react-router-dom";
import type { Pqr } from "../../interfaces/pqrInterfaces";

const UserCard = ({ pqr }: { pqr: Pqr }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-5">
      <div
        onClick={() => navigate(`/dashboard/PQR/detalle/`)}
        className="mx-auto bg-white rounded-lg shadow-md border border-gray-200 flex items-center gap-6 p-4 sm:p-6 cursor-pointer hover:shadow-lg hover:bg-gray-50 active:scale-95 active:shadow-md transition"
      >
        <div className="flex-shrink-0">
          <div
            className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center text-white font-semibold text-3xl -ml-1"
            style={{ backgroundColor: pqr.colorHex }}
          >
            {pqr.diasRestantes}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 text-gray-700 text-sm items-center gap-2.5">
          <div className="flex flex-col items-start justify-center">
            <p className="mb-1 text-gray-900 text-xs font-normal">
              <span className="font-normal text-base"># Consecutivo: </span>
              <span className="font-semibold text-base">{pqr.consecutivo}</span>
            </p>
            <p className="font-semibold text-base whitespace-nowrap">
              Asunto: {pqr.asunto}
            </p>
          </div>
          <div className="space-y-1 text-gray-600 text-xs">
            <p className="flex items-center gap-1 text-base whitespace-nowrap">
              <i className="far fa-user text-gray-400"></i>
              Cliente {pqr.documentoCliente}{" "}
              <span className="font-semibold text-base">
                {pqr.nombreCliente}
              </span>
            </p>
            <p className="flex items-center gap-1 text-base whitespace-nowrap">
              Tipo: {pqr.nombreTipoPQR}
            </p>
          </div>
          <div className="flex flex-col items-start justify-between text-gray-900 text-xs font-normal space-y-1 min-w-[160px]">
            <p className="font-semibold text-base">
              Responsable: {pqr.nombreFuncionario}
            </p>
            <p className="text-[10px] text-base">
              Estado del flujo:
              <span
                className="inline-block text-white rounded-full px-3 py-[2px] font-semibold leading-none ml-1 text-lg"
                style={{ backgroundColor: pqr.colorHex }}
              >
                {pqr.estado}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
