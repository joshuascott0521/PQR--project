import { useEffect, useState } from "react";
import { ParametersServices } from "../../../services/pqrServices";
import type { Parameters } from "../../../interfaces/pqrInterfaces";
import ParametrosCard from "../../../components/shared/ParametrosCard";
import SearchParameters from "../../../components/shared/Search";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CardSkeleton } from "../../../components/shared/CardSkeleton";

const General = () => {
    const navigate = useNavigate();
    const [parameters, setParameters] = useState<Parameters[]>([]);
    const [query, setQuery] = useState("");
    const [initialLoading, setInitialLoading] = useState(true);
    const categoria = "general";


    const fetchParameters = async (searchTerm: string) => {
        setInitialLoading(true);
        try {
            const response = searchTerm
                ? await ParametersServices.searchParameters(searchTerm)
                : await ParametersServices.getParameters();

            if (!response.success || !response.data || response.data.length === 0) {

                setParameters([]);
            } else {

                setInitialLoading(false)
                setParameters(response.data);
            }
        } catch (error) {
            console.error(error);

            setParameters([]);
        } finally {
            setInitialLoading(false)
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchParameters(query.trim());
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleNew = () => {
        navigate(`/dashboard/admin/parametros/${categoria}/crear`);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-x-5">
                <div className="flex font-bold text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px]">
                    <p className="whitespace-nowrap truncate">Parámetros Generales</p>
                </div>
                <SearchParameters query={query} setQuery={setQuery} />
                <button
                    className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-lg text-white text-sm font-semibold flex items-center gap-2"
                    onClick={handleNew}
                >
                    <IoIosAddCircleOutline className="text-2xl" />
                    <span>Agregar</span>
                </button>
            </div>

            <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
                {initialLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <CardSkeleton size="small" key={i} />
                    ))
                    : parameters.map((parameter) => (
                        <ParametrosCard key={parameter.codigo} parametros={parameter} categoria="general" />
                    ))
                }
            </div>
        </div>
    );
}

export default General;