export function getHoverBorderClass(fondo: string): string {
  switch (fondo) {
    case "registrado": return "hover:shadow-[#F97316]";
    case "asignado": return "hover:shadow-[#9B1B30]";
    case "en proceso": return "hover:shadow-[#0E9F6E]";
    case "en espera": return "hover:shadow-[#2563EB]";
    case "finalizado": return "hover:shadow-[#6D28D9]";
    case "anulado": return "hover:shadow-[#4B5563]";
    default: return "hover:shadow-gray";
  }
}
