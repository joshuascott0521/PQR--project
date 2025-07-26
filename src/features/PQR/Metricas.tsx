import { useEffect, useState } from "react";
import AsignadosCard from "../../components/shared/AsignadosCard";
//import DonutGraphic from "../../components/shared/DonutGraphic";
//import Grafico from "../../components/shared/LinearGraphic";
//import PolarGraphic from "../../components/shared/PolarGraphic";
import { PqrServices } from "../../services/pqrServices";
import type { EstadoFlujoData } from "../../interfaces/pqrInterfaces";
import { getColorClass } from "../../utils/getColors";
import SkeletonCard from "../../components/shared/SkeletonCard";
import ModalOtp from "../../components/shared/ModalOtp";
import { showToast } from "../../utils/toastUtils";

const Metricas = () => {
  const [metricas, setMetricas] = useState<EstadoFlujoData[]>([]);
  const [loading, setLoading] = useState(true);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSign = (code: number) => {
    // Aquí puedes agregar la lógica para verificar el código
    const validation = async () => {
      try {
        const response = await PqrServices.validateOtp(usuid, code);
        if (!response.success) throw new Error(response.error);
        showToast(response.data.mensaje, "success");
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error al validar otp:", err);
      }
    }
    validation();
  };

  const userData = localStorage.getItem("userData");
  if (!userData) {
    console.error("Usuario no encontrado");
    return;
  }
  const user = JSON.parse(userData);
  const usuid = user?.id;
  if (!usuid) {
    console.error("ID de usuario inválido");
    return;
  }

  useEffect(() => {
    const fetchStatistic = async () => {
      try {
        const responseStatistic = await PqrServices.getPqrStatistics(usuid);
        if (!responseStatistic.success)
          throw new Error(responseStatistic.error);

        setMetricas(responseStatistic.data);
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistic();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-x-5">
        <div className="font-bold  text-3xl">
          <p>Inicio</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center 2xl:gap-6 xl:gap-4 ">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : metricas.map((item, index) => (
            <AsignadosCard
              key={index}
              titulo={item.estadoFlujo}
              total={item.total}
              estados={item.detallesVencimiento.map((detalle) => ({
                valor: detalle.cantidad,
                colorClass: getColorClass(detalle.estadoVencimiento),
              }))}
              fondo={item.estadoFlujo.toLowerCase()}
            />
          ))}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-2 py-3 w-16 rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-lg"
      >
        Firmar
      </button>

      <ModalOtp
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSign={handleSign}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-3">

        {/*
        <div className="bg-white rounded-xl shadow-md p-4 flex justify-center items-center min-h-[300px]">
          <Grafico />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex justify-center items-center min-h-[300px]">
          <DonutGraphic />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex justify-center items-center min-h-[300px] max-h-[450px]  mb-2">
                    <PolarGraphic />
        </div>
        */}
      </div>

    </div>
  );
};

export default Metricas;
