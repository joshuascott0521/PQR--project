import { useEffect, useState } from "react";
import AsignadosCard from "../../components/shared/AsignadosCard";
import { PqrServices } from "../../services/pqrServices";
import type { EstadoFlujoData } from "../../interfaces/pqrInterfaces";
import { getColorClass } from "../../utils/getColors";
import SkeletonCard from "../../components/shared/SkeletonCard";
import ModalOtp from "../../components/shared/ModalOtp";
import { showToast } from "../../utils/toastUtils";
import { ModalSelectFirma } from "../../components/shared/ModalSelectFirma";
import { ModalSellado } from "../../components/shared/ModalSellado";
import { Stamp } from "lucide-react";



const Metricas = () => {
  const [metricas, setMetricas] = useState<EstadoFlujoData[]>([]);
  const [loading, setLoading] = useState(true);

  {/* Hook de control para el modal de OTP */ }
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  {/* Hook de control para el modal de seleccion de firmantes */ }
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  {/* Hook de control para el modal de confirmación de sellado */ }
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  {/*
    Hook de control para el manejo de errores en el OTP.
    Nota: este hook se envia por props al componente
  */ }
  const [otpError, setOtpError] = useState<string | null>(null);

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

  {/*
    En esta funcion se obtiene el otp que se ingresa en el modal,
    una vez se tiene se envia junto con el id del usuario en
    sesión para verificar la validez del codigo. Si es valido el
    modal se cierra y se muestra un toast de exito. En esta
    funcion en la validacion de exito de la peticion se
    ubicaria el consumo (si lo hay) para que se posicione la
    firma en el html.

    IMPORTANTE: esta funcion debe ser ubicada en el archivo donde
    se va a llamar el modal ya que se envia como props al 
    componente.
  */}
  const handleSign = (code: number) => {
    const validation = async () => {
      try {
        const response = await PqrServices.validateOtp(usuid, code);
        if (!response.success) throw new Error(response.error);
        showToast(response.data.mensaje, "success");
        setOtpError(null);
        setIsOtpModalOpen(false);
      } catch (err) {
        console.error("Error al validar otp:", err);
        setOtpError("El código ingresado es incorrecto.");
      }
    };
    validation();
  };

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
        <div className="font-bold text-3xl">
          <p>Inicio</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center 2xl:gap-6 xl:gap-4">
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

      {/* Botones individuales */}
      <div className="flex gap-4 justify-center mt-8">
        {/* Boton de firmado, al seleccionar el boton, se abre el modal y hace la solicitud de generacion de otp */}
        <button
          onClick={() => setIsOtpModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Firmar
        </button>
        <button
          onClick={() => setIsSelectModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Solicitar firma
        </button>
        <button
          onClick={() => setIsConfirmModalOpen(true)}
          className="bg-green-500 text-white font-semibold px-4 flex items-center gap-2 py-2 rounded-lg text-sm hover:bg-green-600 transition"
        >
          <Stamp />
          Sellar y finalizar
        </button>
      </div>

      {/* Modales individuales */}
      <ModalSelectFirma
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onViewChange={() => { }}
      />

      <ModalSellado
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onBack={() => { }}
        onConfirm={() => {
          showToast("Documento sellado exitosamente", "success")
          setIsConfirmModalOpen(false);
        }}
      />

      <ModalOtp
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onSign={handleSign}
        otpError={otpError}
        setOtpError={setOtpError}
      />
    </div>
  );
};

export default Metricas;
