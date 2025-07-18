import { ClipboardList } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Pqr, PqrCount } from "../../interfaces/pqrInterfaces";
import { PqrServices } from "../../services/pqrServices";
import UserCard from "../../components/shared/UserCard";
import { CardSkeleton } from "../../components/shared/CardSkeleton";
import NoMoreResults from "../../components/shared/ObjetoNoDataList";

const AllPqr = () => {
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [, setConteo] = useState<PqrCount>({ estado: "", cantidad: 0 });
  const [initialLoading, setInitialLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loading);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

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
      setLoading(true);
      try {
        const userData = localStorage.getItem("userData");
        if (!userData) {
          setError("Usuario no encontrado");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        const usuid = user?.id;
        if (!usuid) {
          setError("ID de usuario inválido");
          setLoading(false);
          return;
        }

        const data = await PqrServices.getByEstado({
          usuid,
          page: currentPage,
          size: 10,
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
        // setError("Error al cargar los PQRs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPqrs();
  }, [currentPage]);

  useEffect(() => {
    setInitialLoading(true);
    setLoading(true);

    const cargar = async () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setError("Usuario no encontrado");
        setInitialLoading(false);

        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);
      const usuid = user?.id;
      const res = await PqrServices.getPqrCountEstadoFlujo("ANULADO", usuid);
      if (res.success) setConteo(res.data);
      setInitialLoading(false);
    };

    cargar();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <ClipboardList size={30} />
        <div className="flex font-bold text-[33px]">
          {<p>Todos los PQRs</p>}
          {/*<p>PQRS anulados{"(" + (conteo.cantidad ?? 0) + ")"}.</p>*/}
        </div>
      </div>

      <div
        className="flex-1 overflow-auto bg-gray-100 px-6 py-4 rounded-lg"
        ref={scrollRef}
      >
        {error && <p className="text-red-600">{error}</p>}
        {/* {!loading && !error && pqrs.length === 0 && (
          <p>No hay PQRs vencidos.</p>
        )} */}
        {!loading && !error && pqrs.length === 0 && (
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
        {loading && (
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
