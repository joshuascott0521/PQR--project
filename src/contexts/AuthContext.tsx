import { createContext } from "react";
import type { User } from "../services/authService";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
