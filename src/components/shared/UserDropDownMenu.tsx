"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../shared/DropDownMenu";

import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDropdownMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ nombre: string }>({ nombre: "" });

  useEffect(() => {
    const rawUser = localStorage.getItem("userData");
    if (rawUser) {
      setUser(JSON.parse(rawUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none hover:opacity-80">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black font-semibold uppercase">
          <img
            src="/Icon_Funcionario.svg"
            alt="Icono de funcionario"
            loading="lazy"
          />
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold">{user.nombre.split(' ')[0]}</span>
          <span className="text-xs text-gray-500">Administrador</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" sideOffset={12}>
        <DropdownMenuLabel className="text-xs">Mi cuenta</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate("/portal-pqr")}>
          <User className="mr-2 h-4 w-4" />
          <span>Portal</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
