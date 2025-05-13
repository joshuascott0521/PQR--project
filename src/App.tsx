import "./App.css";
import Login from "../src/pages/login/Login";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Dashboard from "./pages/Dashboard/dashboard"; // Cambiar a 'Dashboard' con mayúscula

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        {/* Usa el componente Dashboard aquí */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
