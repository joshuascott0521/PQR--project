import { NavLink } from "react-router-dom";

import { FaCircle } from "react-icons/fa";
import { House, Eye, ClipboardCheck, FileCheck, FileX, Clipboard, ShieldUser, Users, SlidersHorizontal, ClipboardList } from "lucide-react"
import type { AsideProps } from "../../interfaces/pqrInterfaces";


const menuItems = [
  { label: "inicio", path: "/dashboard/statistic", icon: <House /> },
  { label: "PQRs", path: "/dashboard/all-pqr", icon: <ClipboardList /> },
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
  { 
    label: "En espera", 
    path: "en-espera", 
    icon: <FaCircle className="text-sky-400" />
  },
  { label: "Registrados", path: "registrados", icon: <Clipboard /> },
  { label: "Asignados", path: "asignados", icon: <ClipboardCheck /> },
  {
    label: "En proceso",
    path: "en-proceso",
    icon: <Eye />,
  },
  
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

const Aside = ({ isCollapse, }: AsideProps) => {

  return (
    <aside className={`h-screen border-r-2 border-gray-200 flex flex-col transition-all duration-300
        ${isCollapse ? "w-20" : "w-80"}
    `}>
      {/* Menú */}
      <ul className="flex flex-col px-2 pt-1 gap-1.5">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex-1 flex items-center gap-3 w-full text-xl
              ${index === 2 || index === 6 || index === 11 || index === 13 ? "border-t-2 py-0.5" : ""}
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
              <div className="flex justify-center items-center w-8">
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
