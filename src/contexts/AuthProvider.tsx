import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService, type User } from "../services/authService";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");
    if (storedToken && storedUser) {
    setUser(JSON.parse(storedUser));
  }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });

      // Guarda el token y los datos del usuario
      localStorage.setItem("token", response.token); // o como se llame
      localStorage.setItem("userData", JSON.stringify(response.userData));

      setUser(response.userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };



  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
