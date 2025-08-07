import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as loginService, type User } from "../services/authService";
import { AuthContext } from "./AuthContext";
import ModalSesion from "../components/shared/ModalSesion";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const alreadyHandled = useRef(false);
  const hasLoggedOut = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = [
    "/",
    "/login",
    "/login/",
    "/login/Recuperar-contraseña",
    "/portal-pqr",
    "/solicitud/",
    "/usuario/reset-password/",
    "/consulta-pqr",
    "/signature"
  ];

  const isPublicRoute = (pathname: string) => {
    const normalizedPath = decodeURIComponent(pathname)
      .toLowerCase()
      .split("?")[0]

    return publicRoutes.some((route) => {
      const cleanRoute = route.toLowerCase().replace(/\/+$/, "");
      return normalizedPath.startsWith(cleanRoute);
    })
  };

  const logout = (redirect: boolean = true) => {
    hasLoggedOut.current = true;
    alreadyHandled.current = false;
    setSessionExpired(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    if (redirect) navigate("/login");
  };

  const triggerSessionExpiration = () => {
    if (!alreadyHandled.current && !hasLoggedOut.current) {
      alreadyHandled.current = true;
      setSessionExpired(true);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      try {
        const payloadBase64 = storedToken.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        const exp = payload.exp * 1000;
        const now = Date.now();

        if (now >= exp) {
          console.warn("Token expirado detectado al montar");
          triggerSessionExpiration();
          return;
        } else {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Token malformado:", error);
        logout();
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleTokenExpired = () => {
      console.warn("Evento externo de expiración de token");
      triggerSessionExpiration();
    };

    window.addEventListener("tokenExpired", handleTokenExpired);
    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      if (isPublicRoute(location.pathname)) return;

      if (!token) {
        console.warn("Token ausente");
        triggerSessionExpiration();
        return;
      }

      try {
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        const exp = payload.exp * 1000;
        const now = Date.now();

        if (now >= exp) {
          console.warn("Token expirado (intervalo)");
          triggerSessionExpiration();
        }
      } catch (err) {
        console.error("Error al validar token:", err);
        triggerSessionExpiration();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });

      localStorage.setItem("token", response.token);
      localStorage.setItem("userData", JSON.stringify(response.userData));

      setUser(response.userData);
      hasLoggedOut.current = false;
      navigate("/dashboard/statistic");
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };
  // Cuando se navega a una ruta pública, forzar el cierre del modal
  useEffect(() => {
    if (isPublicRoute(location.pathname)) {
      setSessionExpired(false);
      alreadyHandled.current = false;
      hasLoggedOut.current = false;
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, sessionExpired }}>
      {children}

      <ModalSesion
        isOpen={sessionExpired}
        onGoToLogin={() => logout(true)}
      />
    </AuthContext.Provider>
  );

};

