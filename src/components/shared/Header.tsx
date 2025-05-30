import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import Serch from "../../components/shared/Serch";
import UserDropdownMenu from "./UserDropDownMenu";
import NotificationList from "./NotificationList";

const Header = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null); // Ref para notificaciones

  const handleNew = () => {
    navigate("/dashboard/nuevo-pqr");
  };

  // Detectar clic fuera de las notificaciones
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <div className="h-[85px] flex items-center justify-between px-4 sm:px-8 border-b-2 bg-white w-full">
      <div className="w-full mr-4">
        <Serch />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="bg-green-500 px-4 sm:px-6 py-2 rounded-lg text-white text-sm sm:text-lg font-bold flex items-center gap-2"
          onClick={handleNew}
        >
          <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
          <span>PQR</span>
        </button>

        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative hover:opacity-80 transition-opacity"
          >
            <IoNotificationsSharp className="text-3xl text-gray-500" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[600px] z-50 transform">
              <NotificationList />
            </div>
          )}
        </div>

        <UserDropdownMenu />
      </div>
    </div>
  );
};

export default Header;
