import { useEffect, useRef, useState } from "react";
// import UserCard from "../../components/shared/UserCard";
import type { Pqr } from "../../interfaces/pqrInterfaces";
import UserCard from "../../components/shared/UserCard";
// import { AiOutlineFolderView } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { PqrServices } from "../../services/pqrServices";

const Finalizado = () => {
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
          estadoProceso: "Finalizado",
        });

        if (data.length < 10) {
          setHasMore(false);
        }

        // Eliminar duplicados usando el id
        setPqrs((prev) => {
          const combined = [...prev, ...data];
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
  console.log("💗💗💗💗", pqrs);

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <CiCircleCheck className="text-[32px]" />
        <div className="flex font-bold text-[33px]">
          <p>PQRS finalizados</p>
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
          <p className="text-center text-gray-500 mt-4">
            No hay PQRs finalizados.
          </p>
        )}

        <div className="space-y-4">
          {pqrs.map((pqr) => (
            <UserCard key={pqr.id} pqr={pqr} />
          ))}
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-4">
            Cargando más datos...
          </p>
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

export default Finalizado;
