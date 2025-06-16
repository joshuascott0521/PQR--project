import { useEffect, useRef, useState } from "react";
import ClienteCardSkeleton from "../../components/shared/ClienteCardSkeleton";
import type { Pqr, Usuario } from "../../interfaces/pqrInterfaces";
import FuncionarioCard from "../../components/shared/FuncionarioCard";
import { useParams } from "react-router-dom";
import { PqrServices, UsersServices } from "../../services/pqrServices";
import ResumenItem from "../../components/shared/ResumeItem";
import UserCard from "../../components/shared/UserCard";

const colores = {
  "A TIEMPO": "bg-green-300",
  "POR VENCER": "bg-yellow-300",
  VENCIDO: "bg-red-400",
  FINALIZADOS: "bg-blue-300",
  ANULADO: "bg-gray-300",
  "EN ESPERA": "bg-orange-300",
};

const FuncionarioResumen = () => {
  const { id } = useParams();

  const [resumen, setResumen] = useState<Usuario>();
  const [, setError] = useState<string | null>(null);

  const [funcionario, setFuncionario] = useState<Usuario>();
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string | null>(
    null
  );
  const [pqrsFiltrados, setPqrsFiltrados] = useState<Pqr[]>([]);
  const [loadingPqrs, setLoadingPqrs] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [hasMorePqrs, setHasMorePqrs] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loadingPqrs);

  useEffect(() => {
    loadingRef.current = loadingPqrs;
  }, [loadingPqrs]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      if (isAtBottom && !loadingRef.current && hasMorePqrs) {
        setPaginaActual((prev) => prev + 1);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [hasMorePqrs]);

  useEffect(() => {
    if (!estadoSeleccionado || paginaActual === 1) return;
    cargarMasPqrs(estadoSeleccionado);
  }, [paginaActual]);

  const seleccionarEstado = (estado: string) => {
    setEstadoSeleccionado(estado);
    setPaginaActual(1);
    setHasMorePqrs(true);
    setPqrsFiltrados([]);
    cargarPqrsInicial(estado);
  };

  const cargarPqrsInicial = async (estado: string) => {
    if (!resumen?.id) return;

    setLoadingPqrs(true);
    try {
      const nuevos = await PqrServices.getByEstado({
        usuid: resumen.id,
        page: 1,
        size: 10,
        estadoVencimiento: estado,
      });

      if (nuevos.length < 10) setHasMorePqrs(false);
      setPqrsFiltrados(nuevos);
    } catch (err) {
      console.error("Error al obtener PQRs iniciales:", err);
    } finally {
      setLoadingPqrs(false);
    }
  };

  const cargarMasPqrs = async (estado: string) => {
    if (!resumen?.id) return;

    setLoadingPqrs(true);
    try {
      if (!funcionario) return;
      console.log(
        "🟢 Enviando usuid:",
        funcionario?.id,
        "estado:",
        estado,
        "página:",
        paginaActual
      );

      const nuevos = await PqrServices.getByEstado({
        usuid: funcionario.id,
        page: paginaActual,
        size: 10,
        estadoVencimiento: estado,
      });

      if (!nuevos || nuevos.length === 0 || nuevos.length < 10) {
        setHasMorePqrs(false);
      }

      setPqrsFiltrados((prev) => {
        const combinados = [...prev, ...nuevos];
        const unicos = Array.from(
          new Map(combinados.map((p) => [p.id, p])).values()
        );
        return unicos;
      });

      console.log("🔴🔴🔴", pqrsFiltrados);
    } catch (err) {
      console.error("Error al cargar más PQRs:", err);
    } finally {
      setLoadingPqrs(false);
    }
  };

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const funcionarioRes = await UsersServices.getById(id!);
        if (!funcionarioRes.success) throw new Error(funcionarioRes.error);

        const resumenRes = await UsersServices.getResume(id!);
        if (!resumenRes.success) throw new Error(resumenRes.error);
        console.log(resumenRes.data);
        setResumen(resumenRes.data);
        setFuncionario(funcionarioRes.data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener el cliente");
      }
    };

    fetchCliente();
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <div className="flex font-semibold text-[33px]">
          <p>Funcionario</p>
        </div>
      </div>

      <div>
        {funcionario ? (
          <FuncionarioCard mostrarEditar funcionario={funcionario} />
        ) : (
          <ClienteCardSkeleton />
        )}
      </div>

      <div className="flex gap-2 flex-wrap justify-evenly mt-3">
        {resumen?.pqrResumen &&
          Object.entries(resumen.pqrResumen).map(([estado, cantidad]) => (
            <ResumenItem
              key={estado}
              titulo={estado}
              cantidad={cantidad}
              bgColor={colores[estado as keyof typeof colores] || "bg-gray-300"}
              onClick={() => seleccionarEstado(estado)}
            />
          ))}
      </div>

      <div
        className="flex-1 flex-col overflow-y-auto mt-2 bg-gray-100 px-6 py-4 rounded-lg"
        ref={scrollRef}
      >
        {estadoSeleccionado && (
          <p className="text-gray-700 font-semibold mb-2">
            PQRs en estado:{" "}
            <span className="uppercase">{estadoSeleccionado}</span>
          </p>
        )}

        {loadingPqrs && pqrsFiltrados.length === 0 ? (
          <p className="text-gray-500 text-center">Cargando PQRs...</p>
        ) : pqrsFiltrados.length === 0 ? (
          <p className="text-gray-500 text-center">No hay resultados.</p>
        ) : (
          <div className="space-y-4">
            {pqrsFiltrados.map((pqr) => (
              <UserCard key={pqr.id} pqr={pqr} />
            ))}
          </div>
        )}

        {/* 👇 Mensajes al final del scroll */}
        {loadingPqrs && pqrsFiltrados.length > 0 && (
          <p className="text-center text-gray-500 mt-4">
            Cargando más Funcionarios...
          </p>
        )}

        {!loadingPqrs && !hasMorePqrs && pqrsFiltrados.length > 0 && (
          <p className="text-center text-gray-400 mt-4">
            No hay más resultados
          </p>
        )}
      </div>
    </div>
  );
};

export default FuncionarioResumen;
