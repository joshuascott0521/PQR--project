import { useNavigate } from "react-router-dom";
import type { Pqr } from "../../interfaces/pqrInterfaces";

const UserCard = ({ pqr }: { pqr: Pqr }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-5 w-full mx-auto max-w-7xl">
      <div
        onClick={() => navigate(`/dashboard/PQR/detalle/${pqr.id}`)}
        className="bg-white rounded-lg shadow-md border border-gray-200 flex items-center gap-6 p-4 sm:p-6 cursor-pointer hover:shadow-lg hover:bg-gray-50 active:scale-95 active:shadow-md transition"
      >
        {/* Días restantes */}
        <div className="flex-shrink-0">
          <div
            className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center text-white font-semibold text-3xl"
            // style={{ backgroundColor: pqr.colorHex }}
            style={{
              backgroundColor:
                pqr.estadoVencimiento === "VENCIDO"
                  ? " #dc2626"
                  : pqr.estadoVencimiento === "POR VENCER"
                  ? "#ffe900 "
                  : "#22c55e",
            }}
          >
            {pqr.diasRestantes}
          </div>
        </div>

        {/* Información */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 text-gray-700 text-sm items-center gap-2.5">
          <div>
            <p className="font-semibold">
              # Consecutivo:{" "}
              <span className="font-normal">{pqr.consecutivo}</span>
            </p>
            <p className="truncate" title={pqr.asunto}>
              Asunto: {pqr.asunto}
            </p>
            <p>Radicado: {pqr.radicado}</p>
          </div>

          <div>
            <p>
              Cliente: {pqr.documentoCliente} - {pqr.nombreCliente}
            </p>
            <p>Ingreso: {pqr.fecha}</p>
          </div>

          <div>
            <p>Responsable: {pqr.nombreFuncionario}</p>
            <p>
              Estado:{" "}
              <span
                className="inline-block text-white rounded-full px-3 py-[2px] font-semibold text-xs"
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
