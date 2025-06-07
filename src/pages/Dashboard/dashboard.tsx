import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Aside from "../../components/shared/Aside";
import AsidePublico from "../../components/shared/AsidePublico";
import Header from "../../components/shared/Header";
import { useState } from "react";

const Dashboard = () => {
  const tipoUsuId = "Administrador";

  // Aquí declaras el estado global de isCollapse
  const [isCollapse, setIsCollapse] = useState(false);

  const openNotification = false;
  const moreOption = false;

  return (
    <div className="flex h-screen w-full">
      <ToastContainer />

      {/* Aside */}
      {tipoUsuId === "Administrador" ? (
        <Aside isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      ) : (
        <AsidePublico />
      )}

      {/* Main content */}
     <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 transition-all duration-300">

        {/* Header */}
        <div className="mb-2">
          <Header />
        </div>

        {/* Panel de notificaciones simulado */}
        {openNotification && (
          <div className="absolute top-24 right-80 w-96 h-96 border rounded bg-white overflow-y-auto z-50">
            <h2 className="text-center font-bold py-2 border-b">
              Notificaciones
            </h2>
          </div>
        )}

        {/* Menú más opciones simulado */}
        {moreOption && (
          <div className="absolute top-24 right-10 w-60 border rounded bg-white z-40">
            <button className="w-full py-2 hover:bg-green-100">Perfil</button>
            <button className="w-full py-2 hover:bg-green-100">Salir</button>
          </div>
        )}

        {/* Contenido dinámico */}
        <div className="flex-grow overflow-y-auto p-4 mb-0 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
