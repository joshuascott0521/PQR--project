import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Pqr } from "../../interfaces/pqrInterfaces";
import { PqrServices } from "../../services/pqrServices";
import ResultadoBusqueda from "../../components/shared/ResultadoBusqueda";


const ResultadosBusquedaPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [resultados, setResultados] = useState<Pqr[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResultados = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const res = await PqrServices.getByFilter({ value: query, page: 1, size: 20 });
        if (res.success) {
          setResultados(res.data);
        }
      } catch (err) {
        console.error("Error en búsqueda:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Resultados de búsqueda: "{query}"</h2>
      <ResultadoBusqueda resultados={resultados} loading={loading} />
    </div>
  );
};

export default ResultadosBusquedaPage;
