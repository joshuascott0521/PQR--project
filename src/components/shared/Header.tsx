import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline, IoIosNotifications } from "react-icons/io";
import Serch from "../../components/shared/Serch";
import UserDropdownMenu from "./UserDropDownMenu";

const Header = () => {
  const navigate = useNavigate();

  const handleNew = () => {
    navigate("/dashboard/nuevo-pqr");
  };

  return (
    <div className="h-[85px] flex items-center justify-between px-4 sm:px-8 border-b-2 bg-white w-full">
      {/* Buscador */}
      <div className="w-full max-w-[400px] mr-4">
        <Serch />
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="bg-green-500 px-4 sm:px-6 py-2 rounded-lg text-white text-sm sm:text-lg font-bold flex items-center gap-2"
          onClick={handleNew}
        >
          <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
          <span>PQR</span>
        </button>

        <div className="relative">
          <IoIosNotifications className="text-3xl text-gray-500" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        <UserDropdownMenu />
      </div>
    </div>
  );
};

export default Header;
