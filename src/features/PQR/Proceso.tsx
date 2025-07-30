import { useEffect, useRef, useState } from "react";
import { PqrServices } from "../../services/pqrServices";
import type { Pqr, PqrCount } from "../../interfaces/pqrInterfaces";
import UserCard from "../../components/shared/UserCard";
import { AnimatedCount } from "../../components/shared/AnimatedCount";
import { CardSkeleton } from "../../components/shared/CardSkeleton";
import { ChevronUp, Eye } from "lucide-react";
import NoMoreResults from "../../components/shared/ObjetoNoDataList";

const EnProceso = () => {
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [conteo, setConteo] = useState<PqrCount>({ estado: "", cantidad: 0 });
  const [showRealCount, setShowRealCount] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);
  const [sinResultados, setSinResultados] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchPqrs = async (currentPage: number) => {
    if (!hasMore) return;

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
        estadoProceso: "EN PROCESO",
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
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setPqrs([]);
    setHasMore(true);
    fetchPqrs(1).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (page === 1 || !hasMore) return;
    fetchPqrs(page);
  }, [page]);

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

  useEffect(() => {
    setInitialLoading(true);
    const cargarConteo = async () => {
      const userData = localStorage.getItem("userData");
      if (!userData) return;

      const user = JSON.parse(userData);
      const usuid = user?.id;
      const res = await PqrServices.getPqrCountEstadoFlujo("EN PROCESO", usuid);

      if (res.success && res.data.cantidad !== null) {
        setConteo(res.data);
        setTimeout(() => {
          setShowRealCount(true);
        }, 2500);
      }
      setInitialLoading(false);
    };

    cargarConteo();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <Eye size={30} />
        <div className="flex font-bold text-[33px] items-baseline">
          <p className="flex items-center">PQRS en proceso </p>
          {showRealCount ? (
            <span>({conteo.cantidad})</span>
          ) : conteo?.cantidad != null ? (
            <AnimatedCount target={conteo.cantidad} />
          ) : null}
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
              message="No hay a PQRs en proceso"
              subtitle="No se encontraron PQRs en estado de proceso."
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

export default EnProceso;
