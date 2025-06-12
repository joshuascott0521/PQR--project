import { useEffect, useState } from "react";
import { ParametersServices } from "../../services/pqrServices";
import type { Parameters } from "../../interfaces/pqrInterfaces";
import ParametrosCard from "../../components/shared/ParametrosCard";
import SearchParameters from "../../components/shared/Search";
import { IoIosAddCircleOutline } from "react-icons/io";

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
            <div className="flex mb-[15px] items-center gap-x-5">
                {/*<SlidersHorizontal size={30} />*/}
                <div className="flex font-bold text-[33px]">
                    <p>Parámetros</p>

                </div>
                <SearchParameters />
                <button
                    className="bg-green-500 hover:bg-green-600 px-4 sm:px-4 py-1 rounded-lg text-white text-sm sm:text-md font-semibold flex items-center gap-2"
                    //onClick={handleNew}
                >
                    <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
                    <span>Nuevo Parametro</span>
                </button>
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