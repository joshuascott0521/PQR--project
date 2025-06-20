export function getColorClass(estado: string): string {
  switch (estado.toUpperCase()) {
    case "VENCIDO":
      return "bg-red-600";
    case "POR VENCER":
      return "bg-yellow-300";
    case "A TIEMPO":
      return "bg-green-500";
    default:
      return "bg-gray-400"; // valor por defecto si el estado no es reconocido
  }
}
