import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-5">
      <div
        onClick={() => navigate("/dashboard/PQR/detalle")}
        className=" mx-auto bg-white rounded-lg shadow-md border border-gray-200 flex items-center gap-6 p-4 sm:p-6 cursor-pointer hover:shadow-lg hover:bg-gray-50 active:scale-95 active:shadow-md transition"
      >
        <div className="flex-shrink-0">
          <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-red-500 flex items-center justify-center text-white font-semibold text-3xl -ml-1">
            -5
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-6 text-gray-700 text-sm">
          <div className="flex flex-col items-start justify-center">
            <p className="mb-1 text-gray-900 text-xs font-normal">
              <span className="font-normal text-lg"># Consecutivo: </span>
              <span className="font-semibold text-lg">20240011</span>
            </p>
            <p className="font-semibold text-lg whitespace-nowrap">
              Asunto: Petición de información
            </p>
          </div>
          <div className="space-y-1 text-gray-600 text-xs">
            <p className="flex items-center gap-1 text-lg whitespace-nowrap">
              <i className="far fa-clock text-gray-400 "></i>
              Fecha de Ingreso: 20/11/2024
            </p>
            <p className="flex items-center gap-1 text-lg whitespace-nowrap">
              <i className="far fa-user text-gray-400"></i>
              Cliente 1046578909{" "}
              <span
                className="font-semibold text-lg truncate group-hover"
                title="Juan José Nieto"
              >
                Juan José Nieto
              </span>
            </p>
          </div>
          <div className="flex flex-col items-end justify-between text-gray-900 text-xs font-normal space-y-1 min-w-[160px]">
            <p className="font-semibold text-lg">Respon: Ronald (Abogado)</p>
            <p className="text-[10px] text-lg">
              Estado del flujo:
              <span className="inline-block bg-green-500 text-white rounded-full px-3 py-[2px] font-semibold leading-none ml-1 text-lg">
                En proceso
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
