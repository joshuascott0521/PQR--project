import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard/dashboard"; // Tu layout
import PorVencer from "./features/PQR/PorVencer";
import ATiempo from "./features/PQR/ATiempo";
import PqrData from "./features/PQR/PqrData";

// Importa las páginas internas
import Vencidos from "./features/PQR/Vencidos";
import Registrado from "./features/PQR/Registrado";
import Asignado from "./features/PQR/Asignados";
import EnProceso from "./features/PQR/Proceso";
import EnEspera from "./features/PQR/Espera";
import Finalizado from "./features/PQR/Finalizado";
import Anulado from "./features/PQR/Anulado";
// import LoginFrm from "./features/Usuarios/LoginFrm"; // ejemplo
// Agrega más rutas internas según tus componentes

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

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
          {/* <Route path="usuarios/login" element={<LoginFrm />} /> */}
          {/* Más rutas aquí */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
