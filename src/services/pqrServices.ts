import apiClient from "../api/apiClient";
import apiClientPublic from "../api/apiClientPublic";
import type {
  Adjunto,
  AlertaNotificacion,
  ApiResponse,
  ArchivoSubido,
  Cliente,
  CrearPqrResponse,
  CreatePqr,
  departamento,
  Dependencia,
  DetallePqrCreate,
  DominioConstraint,
  EnviarNotificacion,
  EstadoFlujoData,
  Evento,
  MedioNotificacion,
  Municipio,
  NotificacionDetalle,
  Parameters,
  Password,
  Pqr,
  PqrCount,
  SolicitudRequisitoDTO,
  tipoCliente,
  TipoPqr,
  UserType,
  Usuario,
  UsuarioAsignar,
} from "../interfaces/pqrInterfaces";

export interface GetPqrParams {
  funcionarioId?: string;
  page: number;
  size: number;
  estadoProceso?: string;
  estado?: string;
  orden?: number;
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
  getUsuarios: async (id: string): Promise<ApiResponse<UsuarioAsignar[]>> => {
    try {
      const response = await apiClient.get(`usuario/AsignarById?usuid=${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log(Response);
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
    orden,
    estadoVencimiento,
  }: GetPqrParams & { usuid: string }): Promise<ApiResponse<Pqr[]>> => {
    try {
      const response = await apiClient.get<Pqr[]>("/PQR/GetByEstadoPQR", {
        params: {
          usuid,
          pagenumber: page,
          pagesize: size,
          estadoProceso,
          estadoVencimiento,
          orden,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      if (
        error.response?.status === 404 &&
        error.response?.data?.code === "NOT_FOUND"
      ) {
        return {
          success: false,
          data: [],
          error: error.response?.data?.message || "Error al traer pqrs",
        }; // No hay PQRs, pero no es un fallo
      }
      console.log("❌❌❌❌❌❌", error);
      console.error("Error real al obtener PQR por estado:", error);
      throw new Error(
        error.response?.data?.message || "Error al consultar los PQR."
      );
    }
  },
  getByFuncionarioId: async ({
    funcionarioId,
    page,
    size,
    orden,
    estado,
  }: GetPqrParams & { funcionarioId: string }): Promise<ApiResponse<Pqr[]>> => {
    try {
      const response = await apiClient.get<Pqr[]>("/PQR/GetByFuncionarioId", {
        params: {
          funcionarioId,
          pagenumber: page,
          pagesize: size,
          estado,
          orden,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      if (
        error.response?.status === 404 &&
        error.response?.data?.code === "NOT_FOUND"
      ) {
        return {
          success: false,
          data: [],
          error: error.response?.data?.message || "Error al traer pqrs",
        }; // No hay PQRs, pero no es un fallo
      }
      console.log("❌❌❌❌❌❌", error);
      console.error("Error real al obtener PQR por estado:", error);
      throw new Error(
        error.response?.data?.message || "Error al consultar los PQR."
      );
    }
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

  createPqr: async (pqr: CreatePqr): Promise<ApiResponse<CrearPqrResponse>> => {
    try {
      const response = await apiClient.post("/PQR/Create", pqr);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: {
          id: "",
          mensaje: "",
        },
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

export const DependenciaServices = {
  getAll: async (): Promise<ApiResponse<Dependencia[]>> => {
    try {
      const response = await apiClient.get("/PQRDependencia/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Dependencias",
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
  getUserType: async (): Promise<ApiResponse<UserType[]>> => {
    try {
      const response = await apiClient.get(
        "/tipousuario/ObtenerAllTipoUsuario"
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al tipo de usuarios",
      };
    }
  },
  update: async (funcionario: Usuario): Promise<ApiResponse<Usuario>> => {
    try {
      const response = await apiClient.put("/usuario/Update", funcionario);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Usuario,
        error:
          error.response?.data?.message || "Error al actualizar funcionario",
      };
    }
  },
  updatePerfil: async (funcionario: Usuario): Promise<ApiResponse<Usuario>> => {
    try {
      const payload = {
        id: funcionario.id,
        documento: funcionario.documento,
        nombre: funcionario.nombre,
        email: funcionario.email,
        celular: funcionario.celular,
        firma: funcionario.firma,
      };

      const response = await apiClient.put("/usuario/Update-perfil", payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Usuario,
        error:
          error.response?.data?.message || "Error al actualizar funcionario",
      };
    }
  },

  create: async (funcionario: Usuario): Promise<ApiResponse<string[]>> => {
    try {
      const response = await apiClient.post("/usuario/Create", funcionario);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al crear funcionario",
      };
    }
  },
  changePass: async (payload: Password): Promise<ApiResponse<Password>> => {
    try {
      const response = await apiClient.put("/usuario/UpdatePassword", payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Password,
        error:
          error.response?.data?.message || "Error al actualizar contraseña",
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
  getByPage: async (page: number, size: number): Promise<ApiResponse<Cliente[]>> => {
    try {
      const response = await apiClient.get(`/Cliente/ObtenerAllCliente/${page}/${size}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Clientes paginados",
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
      const response = await apiClientPublic.get(`/PQRSolicitud/Get/${id}`);
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
      const response = await apiClientPublic.put("/PQRSolicitud/Update", payload);
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
  updateParameter: async (
    formData: FormData
  ): Promise<ApiResponse<Parameters>> => {
    try {
      const response = await apiClient.put(`/Parametro/Update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Parameters,
        error: error.response?.data?.message || "Error al actualizar parámetro",
      };
    }
  },
  createParameter: async (
    formData: FormData
  ): Promise<ApiResponse<Parameters>> => {
    try {
      const response = await apiClient.post("/Parametro/Create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        transformResponse: [
          (data) => {
            try {
              return JSON.parse(data);
            } catch {
              return { mensaje: data }; // Fallback para texto plano
            }
          },
        ],
      });

      return {
        success: true,
        data: response.data, // puede ser un objeto con id y mensaje
      };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Parameters,
        error: error.response?.data?.mensaje || "Error al crear el parámetro",
      };
    }
  },
  searchParameters: async (
    query: string
  ): Promise<ApiResponse<Parameters[]>> => {
    try {
      const response = await apiClient.get(
        `/Parametro/Search?valorTxt=${query}`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener parámetros",
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
  getAlertaDetalle: async (
    id: number
  ): Promise<{ pqrId: string; consecutivo: number; estado: string }> => {
    try {
      const response = await apiClient.get(`/Alerta/Get/${id}`); // ✅ id en la URL
      return response.data;
    } catch {
      throw new Error("Error al obtener detalle de la alerta");
    }
  },
  enviarNotificaciones: async (
    enviarNotificacion: EnviarNotificacion
  ): Promise<ApiResponse<EnviarNotificacion>> => {
    try {
      const response = await apiClient.post(
        "PQRDetalle/enviar-notificacion",
        enviarNotificacion
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: {} as EnviarNotificacion,

        // error: error,
      };
    }
  },
  getMediosNotificacion: async (): Promise<
    ApiResponse<MedioNotificacion[]>
  > => {
    try {
      const response = await apiClient.get("/PQRDetalle/GetMediosNotificacion");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al cargar Clientes",
      };
    }
  },
  getCalidadNotificacion: async (): Promise<
    ApiResponse<DominioConstraint | null>
  > => {
    try {
      const response = await apiClient.get<DominioConstraint[]>(
        "/Parametro/GetDominiosAll"
      );

      const calidad = response.data.find(
        (item) => item.constraintName === "chk_PQRNotificacion_Calidad"
      );

      return {
        success: true,
        data: calidad ?? null,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error:
          error.response?.data?.message ||
          "Error al obtener dominios de calidad",
      };
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
export const NotificacionServices = {
  getByDetalle: async (
    pqrId: string,
    item: number
  ): Promise<ApiResponse<NotificacionDetalle[]>> => {
    try {
      const response = await apiClient.get(`/PQRNotificacion/GetByDetalle`, {
        params: { pqrId, item },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error:
          error.response?.data?.message ||
          "Error al obtener las notificaciones del detalle",
      };
    }
  },
  getUrlRedireccion: async (idEnvio: number): Promise<ApiResponse<string>> => {
    try {
      const response = await apiClient.get(
        `/PQRNotificacion/GetUrlRedireccion/${idEnvio}`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: "",
        error:
          error.response?.data?.message ||
          "Error al obtener la URL de redirección",
      };
    }
  },
};
