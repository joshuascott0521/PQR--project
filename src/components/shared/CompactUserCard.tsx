import { useNavigate } from "react-router-dom";
import type { Pqr } from "../../interfaces/pqrInterfaces";

const CompactUserCard = ({ pqr }: { pqr: Pqr }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-3 w-full mx-auto max-w-6xl">
      <div
        onClick={() => navigate(`/dashboard/PQR/detalle/${pqr.id}`)}
        className="bg-white rounded-md shadow-sm border border-gray-200 flex items-center gap-4 p-3 sm:p-4 cursor-pointer hover:shadow-md hover:bg-gray-50 active:scale-[0.98] active:shadow transition"
      >
        {/* Días restantes */}
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: pqr.colorHex }}
          >
            {pqr.diasRestantes}
          </div>
        </div>

        {/* Información */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-0.5 text-gray-700 text-xs sm:text-sm items-center gap-2">
          <div>
            <p className="font-medium">
              #{pqr.consecutivo}
            </p>
            <p className="truncate" title={pqr.asunto}>
              {pqr.asunto}
            </p>
          </div>

          <div>
            <p className="truncate">
              {pqr.documentoCliente} - {pqr.nombreCliente}
            </p>
            <p>{pqr.fecha}</p>
          </div>

          <div>
            <p className="truncate">Resp: {pqr.nombreFuncionario}</p>
            <span
              className="inline-block mt-1 text-white rounded-full px-2 py-[1px] font-semibold text-[0.7rem]"
              style={{ backgroundColor: pqr.colorHex }}
            >
              {pqr.estado}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactUserCard;
