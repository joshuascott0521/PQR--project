import apiClient from "../api/apiClient";
import type { ApiResponse, ArchivoSubido, CreatePqr, departamento, Municipio, Pqr, tipoCliente, TipoPqr } from "../interfaces/pqrInterfaces";

export interface GetPqrParams {
  page: number;
  size: number;
  estadoProceso?: string;
  estadoVencimiento?: string;
}


export const TipoClienteServices = {
  getall: async (): Promise<ApiResponse<tipoCliente[]>> => {
    try {
      const response = await apiClient.get("/TipoCliente/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener tipos de clientes"
      };
    }
  }
};

export const RegionServices = {
  getDepart: async (): Promise<ApiResponse<departamento[]>> => {
    try {
      const response = await apiClient.get("/Departamento/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener listado de Departanentos"
      };
    }
  },
  getMun: async (id: number): Promise<ApiResponse<Municipio[]>> => {
    try {
      const response = await apiClient.get(`/Municipio/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener los municipios"
      }
    }
  }
};

export const TipoPqrServices = {
  getAll: async (): Promise<ApiResponse<TipoPqr[]>> => {
    try {
      const response = await apiClient.get("/TipoPQR/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener los tipos de PQR"
      }
    }
  }
};
/* Servicios Globales para la gestion de PQRs*/
export const PqrServices = {
  getByEstado: async ({
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
  },

  uploadFiles: async (archivos: File[]): Promise<ApiResponse<ArchivoSubido[]>> => {
    const formData = new FormData();

    archivos.forEach((archivo) => {
      formData.append("files", archivo)
    })

    try {
      const response = await apiClient.post("/PQR/UploadFiles", formData);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al subir archivos",
      };
    };
  },

  createPqr: async (pqr: CreatePqr): Promise<ApiResponse<string[]>> => {
    try {
      const response = await apiClient.post("/PQR/Create", pqr);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data:[],
        error: error.response?.data?.message || "Error al crear el PQR",
      };
    }
  }
}

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

export const Origen = {
  getAll: async (): Promise<ApiResponse<string[]>> => {
    const constrainName = "chk_PQR_Origen"
    try {
      const response = await apiClient.get(`/Parametro/GetDominioByNombre/${constrainName}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Origenes"
      }
    }
  }
}

