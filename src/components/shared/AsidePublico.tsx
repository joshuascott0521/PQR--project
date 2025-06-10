import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { House, Eye, Clock, ClipboardCheck, FileCheck, FileX, Clipboard } from "lucide-react"


const menuItems = [
  { label: "inicio", path: "inicio", icon: <House /> },
  { label: "Vencidos", path: "vencidos", icon: <FaCircle className="text-red-600" /> },
  { label: "Por vencer", path: "por-vencer", icon: <FaCircle className="text-orange-400" /> },
  { label: "A tiempo", path: "a-tiempo", icon: <FaCircle className="text-green-500" /> },
  { label: "Registrados", path: "registrados", icon: <Clipboard /> },
  { label: "Asignados", path: "asignados", icon: <ClipboardCheck /> },
  { label: "En proceso", path: "en-proceso", icon: <Eye /> },
  { label: "En espera", path: "en-espera", icon: <Clock /> },
  { label: "Finalizado", path: "finalizado", icon: <FileCheck /> },
  { label: "Anulados", path: "anulado", icon: <FileX /> },
];


const AsidePublico = () => {
  return (
    <aside className="w-[250px] h-[990px]  border-r-2 border-gray-200 ">
      <div className="flex justify-center ">
        <div className="w-8 mt-5 ml-2"></div>
        <div className="mt-5">
          <div>
            <img src="/public/Logo-static.png" alt="Logo" className='bg-a-baranoa' />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[772px]">
        <ul className="flex-1 flex flex-col px-5">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex-1 flex items-center gap-3 w-full text-xl
        ${index === 4 || index === 9 || index === 11 ? "border-t-2" : ""}
        ${index === 0 ? "border-t-2 border-b-2 py-[5px] -m-1" : ""}
      `}
            >
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-2 py-1 rounded-md transition-all
           ${isActive ? "bg-green-100 text-green-700 font-bold" : "text-gray-500"}
           hover:text-green-700`
                }
              >
                <div
                  className={`flex justify-center items-center w-8
            ${item.label === "inicio" ? "pl-[10px] mr-[4px]" : ""}
            ${item.label === "Vencidos" || item.label === "Por vencer" || item.label === "A tiempo" ? "" : ""}
          `}
                >
                  {item.icon}
                </div>
                <span className="capitalize">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AsidePublico;