import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import Serch from "../../components/shared/Serch";
import UserDropdownMenu from "./UserDropDownMenu";
import NotificationList from "./NotificationList";
import { Menu } from "lucide-react";
import { NotificacionesService } from "../../services/pqrServices";
import { CSSTransition } from "react-transition-group";

interface HeaderProps {
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsCollapse }: HeaderProps) => {
  const nodeRef = useRef(null);

  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const handleNew = () => {
    navigate("/dashboard/nuevo-pqr");
  };

  const fetchUnreadCount = async () => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const usuarioId = userData?.id;
    if (!usuarioId) return;

    const total = await NotificacionesService.getTotalPendientes(usuarioId);
    setUnreadCount(total);
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="h-[85px] flex items-center justify-between px-4 sm:px-6 border-b-2 bg-white w-full transition-all duration-300">
      <div
        className="pr-6 cursor-pointer active:scale-90"
        onClick={() => setIsCollapse((prev) => !prev)}
        title="Contraer/Expandir"
      >
        <Menu className="text-gray-500" />
      </div>

      <div className="pr-3 transition-transform hover:scale-95">
        <img
          src="/public/Logo-static.png"
          alt="Logo"
          className="w-[320px]"
          loading="lazy"
        />
      </div>

      <div className="flex-1 mr-4">
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
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <CSSTransition
            in={showNotifications}
            timeout={300}
            classNames="fade"
            unmountOnExit
            nodeRef={nodeRef}
          >
            <div
              ref={nodeRef}
              className="absolute right-0 mt-2 w-[600px] z-50 transform bg-white rounded-lg shadow-lg"
            >
              <NotificationList
                setUnreadCount={setUnreadCount}
                setShowNotifications={setShowNotifications}
              />
            </div>
          </CSSTransition>
        </div>

        <UserDropdownMenu />
      </div>
    </div>
  );
};

export default Header;
