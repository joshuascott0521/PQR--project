import { css } from "@emotion/css";
import { useMemo } from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title?: string;
  fontSize?: number;
  isDisabled?: boolean;
  className?: string; // 👈 aquí
  isActive?: boolean;
}

export function CustomIconButton({
  icon,
  onClick,
  title,
  isDisabled,
  fontSize,
  className, // 👈 aquí
  isActive,
}: IconButtonProps) {
  // 👇 Aquí debes declarar baseStyle ANTES del return
  const baseStyle = useMemo(
    () =>
      css({
        background: isActive ? "#3182ce" : "none", // azul cuando activo
        color: isActive ? "#fff" : "#444", // texto blanco si activo
        border: "none",
        borderRadius: `${isActive ? "4px" : "4px"} !important`,
        padding: "6px",
        fontSize: fontSize || 16,
        cursor: isDisabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
        "&:hover": {
          backgroundColor: isDisabled
            ? "transparent"
            : isActive
            ? "#2b6cb0" // tono más oscuro al pasar el mouse si está activo
            : "#f0f0f0",
        },
      }),
    [fontSize, isDisabled, isActive]
  );

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      title={title}
      className={`${baseStyle} ${className || ""}`} // 👈 Aquí ya está definido baseStyle
    >
      {icon}
    </button>
  );
}
