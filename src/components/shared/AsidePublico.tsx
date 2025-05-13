import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { FaBan } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineFolderView } from "react-icons/ai";



const menuItems = [
  { label: "inicio", path: "inicio", icon: <IoHomeOutline /> },
  { label: "Vencidos", path: "vencidos", icon: <FaCircle className="text-red-600" /> },
  { label: "Por vencer", path: "por-vencer", icon: <FaCircle className="text-orange-400" /> },
  { label: "A tiempo", path: "a-tiempo", icon: <FaCircle className="text-green-500" /> },
  { label: "Registrados", path: "registrados", icon: <FiUserCheck /> },
  { label: "Asignados", path: "asignados", icon: <AiOutlineFolderView  /> },
  { label: "En proceso", path: "en-proceso", icon: <MdOutlineDriveFolderUpload /> },
  { label: "En espera", path: "en-espera", icon: <CgSandClock /> },
  { label: "Finalizado", path: "finalizado", icon: <CiCircleCheck /> },
  { label: "Anulados", path: "anulado", icon: <FaBan /> },
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
        <ul className="flex flex-col justify-start items-start mt-10 w-full px-5">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`w-full flex items-center mb-9 py-2 
                ${index === 0 ? 'border-t-2 border-b-2 py-4 -m-1' : ''}
                ${index === 4 || index === 9 || index === 11 ? 'border-t-2' : ''}
              `}
            >
              {item.icon && (
                <div className="flex justify-center items-center mr-4 w-8">
                  {item.icon}
                </div>
              )}
              <div className="flex-1">
                <Link to={item.path} className="text-gray-500 font-bold flex items-center gap-2">
                  {item.label}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AsidePublico;