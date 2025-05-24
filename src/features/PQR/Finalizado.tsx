import { useEffect, useState } from "react";
// import UserCard from "../../components/shared/UserCard";
import { getPqrByEstado } from "../../services/pqrServices"; // Ajusta la ruta según corresponda
import type { Pqr } from "../../interfaces/pqrInterfaces";
import UserCard from "../../components/shared/UserCard";
// import { AiOutlineFolderView } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";

const Finalizado = () => {
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPqrs = async () => {
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

        const data = await getPqrByEstado({
          usuid,
          page: 1,
          size: 10,
          estadoProceso: "Finalizado",
        });
        setPqrs(data);
        // console.log("💗💗💗💗", pqrs);
      } catch (err) {
        setError("Error al cargar los PQRs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPqrs();
  }, []);
  console.log("💗💗💗💗", pqrs);
  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <CiCircleCheck className="text-[32px]" />
        <div className="flex font-bold text-[33px]">
          <p>PQRS finalizados</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-100 px-6 py-4 rounded-lg">
        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && pqrs.length === 0 && (
          <p>No hay PQRs Finalizados.</p>
        )}

        <div className="space-y-4">
          {/* Aquí mapeamos los datos reales */}
          {pqrs.map((pqr) => (
            <UserCard key={pqr.id} pqr={pqr} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finalizado;
