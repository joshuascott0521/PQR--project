export interface CreatePqr {
  documentoCliente: string;
  nombreCliente: string;
  tipoClienteId: string;
  email: string;
  celular: string;
  direccion: string;
  departamentoCod: number;
  municipioCod: number;
  radicado?: string;
  fecha?: string;
  tipoPQRId: string;
  origen: string;
  asunto: string;
  descripcion: string;
  adjuntos: Adjunto[];
  usuarioId: string | null;
}

export interface Pqr {
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
  funcionario?: Funcionario;
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
  success: boolean;
  data: T;
  message?: string;
  error?: string;
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
  nombreEvento?: string;
  descripcion?: string;
  codigoColorEstado?: string;
  tercero: Tercero;
  estado?: string;
  adjuntos: Adjunto[];
}
export interface Tercero {
  tipoTercero?: string;
  id?: string;
  nombre?: string;
  codigoColorFondo?: string;
}

export interface Cliente {
  id: string,
  documento: string,
  nombre: string,
  email: string,
  celular: string,
  direccion: string,
  departamentoCod?: 0,
  municipioCod?: 0,
  tipoClienteId: string
  tiponame?: string
}