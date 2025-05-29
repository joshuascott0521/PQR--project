import { BsExclamationCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";

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
  const notifications: Notification[] = [
    {
      consecutivo: "20240011",
      cliente: "Andreina Arteta Car...",
      asunto: "Solicitud de devoluc...",
      alerta: "Tiene 4 días vencido",
      tipo: "Petición",
      fecha: "20/05/2025",
      estado: "alert",
    },
    {
      consecutivo: "20240011",
      cliente: "Andreina Arteta Car...",
      asunto: "Solicitud de devolució...",
      alerta: "Tienes un nuevo PQRS",
      tipo: "Petición",
      fecha: "18/04/2025",
      estado: "new",
    },
    {
      consecutivo: "20240011",
      cliente: "Andreina Arteta Car...",
      asunto: "Solicitud de devolució...",
      alerta: "Respuesta lista",
      tipo: "Petición",
      fecha: "20/05/2025",
      estado: "success",
    },
    {
      consecutivo: "20240011",
      cliente: "Andreina Arteta Car...",
      asunto: "Solicitud de devoluc...",
      alerta: "Te quedan 5 días",
      tipo: "Petición",
      fecha: "20/05/2025",
      estado: "warning",
    },
  ];

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
