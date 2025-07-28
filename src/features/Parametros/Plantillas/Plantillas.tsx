import { useState } from "react";
import SearchParameters from "../../../components/shared/Search";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PlantillaCard } from "../../../components/shared/PlantillaCard";
import { useNavigate } from "react-router-dom";

const Plantillas = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const categoria = "templates";
  const handleNew = () => {
    navigate(`/dashboard/admin/parametros/${categoria}/crear`);
  };
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Encabezado */}
      <div className="flex-none mb-[15px] items-center gap-x-5 px-6 pt-6 flex">
        <div className="flex font-bold text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px]">
          <p className="whitespace-nowrap truncate">Plantillas y Prompts</p>
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

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
        {Array.from({ length: 12 }).map((_, idx) => (
          <PlantillaCard
            key={idx}
            dependencia="Secretaría de Hacienda"
            tipo="Petición General"
            codigo={`Pla-00${idx + 1}`}
            observacion="Plantilla para negar acusaciones"
            palabrasClaves={["Prescripción negada", "Pérdida de competencia", "Otros"]}
          />
        ))}
      </div>
    </div>
  );
};


export default Plantillas;
