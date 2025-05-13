import apiClient from "../api/apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  nombre: string;
}

export interface LoginResponse {
  token: string;
  userData: User;
}

export const login = async ({
  email,
  password,
}: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post("/usuario/Login", { email, password });

  if (response.status !== 200) {
    throw new Error("Error en la autenticación");
  }

  const { token, ...userData } = response.data;

  // Guarda el token y los datos del usuario
  localStorage.setItem("token", token);
  localStorage.setItem("userData", JSON.stringify(userData));

  return { token, userData };
};
