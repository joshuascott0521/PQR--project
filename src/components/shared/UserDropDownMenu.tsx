"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../shared/DropDownMenu";

import { RotateCcwKey, LogOut, UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDropdownMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ nombre: string; tipoUsuId: string }>({
    nombre: "",
    tipoUsuId: "",
  });

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
          <span className="pr-4 text-sm font-semibold">
            {user.nombre.split(" ")[0]}
          </span>
          <span className="pr-4 text-xs text-gray-500">{user.tipoUsuId}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" sideOffset={12}>
        <DropdownMenuLabel className="text-xs">Mi cuenta</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate("/dashboard/my-profile")}>
          <UserRoundPen className="mr-2 h-4 w-4" />
          <span>Editar Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard/change-my-password")}>
          <RotateCcwKey  className="mr-2 h-4 w-4" />
          <span>Cambiar Clave</span>
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
