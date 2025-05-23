import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard/dashboard"; // Tu layout
import PorVencer from "./features/PQR/PorVencer";
import ATiempo from "./features/PQR/ATiempo";
import PqrData from "./features/PQR/PqrData";

// Importa las páginas internas
import Vencidos from "./features/PQR/Vencidos";
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
          <Route path="PQR/detalle" element={<PqrData />} />

          {/* <Route path="usuarios/login" element={<LoginFrm />} /> */}
          {/* Más rutas aquí */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
