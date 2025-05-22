import { IoIosAddCircleOutline, IoIosNotifications } from "react-icons/io";
import { FaRegCircle, FaUser } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

import Serch from "../../components/shared/Serch";
const nombre = "Usuario";
const tipoUsuId = "Administrador";

const Header = () => {
  {
    /* Header */
  }
  return (
    <>
      <div className="h-[100px] flex items-center pl-8">
        <div className="w-2/4 mr-[30px]">
          {/* <input
              type="text"
              placeholder="Buscar..."
              className="border border-gray-300 rounded px-4 py-2 w-full"
            /> */}
          <Serch />
        </div>

        <div className="flex-1 flex justify-end items-center gap-4 pr-8">
          <button className="bg-green-500 px-[30px] py-[15px] rounded-lg text-white flex items-center gap-2 mr-[35px] text-2xl font-bold">
            <IoIosAddCircleOutline className="text-2xl h-[35px] w-[35px]" />
            <span>PQR</span>
          </button>

          <button>
            <IoIosNotifications className="text-5xl text-gray-500" />
          </button>
          <FaRegCircle className="text-red-500 text-lg  ml-[-35px] mt-[-20px]" />

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
    </>
  );
};
export default Header;
