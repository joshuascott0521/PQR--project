import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { ParametersServices } from "../../services/pqrServices";
import type { Parameters } from "../../interfaces/pqrInterfaces";
import ParametrosCard from "../../components/shared/ParametrosCard";

const Parametros = () => {
    const [parameters, setParameters] = useState<Parameters[]>([])
    useEffect(() => {
        const fecthParametres = async () => {
            try {
                const responseParameters = await ParametersServices.getParameters();
                if (!responseParameters.success) throw new Error(responseParameters.error);
                setParameters(responseParameters.data);
            } catch (error) {
                console.error(error);
            }
        }
        fecthParametres();
    }, [])

    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-[15px]">
                <SlidersHorizontal size={30} />
                <div className="flex font-bold text-[33px]">
                    <p>Parámetros</p>
                </div>
            </div>
            <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
                {parameters.map((parameter) => (
                    <ParametrosCard key={parameter.codigo} parametros={parameter} />
                ))}
            </div>
        </div>
    )
}

export default Parametros;