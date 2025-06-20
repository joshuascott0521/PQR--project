import apiClient from "../api/apiClient";
import type {
  Adjunto,
  AlertaNotificacion,
  ApiResponse,
  ArchivoSubido,
  Cliente,
  CreatePqr,
  departamento,
  DetallePqrCreate,
  EstadoFlujoData,
  Evento,
  Municipio,
  Parameters,
  Pqr,
  PqrCount,
  SolicitudRequisitoDTO,
  tipoCliente,
  TipoPqr,
  Usuario,
} from "../interfaces/pqrInterfaces";

export interface GetPqrParams {
  page: number;
  size: number;
  estadoProceso?: string;
  estadoVencimiento?: string;
}
export const typeSelectComents = {
  getEvento: async (id: string): Promise<ApiResponse<Evento[]>> => {
    try {
      const response = await apiClient.get(
        `/PQREvento/GetEventoPermitido/${id}`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error:
          error.response?.data?.message || "Error al obtener tipos de clientes",
      };
    }
  },
  getUsuarios: async (): Promise<ApiResponse<Usuario[]>> => {
    try {
      const response = await apiClient.get("usuario/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error:
          error.response?.data?.message || "Error al obtener tipos de clientes",
      };
    }
  },
};

export const TipoClienteServices = {
  getall: async (): Promise<ApiResponse<tipoCliente[]>> => {
    try {
      const response = await apiClient.get("/TipoCliente/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error:
          error.response?.data?.message || "Error al obtener tipos de clientes",
      };
    }
  },
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
        error:
          error.response?.data?.message ||
          "Error al obtener listado de Departanentos",
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
        error:
          error.response?.data?.message || "Error al obtener los municipios",
      };
    }
  },
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
        error:
          error.response?.data?.message || "Error al obtener los tipos de PQR",
      };
    }
  },
};
/* Servicios Globales para la gestion de PQRs*/
export const PqrServices = {
  getDetallePqrCreate: async (
    detalle: DetallePqrCreate
  ): Promise<ApiResponse<DetallePqrCreate>> => {
    try {
      const response = await apiClient.post("PQRDetalle/Create", detalle);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as DetallePqrCreate,
        error: error.response?.data?.message || "Error al crear detalle PQR",
      };
    }
  },
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

  uploadFiles: async (
    archivos: File[]
  ): Promise<ApiResponse<ArchivoSubido[]>> => {
    const formData = new FormData();

    archivos.forEach((archivo) => {
      formData.append("files", archivo);
    });

    try {
      const response = await apiClient.post("/PQR/UploadFiles", formData);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al subir archivos",
      };
    }
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
        data: [],
        error: error.response?.data?.message || "Error al crear el PQR",
      };
    }
  },

  createPqrPortal: async (pqr: CreatePqr): Promise<ApiResponse<string[]>> => {
    try {
      const response = await apiClient.post("/PQR/CreatePublic", pqr);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error:
          error.response?.data?.message || "Error al crear el PQR por portal",
      };
    }
  },
  getById: async (id: string): Promise<ApiResponse<Pqr>> => {
    try {
      const response = await apiClient.get(`/PQR/GetItemById/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Pqr,
        error:
          error.response?.data?.message ||
          "Error al obtener el detalle del PQR",
      };
    }
  },

  getByFilter: async ({
    value,
    page,
    size,
  }: GetPqrParams & { value: string }): Promise<ApiResponse<Pqr[]>> => {
    try {
      const response = await apiClient.get("/PQR/GetByFilterPQR", {
        params: {
          valueFilter: value,
          pagenumber: page,
          pagesize: size,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error:
          error.response?.data?.message || "Error al obtener PQR del Cliente",
      };
    }
  },
  getPqrCount: async (
    estadoVencimiento: string,
    usuarioId: string
  ): Promise<ApiResponse<PqrCount>> => {
    try {
      const response = await apiClient.get("/PQR/GetByEstadoVencRes", {
        params: { estadoVencimiento, usuarioId },
      });

      return {
        success: true,
        data: response.data, // ← Un solo objeto, no array
      };
    } catch (error: any) {
      return {
        success: false,
        data: { estado: "", cantidad: 0 }, // ← Objeto vacío válido
        error:
          error.response?.data?.message ||
          "Error al cargar el conteo de PQR por estado de vencimiento",
      };
    }
  },
  getPqrCountEstadoFlujo: async (
    estadoFlujo: string,
    usuarioId: string
  ): Promise<ApiResponse<PqrCount>> => {
    try {
      const response = await apiClient.get("PQR/GetByEstadoFlujRes", {
        params: { estadoFlujo, usuarioId },
      });

      return {
        success: true,
        data: response.data, // ← Un solo objeto, no array
      };
    } catch (error: any) {
      return {
        success: false,
        data: { estado: "", cantidad: 0 }, // ← Objeto vacío válido
        error:
          error.response?.data?.message ||
          "Error al cargar el conteo de PQR por estado de vencimiento",
      };
    }
  },
  getPqrStatistics: async (
    usuId: string
  ): Promise<ApiResponse<EstadoFlujoData[]>> => {
    try {
      const response = await apiClient.get("/PQR/GetResumenDashBoard/", {
        params: { usuId: usuId },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error:
          error.response?.data?.message ||
          "Error al cargar PQRS para estadisticas",
      };
    }
  },
};

export const UsersServices = {
  getAll: async (): Promise<ApiResponse<Usuario[]>> => {
    try {
      const response = await apiClient.get("/usuario/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Funcionario",
      };
    }
  },
  getById: async (id: string): Promise<ApiResponse<Usuario>> => {
    try {
      const response = await apiClient.get(`/usuario/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Usuario,
        error: error.response?.data?.message || "Error al cargar Funcionario",
      };
    }
  },
  getResume: async (id: string): Promise<ApiResponse<Usuario>> => {
    try {
      const response = await apiClient.get(`/usuario/GetReview/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Usuario,
        error: error.response?.data?.message || "Error al cargar Resumen",
      };
    }
  },
};

export const Origen = {
  getAll: async (): Promise<ApiResponse<string[]>> => {
    const constrainName = "chk_PQR_Origen";
    try {
      const response = await apiClient.get(
        `/Parametro/GetDominioByNombre/${constrainName}`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Origenes",
      };
    }
  },
};

export const ClientesServices = {
  getAll: async (): Promise<ApiResponse<Cliente[]>> => {
    try {
      const response = await apiClient.get("/Cliente/ObtenerAllCliente");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Clientes",
      };
    }
  },

  getByDoc: async (doc: string): Promise<ApiResponse<Cliente>> => {
    try {
      const response = await apiClient.get(`Cliente/GetByDocumento/${doc}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Cliente,
        error:
          error.response?.data?.message ||
          "Error al cargar cliente por documento",
      };
    }
  },
  getById: async (id: string): Promise<ApiResponse<Cliente>> => {
    try {
      const response = await apiClient.get(`Cliente/ObtenerItemCliente/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Cliente,
        error: error.response?.data?.message || "Error al cargar Clientes",
      };
    }
  },
  update: async (cliente: Cliente): Promise<ApiResponse<Cliente>> => {
    try {
      const response = await apiClient.put(
        "Cliente/ActualizarItemCliente",
        cliente
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Cliente,
        error: error.response?.data?.message || "Error al actualizar Cliente",
      };
    }
  },
};

export const ArchivoServices = {
  descargar: async (
    urlArchivo: string,
    nombreArchivo: string
  ): Promise<ApiResponse<void>> => {
    try {
      const encodedUrl = encodeURIComponent(urlArchivo);
      const response = await apiClient.get(
        `PQR/descargar?urlArchivo=${encodedUrl}`,
        {
          responseType: "blob", // 👈 esto es clave
        }
      );

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true, data: undefined };
    } catch (error: any) {
      return {
        success: false,
        data: undefined,
        error: error.message || "Error al descargar el archivo",
      };
    }
  },
};

export const SolicitudServices = {
  getById: async (id: string): Promise<ApiResponse<SolicitudRequisitoDTO>> => {
    try {
      const response = await apiClient.get(`/PQRSolicitud/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as SolicitudRequisitoDTO,
        error:
          error.response?.data?.message ||
          error.message ||
          "Error al cargar la solicitud",
      };
    }
  },
  responderPut: async (payload: {
    id: number;
    mensaje: string;
    adjuntos: Adjunto[];
  }): Promise<ApiResponse<string>> => {
    try {
      const response = await apiClient.put("/PQRSolicitud/Update", payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: "",
        error: error.response?.data?.message || "Error al responder solicitud",
      };
    }
  },
};

export const ParametersServices = {
  getParameters: async (): Promise<ApiResponse<Parameters[]>> => {
    try {
      const response = await apiClient.get("/Parametro/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener parámetros",
      };
    }
  },
  getTypesParameter: async (): Promise<ApiResponse<string[]>> => {
    const constrainName = "chk_Parametro_TipoParametro";
    try {
      const response = await apiClient.get(
        `/Parametro/GetDominioByNombre/${constrainName}`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Origenes",
      };
    }
  },
  getParameterByCode: async (
    code: string
  ): Promise<ApiResponse<Parameters>> => {
    try {
      const respose = await apiClient.get(`/Parametro/Get/${code}`);
      return {
        success: true,
        data: respose.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Parameters,
        error: error.response?.data?.message || "Error al cargar Parámetro",
      };
    }
  },
  updateParameter: async (payload: {
    codigo: string;
    descripcion: string;
    tipoParametro: string;
    valorString: string | null;
    valorInt: number | null;
    valorDecimal: number | null;
    valorDate: string | null;
    valorBool: boolean | null;
    valorImgUrl: string | null;
    valorHtml: string | null;
  }): Promise<ApiResponse<Parameters>> => {
    try {
      const response = await apiClient.put("/Parametro/Update", payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Parameters,
        error: error.response?.data?.message || "Error al actualizar Parámetro",
      };
    }
  },
};

interface AlertasResponse {
  alertas: AlertaNotificacion[];
  totalPendientes: number;
}

export const NotificacionesService = {
  getAlertas: async (
    usuarioId: string,
    pageNumber = 1,
    pageSize = 3
  ): Promise<ApiResponse<AlertasResponse>> => {
    try {
      const response = await apiClient.get("/Alerta/Get", {
        params: {
          usuarioId,
          pageNumber,
          pageSize,
        },
      });

      return { success: true, data: response.data };
    } catch (error: any) {
      const isNoAlertasError =
        error.response?.data?.errors?.Alerta?.[0] ===
        "No se encontraron Alertas";

      return {
        success: false,
        data: { alertas: [], totalPendientes: 0 },
        error: isNoAlertasError
          ? "No se encontraron más alertas"
          : "Error al obtener notificaciones",
      };
    }
  },
  getTotalPendientes: async (usuarioId: string): Promise<number> => {
    try {
      const response = await apiClient.get("/Alerta/Get", {
        params: {
          usuarioId,
          pageNumber: 1,
          pageSize: 1, // solo para el conteo
        },
      });
      return response.data.totalPendientes || 0;
    } catch {
      return 0;
    }
  },
};

export const AuthServices = {
  forgotPassword: async (email: string) => {
    try {
      const response = await apiClient.post("/usuario/forgot-password", {
        email: email,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Error desconocido",
      };
    }
  },
  resetPassword: async (data: {
    token?: string;
    nuevaPassword: string;
    confirmacionPassword: string;
  }) => {
    try {
      const response = await apiClient.post("/usuario/reset-password", data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Error al restaurar la contraseña";
      return {
        success: false,
        error: errorMsg,
      };
    }
  },
};
