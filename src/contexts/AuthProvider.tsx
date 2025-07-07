import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService, type User } from "../services/authService";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.info("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      try {
        const payloadBase64 = storedToken.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        const exp = payload.exp * 1000; // JWT exp viene en segundos, convertir a ms
        const now = Date.now();

        if (now >= exp) {
          console.warn("⏰ Token expirado. Cerrando sesión...");
          logout();
        } else {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("⚠️ Token inválido o malformado:", error);
        logout();
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const handleTokenExpired = () => {
      console.warn("⛔ Token expirado por interceptor");
      logout();
    };

    window.addEventListener("tokenExpired", handleTokenExpired);
    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Si el token fue borrado manualmente
        console.warn("Token ausente, cerrando sesión automáticamente");
        logout();
        return;
      }

      try {
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        const exp = payload.exp * 1000;
        const now = Date.now();

        if (now >= exp) {
          console.warn("Token expirado detectado por verificación en segundo plano");
          logout();
        }
      } catch (err) {
        console.error("Token malformado en intervalo, cerrando sesión");
        logout();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });

      localStorage.setItem("token", response.token);
      localStorage.setItem("userData", JSON.stringify(response.userData));

      setUser(response.userData);
      navigate("/dashboard/statistic");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
