import { useEffect, useState } from "react";
import { BsExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { NotificacionesService } from "../../services/pqrServices";
import { CardSkeleton } from "./CardSkeleton";

interface NotificationListProps {
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
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
  id: number;
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

const NotificationList = ({
  setUnreadCount,
  setShowNotifications,
}: NotificationListProps) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotificaciones = async (page = 1) => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const usuarioId = userData?.id;
    if (!usuarioId) return;

    const { success, data } = await NotificacionesService.getAlertas(
      usuarioId,
      page
    );
    if (!success || !data) {
      setHasMore(false);
      return;
    }

    const rawAlertas: RawNotificacion[] = data.alertas;
    const mapeadas: Notification[] = rawAlertas.map((n) => ({
      id: n.id,
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

    setNotifications((prev) => {
      const existingIds = new Set(prev.map((n) => n.id));
      const nuevos = mapeadas.filter((n) => !existingIds.has(n.id));
      return [...prev, ...nuevos];
    });

    if (mapeadas.length === 0) {
      setHasMore(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotificaciones(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const usuarioId = userData?.id;
      if (!usuarioId) return;

      const { data } = await NotificacionesService.getAlertas(usuarioId, 1, 1);
      setUnreadCount(data?.totalPendientes || 0);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleClickNotificacion = async (id: number) => {
    try {
      const detalle = await NotificacionesService.getAlertaDetalle(id);

      // ✅ Actualiza la notificación con datos del backend
      setNotifications((prev) =>
        prev.map((n) =>
          n.consecutivo === String(detalle.consecutivo)
            ? {
                ...n,
                leido: detalle.estado === "Leido",
              }
            : n
        )
      );

      // ✅ Redirige
      navigate(`/dashboard/PQR/detalle/${detalle.pqrId}`);
      setShowNotifications(false);
      // ✅ Actualiza contador global
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const usuarioId = userData?.id;

      if (usuarioId) {
        const { data } = await NotificacionesService.getAlertas(
          usuarioId,
          1,
          1
        );
        setUnreadCount(data?.totalPendientes || 0);
      }
    } catch (error) {
      console.error("Error al redirigir a detalle:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Alertas</h2>
      </div>
      <div className="max-h-[400px] overflow-y-auto divide-y">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} size="classic" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-400 py-4">
            No se encontraron alertas.
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleClickNotificacion(notification.id)}
              className={`cursor-pointer p-4 transition-colors flex items-start gap-4 ${
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
        {!isLoading && !hasMore && (
          <div className="p-4 text-center text-gray-400">
            No hay más alertas.
          </div>
        )}
        {!isLoading && hasMore && (
          <div className="p-4 text-center">
            <button
              disabled={isLoading}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className="text-blue-600 underline hover:text-blue-800 transition disabled:opacity-50"
            >
              Ver más alertas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
