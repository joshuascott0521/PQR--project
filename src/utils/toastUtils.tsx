// utils/toastUtils.tsx
import toast, { type ToastOptions } from "react-hot-toast";

const MAX_TOASTS = 4;
const activeToasts: string[] = [];

/**
 * Muestra un toast y retorna su ID.
 */
export const showToast = (
  message: string,
  type: "error" | "success" | "loading" = "error",
  options: ToastOptions = {}
): string => {
  // Si ya hay 4 toasts, elimina el más antiguo
  if (activeToasts.length >= MAX_TOASTS) {
    const oldestId = activeToasts.shift();
    if (oldestId) toast.dismiss(oldestId);
  }

  // Crear nuevo toast y guardar su id
  let toastId: string;
  if (type === "success") {
    toastId = toast.success(message, options);
  } else if (type === "loading") {
    toastId = toast.loading(message, options);
  } else {
    toastId = toast.error(message, options);
  }

  activeToasts.push(toastId);
  return toastId; // ← Retornar el ID
};

/**
 * Elimina un toast dado su ID.
 */
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
  // También lo quitamos del array de activos si existe
  const index = activeToasts.indexOf(toastId);
  if (index !== -1) {
    activeToasts.splice(index, 1);
  }
};
