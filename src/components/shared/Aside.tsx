import { NavLink } from "react-router-dom";

import { FaCircle } from "react-icons/fa";
import { House, Eye, Clock, ClipboardCheck, FileCheck, FileX, Clipboard, ShieldUser, Users, SlidersHorizontal } from "lucide-react"

interface AsideProps {
  isCollapse: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  { label: "inicio", path: "/dashboard", icon: <House /> },
  {
    label: "Vencidos",
    path: "/dashboard/vencidos",
    icon: <FaCircle className="text-red-600" />,
  },
  {
    label: "Por vencer",
    path: "/dashboard/por-vencer",
    icon: <FaCircle className="text-amarillo-gg" />,
  },
  {
    label: "A tiempo",
    path: "/dashboard/a-tiempo",
    icon: <FaCircle className="text-green-500" />,
  },
  { label: "Registrados", path: "registrados", icon: <Clipboard /> },
  { label: "Asignados", path: "asignados", icon: <ClipboardCheck /> },
  {
    label: "En proceso",
    path: "en-proceso",
    icon: <Eye />,
  },
  { label: "En espera", path: "en-espera", icon: <Clock /> },
  { label: "Finalizado", path: "finalizado", icon: <FileCheck /> },
  { label: "Anulados", path: "anulado", icon: <FileX /> },
  //Rutas de administracion
  {
    label: "Funcionarios",
    path: "admin/funcionarios",
    icon: <ShieldUser />,
  },
  { label: "Clientes", path: "admin/cliente", icon: <Users /> },
  { label: "Parámetros", path: "admin/parametros", icon: <SlidersHorizontal /> },
];

const Aside = ({ isCollapse, setIsCollapse }: AsideProps) => {

  return (
    <aside className={`h-screen border-r-2 border-gray-200 flex flex-col transition-all duration-300
        ${isCollapse ? "w-20" : "w-80"}
    `}>
      {/* Logo */}
      <div className="flex justify-center py-2">
        <div
          className="p-[4px] cursor-pointer transition-transform hover:scale-95"
          onClick={() => setIsCollapse(!isCollapse)}
        >
          {/* Logo expandido */}
          <img
            src="/public/Logo-static.png"
            alt="Logo"
            className={`h-16 object-contain bg-a-baranoa px-[4px] transition-all duration-300
                        ${isCollapse ? "hidden" : "block"}
            `}
            loading="lazy"
          />

          {/* Logo colapsado */}
          <img
            src="/public/PqrLogo.png"
            alt="Logo"
            className={`h-16 object-contain  transition-all duration-300
                        ${isCollapse ? "block" : "hidden"}
          `}
            loading="lazy"
          />
        </div>

      </div>


      {/* Menú */}
      <ul className="flex-1 flex flex-col px-2">
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
                `}
              >
                {item.icon}
              </div>
              {/* Ocultar texto si colapsado */}
              <span
  className={`capitalize whitespace-nowrap transition-all duration-300 overflow-hidden ml-0
    ${isCollapse ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"}
  `}
>
  {item.label}
</span>



            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
