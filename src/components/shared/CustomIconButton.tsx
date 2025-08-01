import { css } from "@emotion/css";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title?: string;
  fontSize?: number;
  isDisabled?: boolean;
}

export function CustomIconButton({
  icon,
  onClick,
  title,
  isDisabled,
  fontSize,
}: IconButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      title={title}
      className={css({
        background: "none",
        border: "none",
        padding: "6px",
        fontSize: fontSize || 16,
        cursor: isDisabled ? "not-allowed" : "pointer", // 👈 aquí
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isDisabled ? 0.5 : 1, // 👈 aquí
        pointerEvents: isDisabled ? "none" : "auto", // 👈 para evitar interacción visual
        "&:hover": {
          backgroundColor: isDisabled ? "transparent" : "#f0f0f0", // 👈 evita efecto hover si deshabilitado
        },
      })}
    >
      {icon}
    </button>
  );
}
