import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../../interfaces/pqrInterfaces";

interface FuncionarioCardProps {
  mostrarEditar?: boolean;
  funcionario: Usuario;
}


const FuncionarioCard = ({ mostrarEditar = false, funcionario }: FuncionarioCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full bg-white rounded-xl border border-gray-200 flex items-center gap-6 ${mostrarEditar
        ? "p-3 cursor-default"
        : "p-4 sm:p-6 shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-50 active:scale-95 active:shadow-md transition"
        }`}
      onClick={() => !mostrarEditar && navigate(`/dashboard/funcionarios/resumen/${funcionario.id}`)}
    >

      <div className="flex-shrink-0">
        <img src="/Icon_Funcionario.svg" alt="Icono de funcionario" style={{ width: "50px" }} />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 text-gray-700 text-sm items-center gap-3">
        <div className="flex flex-col items-start justify-center">
          <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full">
            <span className="font-semibold text-base">Documento: </span>
            <span
              className="font-normal text-base "
              title={funcionario.documento}
            >
              {funcionario.documento}
            </span>
          </p>
          <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full">
            <span className="font-semibold text-base">Nombre: </span>
            <span
              className="font-normal text-base "
              title={funcionario.nombre}
            >
              {funcionario.nombre}
            </span>
          </p>
        </div>
        <div className="space-y-1 text-gray-600 text-xs">
          <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full">
            <span className="font-semibold text-base">Cargo: </span>
            <span
              className="font-normal text-base "
              title={funcionario.tipoUsuNombre}
            >
              {funcionario.tipoUsuNombre}
            </span>
          </p>
          <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full">
            <span className="font-semibold text-base">Tipo: </span>
            <span
              className="font-normal text-base "
              title={funcionario.role}
            >
              {funcionario.role}
            </span>
          </p>
        </div>
        <div className="space-y-1 text-gray-600 text-xs">
          <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full">
            <span className="font-semibold text-base">Correo: </span>
            <span
              className="font-normal text-base "
              title={funcionario.email}
            >
              {funcionario.email}
            </span>
          </p>
          <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full">
            <span className="font-semibold text-base">Celular: </span>
            <span
              className="font-normal text-base "
              title={funcionario.celular}
            >
              {funcionario.celular}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 items-center">

        {mostrarEditar &&
          <FaEdit
            className="text-yellow-400 text-[30px] hover:text-yellow-500 cursor-pointer active:scale-90"
            onClick={() => navigate(`/dashboard/admin/funcionario/editar/${funcionario.id}`)}
          />
        }

      </div>
    </div>
  );
};

export default FuncionarioCard;
