// import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { LoadingProvider } from "./contexts/LoadingContext";
import GlobalLoadingOverlay from "./components/shared/GlobalLoadingOverlay";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard/dashboard"; // Tu layout
import PorVencer from "./features/PQR/PorVencer";
import LoginForm from "./features/Usuarios/LoginFrm";
import ForgetPasswordFrm from "./features/Usuarios/ForgetPasswordFrm";
import { Portal } from "@radix-ui/react-dropdown-menu";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoutes";
import AllPqr from "./features/PQR/AllPqr";
import Anulado from "./features/PQR/Anulado";
import Asignado from "./features/PQR/Asignados";
import ATiempo from "./features/PQR/ATiempo";
import EnEspera from "./features/PQR/Espera";
import Finalizado from "./features/PQR/Finalizado";
import Metricas from "./features/PQR/Metricas";
import NuevoPqr from "./features/PQR/NuevoPqr";
import PqrData from "./features/PQR/PqrData";
import EnProceso from "./features/PQR/Proceso";
import Registrado from "./features/PQR/Registrado";
import Vencidos from "./features/PQR/Vencidos";
import { ChangePassword } from "./features/Usuarios/ChangePassword";
import ClienteDetalle from "./features/Usuarios/ClienteDetalle";
import Clientes from "./features/Usuarios/Clientes";
import EditarCliente from "./features/Usuarios/EditarCliente";
import FuncionarioResumen from "./features/Usuarios/FuncionarioResumen";
import Funcionarios from "./features/Usuarios/Funcionarios";
import Parametros from "./features/Usuarios/Parametros";
import { VistaPerfil } from "./features/Usuarios/VistaPerfil";
import ResetPassword from "./pages/ResetPassword";
import Solicitud from "./pages/Solicitud";
import FuncionarioDetalleWrapper from "./utils/FuncionarioWrapper";
import ParametrosDetalleWrapper from "./utils/ParametroWrapper";

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              margin: 0,
              padding: "8px 12px",
              background: "#fff",
              color: "#333",
              fontSize: "14px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />}>
            <Route index element={<LoginForm />} />
            <Route
              path="Recuperar-contraseña"
              element={<ForgetPasswordFrm />}
            />
          </Route>

          <Route element={<PrivateRoute />}>
            {/* Rutas protegidas bajo el layout Dashboard */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/statistic" element={<Metricas />} />
              <Route path="my-profile" element={<VistaPerfil />} />
              <Route path="change-my-password" element={<ChangePassword />} />
              <Route path="all-pqr" element={<AllPqr />} />
              <Route path="vencidos" element={<Vencidos />} />
              <Route path="por-vencer" element={<PorVencer />} />
              <Route path="a-tiempo" element={<ATiempo />} />
              <Route path="registrados" element={<Registrado />} />
              <Route path="asignados" element={<Asignado />} />
              <Route path="PQR/detalle" element={<PqrData />} />
              <Route path="en-proceso" element={<EnProceso />} />
              <Route path="en-espera" element={<EnEspera />} />
              <Route path="finalizado" element={<Finalizado />} />
              <Route path="anulado" element={<Anulado />} />
              <Route path="nuevo-pqr" element={<NuevoPqr />} />
              <Route path="admin/cliente" element={<Clientes />} />
              <Route path="admin/parametros" element={<Parametros />} />
              <Route
                path="admin/parametros/detalle/:code"
                element={<ParametrosDetalleWrapper />}
              />
              <Route
                path="admin/parametros/crear"
                element={<ParametrosDetalleWrapper />}
              />
              <Route path="admin/funcionarios" element={<Funcionarios />} />
              <Route
                path="admin/funcionario/editar/:code"
                element={<FuncionarioDetalleWrapper />}
              />
              <Route
                path="admin/funcionario/crear"
                element={<FuncionarioDetalleWrapper />}
              />
              <Route path="/dashboard/PQR/detalle/:id" element={<PqrData />} />
              <Route
                path="/dashboard/cliente/detalle/:id"
                element={<ClienteDetalle />}
              />
              <Route
                path="/dashboard/cliente/editar/:id"
                element={<EditarCliente />}
              />
              <Route
                path="/dashboard/funcionarios/resumen/:id"
                element={<FuncionarioResumen />}
              />
            </Route>
          </Route>
          {/* Ruta pública */}
          <Route path="portal-pqr" element={<Portal />} />
          <Route path="solicitud/:id" element={<Solicitud />} />
          <Route
            path="usuario/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
        <GlobalLoadingOverlay />
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
