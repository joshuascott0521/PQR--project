
import { FaEdit } from "react-icons/fa";
import type { GetTemplates } from "../../interfaces/pqrInterfaces";
import { useNavigate } from "react-router-dom";

interface PlantillaCardProps {
    template: GetTemplates;
    categoria: string;
}

export const PlantillaCard = ({ template, categoria }: PlantillaCardProps) => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex items-center bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
            {/* Icono HTML */}
            <div className="flex-shrink-0 mr-4">
                <img src="/Html.png" alt="HTML Icon" className="w-10 h-auto" />
            </div>

            {/* Contenido */}
            <div className="flex-1 grid sm:grid-cols-3 gap-4 text-sm text-gray-800 items-start">
                {/* Columna 1 */}
                <div>
                    <p>
                        <span className="font-semibold">Dependencia:</span> {template.nombreDependencia}
                    </p>
                    <p>
                        <span className="font-semibold">Tipo:</span> {template.nombreTipoPQR}
                    </p>
                </div>

                {/* Columna 2 */}
                <div className="flex flex-col w-full">
                    {/* Línea fija para Código y Observación */}
                    <div className="flex justify-between w-full">
                        <span className="font-semibold whitespace-nowrap">
                            Código: <span className="font-normal">{template.id}</span>
                        </span>
                        <span className="font-semibold ml-6 whitespace-nowrap">
                            Observación: <span className="font-normal truncate max-w-[260px]">{template.observaciones}</span>
                        </span>
                    </div>

                    {/* Palabras clave */}
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                        <span className="font-semibold">Palabras Claves:</span>
                        {template.palabrasClave.map((p, idx) => (
                            <span
                                key={idx}
                                className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                            >
                                {p}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Columna 3: botón */}
                <div className="flex justify-end items-start">
                    <FaEdit
                        size={30}
                        className="text-yellow-400 hover:text-yellow-500 cursor-pointer active:scale-90"
                        onClick={() => navigate(`/dashboard/admin/parametros/${categoria}/${template.id}`)}
                    />
                </div>
            </div>
        </div>

    );
};
