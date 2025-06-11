import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Aside from "../../components/shared/Aside";
import AsidePublico from "../../components/shared/AsidePublico";
import Header from "../../components/shared/Header";
import { useState } from "react";

const Dashboard = () => {
  const tipoUsuId = "Administrador";

  const [isCollapse, setIsCollapse] = useState(false);

  const openNotification = false;
  const moreOption = false;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <ToastContainer />

      {/* Header */}
      <div className="w-full flex-shrink-0">
        <Header setIsCollapse={setIsCollapse} />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-1 min-h-0">
        {/* Aside */}
        {tipoUsuId === "Administrador" ? (
          <Aside isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
        ) : (
          <AsidePublico />
        )}

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-gray-50 transition-all duration-300">
          {/* Panel de notificaciones */}
          {openNotification && (
            <div className="absolute top-24 right-80 w-96 h-96 border rounded bg-white overflow-y-auto z-50">
              <h2 className="text-center font-bold py-2 border-b">
                Notificaciones
              </h2>
            </div>
          )}

          {/* Menú más opciones */}
          {moreOption && (
            <div className="absolute top-24 right-10 w-60 border rounded bg-white z-40">
              <button className="w-full py-2 hover:bg-green-100">Perfil</button>
              <button className="w-full py-2 hover:bg-green-100">Salir</button>
            </div>
          )}

          {/* Contenido dinámico */}
          <div className="flex-grow overflow-y-auto p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
