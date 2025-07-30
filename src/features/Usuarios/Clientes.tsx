import ClienteCard from "../../components/shared/ClienteCard";
import { useEffect, useRef, useState } from "react";
import type { Cliente } from "../../interfaces/pqrInterfaces";
import {
  ClientesServices,
  TipoClienteServices,
} from "../../services/pqrServices";
import { ChevronUp, Users } from "lucide-react";
import { CardSkeleton } from "../../components/shared/CardSkeleton";
import NoMoreResults from "../../components/shared/ObjetoNoDataList";

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sinResultados, setSinResultados] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const tipoClienteMap = useRef<Map<string, string>>(new Map());

  const fetchClientes = async (currentPage: number) => {
    if (!hasMore) return;
    setLoadingMore(true);

    try {
      const clientRes = await ClientesServices.getByPage(currentPage, pageSize);
      if (!clientRes.success || !clientRes.data || clientRes.data.length === 0) {
        if (currentPage === 1) setSinResultados(true);
        setHasMore(false);
        return;
      }

      // Enriquecer tipo cliente una sola vez
      if (tipoClienteMap.current.size === 0) {
        const tipoClienteRes = await TipoClienteServices.getall();
        if (tipoClienteRes.success) {
          tipoClienteRes.data.forEach((tipo: any) => {
            tipoClienteMap.current.set(tipo.id, tipo.nombre);
          });
        }
      }

      const enriched = clientRes.data.map((cliente: Cliente) => ({
        ...cliente,
        tipoName: tipoClienteMap.current.get(cliente.tipoClienteId) || "Sin tipo",
      }));

      setClientes((prev) => {
        const combined = [...prev, ...enriched];
        return Array.from(new Map(combined.map((item) => [item.id, item])).values());
      });

      if (clientRes.data.length < pageSize) setHasMore(false);
      setSinResultados(false);
    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setInitialLoading(true);
    setPage(1);
    setClientes([]);
    setHasMore(true);
    fetchClientes(1).then(() => setInitialLoading(false));
  }, []);

  useEffect(() => {
    if (page === 1 || !hasMore) return;
    fetchClientes(page);
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <Users size={30} />
        <div className="flex font-bold text-[33px]">
          <p>Clientes</p>
        </div>
      </div>
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
              message="No hay clientes"
              subtitle="No se encontraron clientes registrados en el sistema."
              showAnimation={true}
            />
          </div>
        )}
        {initialLoading
          ? Array.from({ length: 5 }).map((_, i) => (
            <CardSkeleton size="client" key={i} />
          ))
          : clientes.map((client) => (
            <ClienteCard key={client.id} cliente={client} />
          ))}

        {loadingMore &&
          Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton size="client" key={`loader-${i}`} />
          ))}

        {!hasMore && (
          <p className="text-center text-gray-400 mt-4">
            No hay más resultados
          </p>
        )}
      </div>
    </div>
  );
};

export default Clientes;
