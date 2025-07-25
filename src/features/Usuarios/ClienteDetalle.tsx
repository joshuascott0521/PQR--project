import { useParams } from "react-router-dom";
import ClienteCard from "../../components/shared/ClienteCard";
import type { Cliente, Pqr } from "../../interfaces/pqrInterfaces";
import { useEffect, useRef, useState } from "react";
import {
  ClientesServices,
  PqrServices,
  TipoClienteServices,
} from "../../services/pqrServices";
import ClienteCardSkeleton from "../../components/shared/ClienteCardSkeleton";
import UserCard from "../../components/shared/UserCard";

const ClienteDetalle = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente | undefined>(undefined);

  const [error, setError] = useState<string | null>(null);
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [loading, setLoading] = useState(false);
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
    const fetchCliente = async () => {
      try {
        const clienteRes = await ClientesServices.getById(id!);
        if (!clienteRes.success) throw new Error(clienteRes.error);

        const tipoClienteRes = await TipoClienteServices.getall();
        if (!tipoClienteRes.success) throw new Error(tipoClienteRes.error);

        const tipo = tipoClienteRes.data.find(
          (t: any) => t.id === clienteRes.data.tipoClienteId
        );

        const clienteEnriquecido = {
          ...clienteRes.data,
          tipoName: tipo?.nombre || "Sin tipo",
        };

        setCliente(clienteEnriquecido);
      } catch (err) {
        console.error(err);
        setError("Error al obtener el cliente");
      }
    };

    fetchCliente();
  }, [id]);

  useEffect(() => {
    const fetchPqrs = async () => {
      // No ejecutar si aún no se ha cargado el cliente
      if (!cliente?.documento || !hasMore) return;

      setLoading(true);
      try {
        const response = await PqrServices.getByFilter({
          value: cliente.documento,
          page: currentPage,
          size: 10,
        });

        if (!response.success) throw new Error(response.error);

        const data = response.data;

        if (Array.isArray(data) && data.length < 10) {
          setHasMore(false);
        }

        setPqrs((prev) => {
          const combined = [...prev, ...data];
          const unique = Array.from(
            new Map(combined.map((item) => [item.id, item])).values()
          );
          return unique;
        });
      } catch (err) {
        console.error("Error al cargar PQRs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPqrs();
  }, [currentPage, cliente?.documento]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <div className="flex font-semibold text-[33px]">
          <p>Cliente</p>
        </div>
      </div>

      <div className="">
        {cliente ? (
          <ClienteCard mostrarEditar cliente={cliente} />
        ) : (
          <ClienteCardSkeleton />
        )}
      </div>

      <div className="mt-1 font-bold text-lg">
        <p>PQR Asociados: {pqrs[0]?.totalPQRCliente ?? 0}</p>
      </div>

      <div
        className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg"
        ref={scrollRef}
      >
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && pqrs.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay PQRs por vencer.
          </p>
        )}

        <div className="space-y-4">
          {pqrs.map((pqr) => (
            <UserCard key={pqr.id} pqr={pqr} />
          ))}
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-4">
            Cargando más Clientes...
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

export default ClienteDetalle;
