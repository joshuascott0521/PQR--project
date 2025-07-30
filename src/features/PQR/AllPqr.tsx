import { ChevronUp, ClipboardList } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Pqr } from "../../interfaces/pqrInterfaces";
import { PqrServices } from "../../services/pqrServices";
import UserCard from "../../components/shared/UserCard";
import { CardSkeleton } from "../../components/shared/CardSkeleton";
import NoMoreResults from "../../components/shared/ObjetoNoDataList";

const AllPqr = () => {
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sinResultados, setSinResultados] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchPqrs = async (currentPage: number) => {
    if (!hasMore) return;

    if (currentPage === 1) setInitialLoading(true); // Solo en primera carga
    setLoadingMore(true);

    try {
      const userData = localStorage.getItem("userData");
      if (!userData) return;

      const user = JSON.parse(userData);
      const usuid = user?.id;
      if (!usuid) return;

      const data = await PqrServices.getByEstado({
        usuid,
        page: currentPage,
        size: pageSize,
        orden: 1,
      });

      if (!data || !data.data || data.data.length === 0) {
        if (currentPage === 1) setSinResultados(true);
        setHasMore(false);
        return;
      }

      setPqrs((prev) => {
        const combined = [...prev, ...data.data];
        return Array.from(new Map(combined.map((item) => [item.id, item])).values());
      });

      if (data.data.length < pageSize) {
        setHasMore(false);
      }

      setSinResultados(false);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
      if (currentPage === 1) setInitialLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    setPage(1);
    setPqrs([]);
    setHasMore(true);
    fetchPqrs(1);
  }, []);

  // Scroll infinito
  useEffect(() => {
    if (page === 1 || !hasMore) return;
    fetchPqrs(page);
  }, [page]);

  // Escucha de scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const bottomReached = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      const shouldShowButton = el.scrollTop > 100; // muestra el botón después de 100px de scroll

      if (bottomReached && !loadingMore && hasMore) {
        setPage((prev) => prev + 1);
      }

      setShowScrollTop(shouldShowButton);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);


  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <ClipboardList size={30} />
        <div className="flex font-bold text-[33px]">
          {<p>Todos los PQRs</p>}
        </div>
      </div>

      <div
        className="flex-1 overflow-auto bg-gray-100 px-6 py-4 rounded-lg"
        ref={scrollRef}
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
              message="No hay a PQRs"
              subtitle="No se encontraron PQRs en la base de datos"
              showAnimation={true}
            />
          </div>
        )}

        <div className="space-y-4">
          {initialLoading
            ? Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton size="medium" key={i} />
            ))
            : pqrs.map((pqr) => <UserCard key={pqr.id} pqr={pqr} />)}
        </div>
        {!initialLoading && loadingMore && (
          <p className="text-center text-gray-500 mt-4">Cargando más PQRs...</p>
        )}
        {!hasMore && (
          <p className="text-center text-gray-400 mt-4">
            No hay más resultados
          </p>
        )}
      </div>
    </div>
  );
};

export default AllPqr;
