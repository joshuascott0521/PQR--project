
import type { FC } from "react";
import { FaEdit } from "react-icons/fa";

interface PlantillaCardProps {
    dependencia: string;
    tipo: string;
    codigo: string;
    observacion: string;
    palabrasClaves: string[];
    onEdit?: () => void;
}

export const PlantillaCard: FC<PlantillaCardProps> = ({
    dependencia,
    tipo,
    codigo,
    observacion,
    palabrasClaves,
    //onEdit,
}) => {
    return (
        <div className="w-full flex items-center justify-between bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
            {/* Icono HTML */}
            <div className="flex-shrink-0 mr-4">
                <img src="/Html.png" alt="HTML Icon" className="w-10 h-auto" />
            </div>

            {/* Contenido */}
            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-4 text-sm text-gray-800">
                {/* Columna 1 */}
                <div>
                    <p>
                        <span className="font-semibold">Dependencia:</span> {dependencia}
                    </p>
                    <p>
                        <span className="font-semibold">Tipo:</span> {tipo}
                    </p>
                </div>

                {/* Columna 2 */}
                <div className="flex flex-col">
                    <p>
                        <span className="font-semibold">Código:</span> {codigo}
                        <span className="ml-36">
                            <span className="font-semibold">Observación:</span>{" "}
                            <span className="truncate max-w-[260px] inline-block align-middle">{observacion}</span>
                        </span>
                    </p>


                    <div className="flex items-center flex-wrap gap-2 mt-1">
                        <span className="font-semibold">Palabras Claves:</span>
                        {palabrasClaves.map((p, idx) => (
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
                <div className="mt-1 sm:mt-0">
                    <FaEdit
                        size={30}
                        className="ml-3 text-yellow-400 hover:text-yellow-500 cursor-pointer active:scale-90 flex-shrink-0"
                        //onClick={() => navigate(`/dashboard/admin/parametros/${categoria}/${parametros.codigo}`)}
                    />
                </div>
            </div>
        </div>

    );
};
