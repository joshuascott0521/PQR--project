import React from "react";
import type { Pqr } from "../../interfaces/pqrInterfaces";
import CompactUserCard from "./CompactUserCard";

interface ResultadoBusquedaProps {
  resultados: Pqr[];
  loading: boolean;
  onCardClick: () => void;
}


const ResultadoBusqueda: React.FC<ResultadoBusquedaProps> = ({ resultados, loading, onCardClick }) => {
  if (loading) {
    return <p className="text-center text-gray-500 py-2">Buscando resultados...</p>;
  }

  if (resultados.length === 0) {
    return <p className="text-center text-gray-400 py-2">No se encontraron coincidencias.</p>;
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-base font-semibold text-center border-b pb-2 mb-3">
        Resultado de Búsqueda
      </h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
        {resultados.map((pqr) => (
          <CompactUserCard key={pqr.id} pqr={pqr} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
};

export default ResultadoBusqueda;
