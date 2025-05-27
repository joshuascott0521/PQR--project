import { FaEdit } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface ClienteCardProps {
  mostrarEditar?: boolean;
}


const ClienteCard = ({ mostrarEditar = false }: ClienteCardProps) => {

  const cliente = {
    documento: "20240011",
    nombre: "Andreina Arteta",
    direccion: "Calle 20 #14-60",
    correo: "cliente@prueba.com",
    celular: "324567345",
    tipo: "Contribuyente"
  };

  const navigate = useNavigate();

  return (
    <div
      className={`w-full bg-white rounded-lg border border-gray-200 flex items-center gap-6 ${mostrarEditar
          ? "p-3 cursor-default"
          : "p-4 sm:p-6 shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-50 active:scale-95 active:shadow-md transition"
        }`}
      onClick={() => !mostrarEditar && navigate(`/dashboard/cliente/detalle/`)}
    >

      <div className="flex-shrink-0">
        <PiUserCircleFill size={50} color="#7bc9a3" />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 text-gray-700 text-sm items-center gap-3">
        <div className="flex flex-col items-start justify-center">
          <p className="mb-1 text-gray-900 text-xs font-normal">
            <span className="font-semibold text-base">Documento: </span>
            <span
              className="font-normal text-base "
              title={cliente.documento}
            >
              {cliente.documento}
            </span>
          </p>
          <p className="mb-1 text-gray-900 text-xs font-normal">
            <span className="font-semibold text-base">Nombre: </span>
            <span
              className="font-normal text-base "
              title={cliente.nombre}
            >
              {cliente.nombre}
            </span>
          </p>
        </div>
        <div className="space-y-1 text-gray-600 text-xs">
          <p className="mb-1 text-gray-900 text-xs font-normal">
            <span className="font-semibold text-base">Direccion: </span>
            <span
              className="font-normal text-base "
              title={cliente.direccion}
            >
              {cliente.direccion}
            </span>
          </p>
          <p className="mb-1 text-gray-900 text-xs font-normal">
            <span className="font-semibold text-base">Tipo: </span>
            <span
              className="font-normal text-base "
              title={cliente.tipo}
            >
              {cliente.tipo}
            </span>
          </p>
        </div>
        <div className="space-y-1 text-gray-600 text-xs">
          <p className="mb-1 text-gray-900 text-xs font-normal">
            <span className="font-semibold text-base">Correo: </span>
            <span
              className="font-normal text-base "
              title={cliente.correo}
            >
              {cliente.correo}
            </span>
          </p>
          <p className="mb-1 text-gray-900 text-xs font-normal">
            <span className="font-semibold text-base">Celular: </span>
            <span
              className="font-normal text-base "
              title={cliente.celular}
            >
              {cliente.celular}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        {mostrarEditar && <FaEdit size={30} color="#ffb700" />}
      </div>
    </div>
  );
};

export default ClienteCard;
