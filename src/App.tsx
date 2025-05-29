import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard/dashboard"; // Tu layout
import PorVencer from "./features/PQR/PorVencer";
import ATiempo from "./features/PQR/ATiempo";
import PqrData from "./features/PQR/PqrData";
import { Toaster } from "react-hot-toast";

// Importa las páginas internas
import Vencidos from "./features/PQR/Vencidos";
import Registrado from "./features/PQR/Registrado";
import Asignado from "./features/PQR/Asignados";
import EnProceso from "./features/PQR/Proceso";
import EnEspera from "./features/PQR/Espera";
import Finalizado from "./features/PQR/Finalizado";
import Anulado from "./features/PQR/Anulado";
import NuevoPqr from "./features/PQR/NuevoPqr";

import Portal from "./pages/portal";
import PrivateRoute from "./components/PrivateRoutes";
import Clientes from "./features/Usuarios/Clientes";
import ClienteDetalle from "./features/Usuarios/ClienteDetalle";
import ResultadosBusquedaPage from "./features/PQR/ResultadoBusquedaPg";
import Solicitud from "./pages/Solicitud";
import Funcionarios from "./features/Usuarios/Funcionarios";
import FuncionarioResumen from "./features/Usuarios/FuncionarioResumen";
import EditarCliente from "./features/Usuarios/EditarCliente";
// import PqrChat from "./components/shared/PqrChat";
// import LoginFrm from "./features/Usuarios/LoginFrm"; // ejemplo
// Agrega más rutas internas según tus componentes

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            margin: 0,
            padding: '8px 12px',
            background: "#fff",
            color: "#333",
            fontSize: "14px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      />
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route element={<PrivateRoute />}>
          {/* Rutas protegidas bajo el layout Dashboard */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route index element={<div>Inicio (Dashboard)</div>} /> */}
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
            <Route path="admin/funcionarios" element={<Funcionarios />} />
            <Route path="/dashboard/PQR/detalle/:id" element={<PqrData />} />
            <Route path="/dashboard/cliente/detalle/:id" element={<ClienteDetalle />} />
            <Route path="/dashboard/cliente/editar/:id" element={<EditarCliente />} />
            <Route path="/dashboard/funcionarios/resumen/:id" element={<FuncionarioResumen />} />
            <Route path="/dashboard/resultados-busqueda" element={<ResultadosBusquedaPage />} />

            {/* <Route path="usuarios/login" element={<LoginFrm />} /> */}
            {/* Más rutas aquí */}
          </Route>
        </Route>
        <Route path="portal-pqr" element={<Portal />} />
        <Route path="solicitud-pqr/:id" element={<Solicitud />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
