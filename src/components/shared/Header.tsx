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
    <div className="h-[85px] flex items-center pl-8 border-b-2 bg-white">
      <div className="w-2/4 mr-[30px]">
        <Serch />
      </div>

      <div className="flex-1 flex justify-end items-center gap-4 pr-8">
        <button
          className="bg-green-500 px-[30px] py-[10px] rounded-lg text-white flex items-center gap-2 mr-[35px] text-2xl font-bold"
          onClick={handleNew}
        >
          <IoIosAddCircleOutline className="text-2xl h-[35px] w-[35px]" />
          <span>PQR</span>
        </button>

        <button>
          <IoIosNotifications className="text-5xl text-gray-500" />
        </button>
        
        {/* Aquí se reemplaza el bloque estático por el dropdown */}
        <UserDropdownMenu />
      </div>
    </div>
  );
};

export default Header;
