import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { FaBan } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { TbSettingsPlus } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineFolderView } from "react-icons/ai";

const menuItems = [
  { label: "inicio", path: "/dashboard", icon: <IoHomeOutline /> },
  {
    label: "Vencidos",
    path: "/dashboard/vencidos",
    icon: <FaCircle className="text-red-600" />,
  },
  {
    label: "Por vencer",
    path: "/dashboard/por-vencer",
    icon: <FaCircle className="text-orange-400" />,
  },
  {
    label: "A tiempo",
    path: "/dashboard/a-tiempo",
    icon: <FaCircle className="text-amarillo-gg" />,
  },
  { label: "Registrados", path: "registrados", icon: <FiUserCheck /> },
  { label: "Asignados", path: "asignados", icon: <AiOutlineFolderView /> },
  {
    label: "En proceso",
    path: "en-proceso",
    icon: <MdOutlineDriveFolderUpload />,
  },
  { label: "En espera", path: "en-espera", icon: <CgSandClock /> },
  { label: "Finalizado", path: "finalizado", icon: <CiCircleCheck /> },
  { label: "Anulados", path: "anulado", icon: <FaBan /> },
  //Rutas de administracion
  {
    label: "Funcionarios",
    path: "admin/funcionarios",
    icon: <BsFillPeopleFill />,
  },
  { label: "Clientes", path: "admin/cliente", icon: <FaUserCircle /> },
  { label: "Parámetros", path: "admin/parametros", icon: <TbSettingsPlus /> },
];

const Aside = () => {
  return (
    <aside className=" h-screen border-r-2 border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex justify-center py-5">
        <div className="p-[4px]">
          <img
            src="/public/Logo-static.png"
            alt="Logo"
            className="bg-a-baranoa px-[8px]"
          />
        </div>
      </div>

      {/* Menú */}
      <ul className="flex-1 flex flex-col px-5">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex-1 flex items-center gap-3 w-full text-xl
              ${index === 4 || index === 9 || index === 11 ? "border-t-2" : ""}
              ${index === 0 ? "border-t-2 border-b-2 py-[5px] -m-1" : ""}
        
            `}
          >
            <div
              className={`flex justify-center items-center w-8
                ${item.label === "inicio" ? "pl-[10px] mr-[4px]" : ""}
              `}
            >
              {item.icon}
            </div>
            <Link
              to={item.path}
              className="text-gray-500 font-semibold flex items-center gap-2"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
