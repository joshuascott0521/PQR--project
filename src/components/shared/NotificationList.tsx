import { useEffect, useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import { NotificacionesService } from "../../services/pqrServices";

interface Notification {
  consecutivo: string;
  cliente: string;
  asunto: string;
  alerta: string;
  tipo: string;
  fecha: string;
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

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotificaciones = async () => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const usuarioId = userData?.id;

    if (!usuarioId) {
      console.warn("No se encontró el usuarioId");
      return;
    }

    const { success, data, error } = await NotificacionesService.getAlertas(
      usuarioId
    );

    if (!success) {
      console.error("Error al cargar notificaciones:", error);
      return;
    }

    const mapeadas: Notification[] = data.map((n) => ({
      consecutivo: String(n.consecutivo),
      cliente: n.nombre,
      asunto: n.asunto,
      alerta: n.mensaje,
      tipo: n.tipoPQR,
      fecha: new Date(n.fechaCreacion).toLocaleDateString("es-CO"),
      estado:
        n.tipoAlerta === "Nuevo"
          ? "new"
          : n.tipoAlerta === "Alerta"
          ? "alert"
          : "success",
    }));

    setNotifications(mapeadas);
  };

  useEffect(() => {
    fetchNotificaciones(); // inicial
    const interval = setInterval(fetchNotificaciones, 30000); // cada 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Alertas</h2>
      </div>
      <div className="divide-y">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4"
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
                  <p className="text-sm">
                    <span className="font-semibold">Asunto:</span>{" "}
                    {notification.asunto}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
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
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
