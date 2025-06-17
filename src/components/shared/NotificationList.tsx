import { useEffect, useState } from "react";
import { BsExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { NotificacionesService } from "../../services/pqrServices";
import { CardSkeleton } from "./CardSkeleton";

interface NotificationListProps {
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

interface RawNotificacion {
  id: number;
  consecutivo: number;
  nombre: string;
  asunto: string;
  mensaje: string;
  tipoPQR: string;
  fechaCreacion: string;
  tipoAlerta: string;
  estado: string;
}

interface Notification {
  consecutivo: string;
  cliente: string;
  asunto: string;
  alerta: string;
  tipo: string;
  fecha: string;
  leido: boolean;
  estado: "warning" | "new" | "success" | "alert";
}

const getIconByState = (state: Notification["estado"]) => {
  switch (state) {
    case "warning":
      return <IoWarning className="text-yellow-500 text-2xl" />;
    case "new":
      return <AiOutlinePlusCircle className="text-blue-500 text-2xl" />;
    case "success":
      return <BsCheckCircleFill className="text-green-500 text-2xl" />;
    case "alert":
      return <BsExclamationCircleFill className="text-red-500 text-2xl" />;
    default:
      return null;
  }
};

const NotificationList = ({ setUnreadCount }: NotificationListProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotificaciones = async () => {
    setIsLoading(true);
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const usuarioId = userData?.id;

    if (!usuarioId) return;

    const { success, data } = await NotificacionesService.getAlertas(usuarioId);
    if (!success || !data) return;

    const rawAlertas: RawNotificacion[] = data.alertas;
    const mapeadas: Notification[] = rawAlertas.map((n) => ({
      consecutivo: String(n.consecutivo),
      cliente: n.nombre,
      asunto: n.asunto,
      alerta: n.mensaje,
      tipo: n.tipoPQR,
      fecha: new Date(n.fechaCreacion).toLocaleDateString("es-CO"),
      leido: n.estado === "Leido",
      estado:
        n.tipoAlerta === "Nuevo"
          ? "new"
          : n.tipoAlerta === "Alerta"
          ? "alert"
          : "success",
    }));

    setNotifications(mapeadas);
    setUnreadCount(data.totalPendientes || 0);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  // const skeletons = Array.from({ length: 4 }).map((_, i) => (
  //   <div key={i} className="p-4 flex gap-4 animate-pulse border-b">
  //     <div className="w-8 h-8 bg-gray-300 rounded-full" />
  //     <div className="flex-1 space-y-2">
  //       <div className="w-1/2 h-3 bg-gray-300 rounded" />
  //       <div className="w-1/3 h-3 bg-gray-300 rounded" />
  //       <div className="w-full h-3 bg-gray-200 rounded" />
  //     </div>
  //   </div>
  // ));

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Alertas</h2>
      </div>
      <div className="divide-y">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} size="medium" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-400 py-4">
            No se encontraron alertas.
          </p>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              className={`p-4 transition-colors flex items-start gap-4 ${
                notification.leido ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-50`}
            >
              <div className="flex-shrink-0">
                {getIconByState(notification.estado)}
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">Consecutivo:</span>{" "}
                      {notification.consecutivo}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Cliente:</span>{" "}
                      {notification.cliente}
                    </p>
                    <p className="text-sm truncate">
                      <span className="font-semibold">Asunto:</span>{" "}
                      {notification.asunto}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm truncate">
                      <span className="font-semibold">Alerta:</span>{" "}
                      <span
                        className={
                          notification.estado === "alert" ? "text-red-500" : ""
                        }
                      >
                        {notification.alerta}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Tipo:</span>{" "}
                      {notification.tipo}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Fecha:</span>{" "}
                      {notification.fecha}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationList;
