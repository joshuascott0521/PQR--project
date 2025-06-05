// utils/toastUtils.tsx
import toast, { type ToastOptions } from "react-hot-toast";

const MAX_TOASTS = 4;
const activeToasts: string[] = [];

export const showToast = (
  message: string,
  type: "error" | "success" | "loading" = "error",
  options: ToastOptions = {}
) => {
  // Si ya hay 4 toasts, elimina el más antiguo
  if (activeToasts.length >= MAX_TOASTS) {
    const oldestId = activeToasts.shift(); // elimina el más antiguo
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
};
