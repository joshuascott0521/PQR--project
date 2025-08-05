export interface CreatePqr {
  documentoCliente: string;
  nombreCliente: string;
  tipoClienteId: string;
  email: string;
  celular: string;
  direccion: string;
  departamentoCod: number;
  municipioCod: number;
  radicado?: string | null;
  fecha: string;
  tipoPQRId: string;
  origen: string;
  asunto: string;
  descripcion: string;
  adjuntos: Adjunto[];
  usuarioId: string | null;
}

export interface AsideProps {
  isCollapse: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Pqr {
  id: string;
  clienteId: string;
  nombreCliente: string;
  documentoCliente: string;
  totalPQRCliente: number;
  asunto: string;
  tipoPQRId: string;
  nombreTipoPQR: string;
  estado: string;
  usuarioId: string;
  nombreFuncionario: string;
  documentoFuncionario: string;
  consecutivo: number;
  radicado: string;
  origen: string;
  item: string;
  diasRestantes: number;
  estadoVencimiento: string;
  colorHex: string;
  fecha: string;
}
export interface DetallePqr {
  id: string;
  clienteId: string;
  nombreCliente: string;
  documentoCliente: string;
  asunto: string;
  tipoPQRId: string;
  nombreTipoPQR: string;
  usuarioId: string;
  nombreFuncionario: string;
  documentoFuncionario: string;
  consecutivo: number;
  radicado: string;
  origen: string;
  item: string;
  diasRestantes: number;
  estadoVencimiento: string;
  colorHex: string;
  fecha: string;
  tipoPQRNombre?: string;
  codigoColorEstado?: string;
  estado?: string;
  detalle?: Detalle[];
  cliente?: Cliente;
  funcionario?: Funcionario;
}
export interface Cliente {
  id: string;
  documento: string;
  nombre: string;
  email: string;
  celular: string;
  direccion: string;
  departamentoCod: number;
  departamentoNombre?: string;
  municipioCod: number;
  municipioNombre?: string;
  tipoClienteId: string;
  tipoName?: string;
}
export interface MedioNotificacion {
  medio?: string;
  codigo?: string;
  nombre?: string;
}

export interface GetPqr {
  id: string;
  clienteId: string;
  nombreCliente: string;
  documentoCliente: string;
  asunto: string;
  tipoPQRId: string;
  nombreTipoPQR: string;
  estado: string;
  usuarioId: string;
  nombreFuncionario: string;
  documentoFuncionario: string;
  consecutivo: number;
  radicado: string;
  origen: string;
  item: string;
  diasRestantes: number;
  estadoVencimiento: string;
  colorHex: string;
  fecha?: string;
}

export interface Adjunto {
  item: number;
  nombre: string;
  extension: string;
  urlArchivo: string;
}

export interface TipoPqr {
  id: string;
  nombre: string;
  dias: number;
  tipodias: string;
  estado: number;
}

export interface tipoCliente {
  id: string;
  nombre: string;
  estado: number;
}

export interface departamento {
  cod: number;
  nombre: string;
}

export interface Municipio {
  cod: number;
  nombre: string;
}

export interface ArchivoSubido {
  item: number;
  nombre: string;
  extension: string;
  urlArchivo: string;
}

export interface ApiResponse<T> {
  length?: number;
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface CrearPqrResponse {
  id: string;
  mensaje: string;
}

export interface Funcionario {
  id: string;
  documento: string;
  nombre: string;
  cargo: string;
  tipoUsuario: string;
  correo: string;
  celular: string;
}
export interface Detalle {
  item?: number;
  orden?: number;
  fechaCreacion?: string;
  nombreEvento?: string | undefined;
  descripcion?: string;
  codigoColorEstado?: string;
  tercero: Tercero;
  terceroAsignado: terceroAsignado;
  estado?: string;
  adjuntos: Adjunto[];
  notificado?: boolean;
  notificable?: boolean;
  fechaCreacionStr?: string;
  solicitudId?: number;
  estadoSolicitud?: string;
}
export interface Tercero {
  tipoTercero?: string;
  id?: string;
  nombre?: string;
  codigoColorFondo?: string;
  cargoTercero: string;
}
export interface terceroAsignado {
  tipoTercero?: string;
  id?: string;
  nombre?: string;
  image?: string;
  codigoColorFondo?: string;
  accion?: string;
  cargoTercero: string;
}

export interface Evento {
  id?: string;
  nombre?: string;
  accion?: string;
  obligandoAnexo?: boolean;
}
export interface UsuarioAsignar {
  id?: string;
  nombre?: string;
  tipoUsuNombre?: string;
}
export interface Usuario {
  id: string;
  documento: string;
  nombre: string;
  tipoUsuId?: string;
  tipoUsuNombre?: string;
  role?: string;
  email: string;
  celular: string;
  estado?: string;
  pqrResumen?: {
    [estado: string]: number; // Ejemplo: "VENCIDO": 44
  };
  password?: string;
  verifyPassword?: string;
  dependenciaId?: number | null;
  dependenciaNombre?: string;
  firma?: string;
}

export interface Dependencia {
  id: number;
  nombre: string;
  estado: boolean
}

export interface ParameterCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export interface ParametersProps {
  Editing?: boolean;
}

export interface Password {
  id: string;
  passwordAntigua: string;
  passwordNueva: string;
  passwordConfirmacion: string;
}

export interface UserType {
  id: string;
  nombre: string;
  role: string;
  estado?: number;
}

export interface DetallePqrCreate {
  pqrId: string;
  eventoId: string;
  descripcion: string;
  usuarioId: string;
  funcionarioAsignadoId: string | null;
  fechaCreacion: string;
  tipoNotificacion: string | null;
  fechaNotificacion: string | null;
  diasAmpliacion: number;
  adjuntos: Adjunto[];
}
export interface SolicitudRequisitoDTO {
  id: number;
  idTxt: string;
  diasVencidos: string;
  asunto: string;
  solicitanteNombre: string;
  solicitanteCargo: string;
  mensaje: string;
  fechaSolicitud: string; // ISO 8601 date string
  respuesta: string;
  fechaRespuesta: string | null;
  estado: string;
}

export interface PqrCount {
  estado: string;
  cantidad: number;
}

export interface DetalleVencimiento {
  estadoVencimiento: string;
  cantidad: number;
}

export interface EstadoFlujoData {
  estadoFlujo: string;
  total: number;
  detallesVencimiento: DetalleVencimiento[];
}

export interface Parameters {
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
}

export interface ValidationOtp {
  exito: boolean;
  mensaje: string;
}

export interface AlertaNotificacion {
  id: number;
  pqrId: string;
  asunto: string;
  consecutivo: number;
  nombre: string;
  tipoPQR: string;
  usuarioId: string;
  fechaCreacion: string;
  tipoAlerta: "Nuevo" | "Alerta" | string;
  mensaje: string;
  estado: string;
}
export interface NotificacionDetalle {
  idEnvio: number;
  tipo: string;
  destinatario: string;
  nombre: string;
  estado: string;
  fecha: string;
}

export interface EnviarNotificacion {
  pqrId: string;
  item: number;
  medio: string;
  destinatario: string;
  destinatarioDocumento: string;
  destinatarioNombre: string;
  destinatarioCalidad: string;
}
export interface DominioConstraint {
  constraintName: string;
  tableName: string;
  columnName: string;
  allowedValues: string[];
}

export interface PQRConsulta {
  id: string;
  numero: string;
  tipo: 'Peticion' | 'Queja' | 'Reclamo' | 'Sugerencia';
  ciudadano: {
    nombre: string;
    documento: string;
    telefono: string;
    email: string;
  };
  asunto: string;
  descripcion: string;
  fechaRadicacion: string;
  fechaVencimiento: string;
  estadoActual: EstadoPQRConsulta;
  dependenciaResponsable: string;
  funcionarioAsignado: string;
  historial: HistorialItemConsulta[];
  adjuntos?: string[];
}

export interface EstadoPQRConsulta {
  codigo: string;
  nombre: string;
  descripcion: string;
  color: string;
  icono: string;
}

export interface HistorialItemConsulta {
  id: string;
  fecha: string;
  hora: string;
  estado: string;
  descripcion: string;
  funcionario: string;
  dependencia: string;
  observaciones?: string;
  documentos?: string[];
}

export interface Templates {
  Id: string;
  NombreTipoPQR?: string | null;
  TipoPQRId: string;
  Subtipo?: string | null;
  PalabrasClave: string[];
  Normatividad: string;
  Observaciones: string;
  NombreDependencia?: string | null;
  DependenciaId: number | null;
  HtmlFile: string | null;
  PlantillaRespuestaHTML?: string | null;
}

export interface GetTemplates {
  id: string;
  nombreDependencia: string;
  nombreTipoPQR: string;
  observaciones: string;
  palabrasClave: string[];
}

export interface SolicitudFirmante{
  id: string;
  Nombre: string;
}
