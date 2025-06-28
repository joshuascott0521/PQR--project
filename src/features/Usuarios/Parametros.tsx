import { useEffect, useState } from "react";
import { ParametersServices } from "../../services/pqrServices";
import type { Parameters } from "../../interfaces/pqrInterfaces";
import ParametrosCard from "../../components/shared/ParametrosCard";
import SearchParameters from "../../components/shared/Search";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Parametros = () => {
  const navigate = useNavigate();
  const [parameters, setParameters] = useState<Parameters[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasErrorOrEmpty, setHasErrorOrEmpty] = useState(false);

  const fetchParameters = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = searchTerm
        ? await ParametersServices.searchParameters(searchTerm)
        : await ParametersServices.getParameters();

      if (!response.success || !response.data || response.data.length === 0) {
        setHasErrorOrEmpty(true);
        setParameters([]);
      } else {
        setHasErrorOrEmpty(false);
        setParameters(response.data);
      }
    } catch (error) {
      console.error(error);
      setHasErrorOrEmpty(true);
      setParameters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchParameters(query.trim());
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleNew = () => {
    navigate(`/dashboard/admin/parametros/crear`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-x-5">
        <div className="flex font-bold text-[33px]">
          <p>Parámetros</p>
        </div>
        <SearchParameters query={query} setQuery={setQuery} />
        <button
          className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-lg text-white text-sm font-semibold flex items-center gap-2"
          onClick={handleNew}
        >
          <IoIosAddCircleOutline className="text-2xl" />
          <span>Nuevo Parámetro</span>
        </button>
      </div>

      <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Cargando parámetros...</p>
        ) : hasErrorOrEmpty ? (
          <p className="text-center text-gray-500">
            {query ? "No se encontraron resultados." : "No hay parámetros disponibles."}
          </p>
        ) : (
          parameters.map((parameter) => (
            <ParametrosCard key={parameter.codigo} parametros={parameter} />
          ))
        )}
      </div>
    </div>
  );
};

export default Parametros;
