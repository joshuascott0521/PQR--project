import { useEffect, useRef, useState } from "react";
import SearchParameters from "../../../components/shared/Search";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PlantillaCard } from "../../../components/shared/PlantillaCard";
import { useNavigate } from "react-router-dom";
import { TemplatesServices } from "../../../services/pqrServices";
import type { GetTemplates } from "../../../interfaces/pqrInterfaces";
import { ChevronUp } from "lucide-react";
import NoMoreResults from "../../../components/shared/ObjetoNoDataList";
import { CardSkeleton } from "../../../components/shared/CardSkeleton";

const Plantillas = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const categoria = "templates";
  const handleNew = () => {
    navigate(`/dashboard/admin/parametros/${categoria}/crear`);
  };

  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sinResultados, setSinResultados] = useState(false);
  const [template, setTemplates] = useState<GetTemplates[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchTemplates = async (currentPage: number) => {
    setLoadingMore(true);

    try {
      const response = await TemplatesServices.getByPage(currentPage, pageSize);
      const data = response.data ?? [];

      if (!response.success || data.length === 0) {
        if (currentPage === 1) setSinResultados(true);
        setHasMore(false);
        return;
      }

      // evitar duplicados por ID
      setTemplates((prev) => {
        const ids = new Set(prev.map((t) => t.id));
        const nuevos = data.filter((t) => !ids.has(t.id));
        return [...prev, ...nuevos];
      });

      if (data.length < pageSize) setHasMore(false);
      setSinResultados(false);
    } catch (error) {
      console.error("Error al cargar plantillas:", error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    setInitialLoading(true);
    setTemplates([]);
    setPage(1); // Esto disparará el siguiente useEffect
    setHasMore(true);
  }, []);

  // Reacción a cambios de página
  useEffect(() => {
    fetchTemplates(page).then(() => {
      if (page === 1) setInitialLoading(false);
    });
  }, [page]);

  // Scroll + botón "subir"
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const bottomReached = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      const shouldShowButton = el.scrollTop > 100;

      if (bottomReached && !loadingMore && hasMore) {
        setPage((prev) => prev + 1);
      }

      setShowScrollTop(shouldShowButton);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Encabezado */}
      <div className="flex-none mb-[15px] items-center gap-x-5 px-6 pt-6 flex">
        <div className="flex font-bold text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px]">
          <p className="whitespace-nowrap truncate">Plantillas</p>
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
      <div
        ref={scrollRef}
        className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4"
      >
        {showScrollTop && (
          <button
            onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all"
            aria-label="Subir al inicio"
          >
            <ChevronUp size={24} />
          </button>
        )}

        {!initialLoading && sinResultados && (
          <div className="flex h-full w-full items-center justify-center">
            <NoMoreResults
              message="No hay plantillas"
              subtitle="No se encontraron plantillas registradas en el sistema."
              showAnimation={true}
            />
          </div>
        )}

        {initialLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton size="client" key={i} />
            ))
          : template.map((t) => (
              <PlantillaCard key={t.id} template={t} categoria="templates" />
            ))}

        {loadingMore &&
          Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton size="client" key={`loader-${i}`} />
          ))}

        {!hasMore && template.length > 0 && (
          <p className="text-center text-gray-400 mt-4">
            No hay más resultados
          </p>
        )}
      </div>
    </div>
  );
};

export default Plantillas;
