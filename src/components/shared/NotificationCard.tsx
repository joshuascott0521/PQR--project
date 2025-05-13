import type { FC } from "react";
import { IoIosNotifications } from "react-icons/io";

interface NotificaTionCardProps {
  consecutivo: string;
  cliente: string;
  asunto: string;
  alerta: string;
  tipo: string;
}
const NotificationCard: FC<NotificaTionCardProps> = ({
  consecutivo,
  cliente,
  asunto,
  alerta,
  tipo,
}) => {
  return (
    <div className="w-full border-y-2 flex h-20 ">
      <div className="flex items-center">
        <IoIosNotifications size={40} color="gold" />
      </div>
      <div className="flex flex-col justify-center  w-2/3">
        <p>
          <span className="font-bold text-gray-500">Consecutivo: </span>
          <span className="value-style">{consecutivo}</span>
        </p>
        <p>
          <span className="font-bold text-gray-500">Cliente: </span>
          <span className="value-style">{cliente}</span>
        </p>
        <p>
          <span className="font-bold text-gray-500">Asunto: </span>
          <span className="value-style">{asunto}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center  w-2/5">
        <p>
          <span className="font-bold text-gray-500">Alerta: </span>
          <span className="value-style">{alerta}</span>
        </p>
        <p>
          <span className="font-bold text-gray-500">Tipo: </span>
          <span className="value-style">{tipo}</span>
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
