import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline, IoIosNotifications } from "react-icons/io";
import { FaRegCircle, FaUser } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import Serch from "../../components/shared/Serch";

const nombre = "Usuario";
const tipoUsuId = "Administrador";

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
        <FaRegCircle className="text-red-500 text-lg ml-[-35px] mt-[-20px]" />

        <div className="flex items-center gap-2">
          <FaUser className="text-4xl" />
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold">{nombre}</span>
            <span className="text-xs text-gray-600">{tipoUsuId}</span>
          </div>
          <MdExpandMore className="text-[30px]" />
        </div>
      </div>
    </div>
  );
};

export default Header;
