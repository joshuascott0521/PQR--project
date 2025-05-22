import { Outlet } from "react-router-dom";
import Header from "../../components/shared/Header";
import Aside from "../../components/shared/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Aside />
      {/* NAVBAR */}
      <div className="flex flex-col flex-1">
        <Header />
        <main>
          <Outlet />
          {/* Aquí se cargan las rutas hijas */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
