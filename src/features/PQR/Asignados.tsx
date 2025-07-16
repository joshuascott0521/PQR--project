import { useEffect, useRef, useState } from "react";
import { PqrServices } from "../../services/pqrServices";
import type { Pqr, PqrCount } from "../../interfaces/pqrInterfaces";
import UserCard from "../../components/shared/UserCard";
import { AnimatedCount } from "../../components/shared/AnimatedCount";
import { CardSkeleton } from "../../components/shared/CardSkeleton";
// import { AiOutlineFolderView } from "react-icons/ai";
import { ClipboardCheck } from "lucide-react";
import type { AxiosError } from "axios";
import NoMoreResults from "../../components/shared/ObjetoNoDataList";

const Asignado = () => {
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [conteo, setConteo] = useState<PqrCount>({ estado: "", cantidad: 0 });
  const [showRealCount, setShowRealCount] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loadingMore);

  useEffect(() => {
    loadingRef.current = loadingMore;
  }, [loadingMore]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      if (isAtBottom && !loadingRef.current && hasMore) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    const fetchPqrs = async () => {
      setLoadingMore(true);
      try {
        const userData = localStorage.getItem("userData");
        if (!userData) {
          setError("Usuario no encontrado");
          setLoadingMore(false);
          return;
        }

        const user = JSON.parse(userData);
        const usuid = user?.id;
        if (!usuid) {
          setError("ID de usuario inválido");
          setLoadingMore(false);
          return;
        }

        const data = await PqrServices.getByEstado({
          usuid,
          page: currentPage,
          size: 10,
          estadoProceso: "Asignado",
          orden: 1,
        });

        if (!data || data.length === 0) {
          setHasMore(false);
          return;
        }

        setPqrs((prev) => {
          const combined = [...prev, ...data.data];
          const unique = Array.from(
            new Map(combined.map((item) => [item.id, item])).values()
          );
          return unique;
        });
      } catch (err) {
        const error = err as AxiosError;
        // const error = err?.response?.status
        if (error.response?.status === 404) {
          setHasMore(false); // <-- DETIENE SCROLL
        } else {
          console.error(err);
          setError("Ocurrió un error al cargar los datos.");
        }
        console.error(err);
      } finally {
        setLoadingMore(false);
      }
    };

    fetchPqrs();
  }, [currentPage]);

  useEffect(() => {
    setInitialLoading(true);
    const cargar = async () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setError("Usuario no encontrado");
        setInitialLoading(false);
        return;
      }

      const user = JSON.parse(userData);
      const usuid = user?.id;
      const res = await PqrServices.getPqrCountEstadoFlujo("ASIGNADO", usuid);

      if (res.success && res.data.cantidad !== null) {
        setConteo(res.data);
        setTimeout(() => {
          setShowRealCount(true);
        }, 2500);
      }
      setInitialLoading(false);

      setLoadingMore(false);
    };

    cargar();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <ClipboardCheck size={30} />
        <div className="flex font-bold text-[33px] items-baseline">
          <p className="flex items-center">PQRS asignados </p>
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
        {error && <p className="text-red-600">{error}</p>}
        {!loadingMore && !error && pqrs.length === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <NoMoreResults
              message="No hay a PQRs asignados"
              subtitle="No se encontraron PQRs asignados."
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

export default Asignado;
