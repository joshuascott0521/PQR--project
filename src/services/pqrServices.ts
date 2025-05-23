import apiClient from "../api/apiClient";
import type { Pqr } from "../interfaces/pqrInterfaces";

export interface GetPqrParams {
  page: number;
  size: number;
  estadoProceso?: string;
  estadoVencimiento?: string;
}

// Función reutilizable
export const getPqrByEstado = async ({
  usuid,
  page,
  size,
  estadoProceso,
  estadoVencimiento,
}: GetPqrParams & { usuid: string }): Promise<Pqr[]> => {
  const response = await apiClient.get<Pqr[]>("/PQR/GetByEstadoPQR", {
    params: {
      usuid,
      pagenumber: page,
      pagesize: size,
      estadoProceso,
      estadoVencimiento,
    },
  });

  return response.data;
};
 