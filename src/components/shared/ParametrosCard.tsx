//import { useNavigate } from "react-router-dom";
import type { Parameters } from "../../interfaces/pqrInterfaces";
import { Settings } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ParametrosCardProps {
    parametros: Parameters;
}

const ParametrosCard = ({ parametros }: ParametrosCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            className="w-full bg-white rounded-lg border border-gray-200 flex items-center gap-6 p-4 sm:p-4 shadow-md hover:shadow-lg hover:bg-gray-50"
        //onClick={() => !mostrarEditar && navigate(`/dashboard/cliente/detalle/${parametros.codigo}`)}
        >
            <div className="flex-shrink-0">
                <Settings size={40} className="text-blue-600" />
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 text-gray-700 text-sm items-center gap-3">
                <div className="flex flex-col items-start justify-center">
                    <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full">
                        <span className="font-semibold text-base">Codigo: </span>
                        <span
                            className="font-normal text-base "
                            title={parametros.codigo}
                        >
                            {parametros.codigo}
                        </span>
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center text-gray-600 text-xs">
                    <p className="mb-1 text-gray-900 text-xs font-normal truncate w-full text-center">
                        <span className="font-semibold text-base">Tipo: </span>
                        <span
                            className="font-normal text-base"
                            title={parametros.tipoParametro}
                        >
                            {parametros.tipoParametro}
                        </span>
                    </p>
                </div>

                <div className="flex items-center justify-between text-gray-600 text-xs w-full">
                    <p className="mb-1 text-gray-900 text-xs font-normal truncate flex items-center w-full">
                        <span className="font-semibold text-base">Descripción: </span>
                        <span
                            className="font-normal text-base ml-1 truncate"
                            title={parametros.descripcion}
                        >
                            {parametros.descripcion}
                        </span>
                    </p>

                    <FaEdit
                        size={30}
                        className="ml-3 text-yellow-400  hover:text-yellow-500 cursor-pointer active:scale-90 flex-shrink-0"
                        onClick={() => navigate(`/dashboard/admin/parametros/detalle/${parametros.codigo}`)}
                    />
                </div>


            </div>
        </div>
    );
}

export default ParametrosCard;