import { useParams } from "react-router-dom";
import ClienteCard from "../../components/shared/ClienteCard";
import type { Cliente, Pqr } from "../../interfaces/pqrInterfaces";
import { useEffect, useRef, useState } from "react";
import { ClientesServices, PqrServices, TipoClienteServices } from "../../services/pqrServices";
import ClienteCardSkeleton from "../../components/shared/ClienteCardSkeleton";

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
                    tiponame: tipo?.nombre || "Sin tipo",
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
            setLoading(true);
            try {
                

                const data = await PqrServices.getByDocumento({
                    usuid,
                    page: currentPage,
                    size: 10,
                    estadoVencimiento: "Por vencer",
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
                <p>PQR Asociados (3)</p>
            </div>

            <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg ">
                {/* Aquí irán los UserCard */}
            </div>
        </div>
    );
};

export default ClienteDetalle;
