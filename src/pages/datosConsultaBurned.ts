import type { PQRConsulta } from "../interfaces/pqrInterfaces";

export const datosConsultaBurned: { [key: string]: PQRConsulta } = {
  'PQR-2024-001234': {
    id: '1',
    numero: 'PQR-2024-001234',
    tipo: 'Peticion',
    ciudadano: {
      nombre: 'María Alejandra González Rodríguez',
      documento: '1234567890',
      telefono: '+57 300 123 4567',
      email: 'maria.gonzalez@email.com'
    },
    asunto: 'Solicitud de información sobre trámites de licencia de construcción',
    descripcion: 'Solicito información detallada sobre los requisitos, documentos necesarios y tiempos de respuesta para obtener una licencia de construcción para vivienda unifamiliar en zona residencial.',
    fechaRadicacion: '2024-01-15',
    fechaVencimiento: '2024-02-14',
    estadoActual: {
      codigo: 'EN_PROCESO',
      nombre: 'En Proceso',
      descripcion: 'Su solicitud está siendo revisada por el área competente',
      color: 'text-blue-600 bg-blue-50',
      icono: 'Clock'
    },
    dependenciaResponsable: 'Secretaría de Planeación Municipal',
    funcionarioAsignado: 'Ing. Carlos Alberto Mendoza',
    historial: [
      {
        id: '1',
        fecha: '2024-01-15',
        hora: '09:30',
        estado: 'Radicado',
        descripcion: 'PQR radicada exitosamente en el sistema',
        funcionario: 'Sistema Automático',
        dependencia: 'Mesa de Ayuda',
        observaciones: 'Solicitud recibida y asignado número de radicado'
      },
      {
        id: '2',
        fecha: '2024-01-16',
        hora: '14:15',
        estado: 'Asignado',
        descripcion: 'PQR asignada a dependencia competente',
        funcionario: 'Ana María Castillo',
        dependencia: 'Oficina de Atención al Ciudadano',
        observaciones: 'Asignada a Secretaría de Planeación por competencia en licencias'
      },
      {
        id: '3',
        fecha: '2024-01-18',
        hora: '10:45',
        estado: 'En Revisión',
        descripcion: 'Inicio de revisión técnica de la solicitud',
        funcionario: 'Ing. Carlos Alberto Mendoza',
        dependencia: 'Secretaría de Planeación Municipal',
        observaciones: 'Se inicia revisión de documentación y análisis de requisitos'
      },
      {
        id: '4',
        fecha: '2024-01-22',
        hora: '16:20',
        estado: 'Información Adicional',
        descripcion: 'Se solicita información complementaria al ciudadano',
        funcionario: 'Ing. Carlos Alberto Mendoza',
        dependencia: 'Secretaría de Planeación Municipal',
        observaciones: 'Se envía comunicación solicitando planos actualizados del predio',
        documentos: ['Oficio-001-2024.pdf']
      },
      {
        id: '5',
        fecha: '2024-01-25',
        hora: '11:30',
        estado: 'En Proceso',
        descripcion: 'Ciudadano aporta información solicitada',
        funcionario: 'Sistema Automático',
        dependencia: 'Mesa de Ayuda',
        observaciones: 'Se reciben planos actualizados y documentos complementarios'
      }
    ],
    adjuntos: ['solicitud-inicial.pdf', 'cedula-ciudadano.pdf']
  },
  '1234567890': {
    id: '1',
    numero: 'PQR-2024-001234',
    tipo: 'Peticion',
    ciudadano: {
      nombre: 'María Alejandra González Rodríguez',
      documento: '1234567890',
      telefono: '+57 300 123 4567',
      email: 'maria.gonzalez@email.com'
    },
    asunto: 'Solicitud de información sobre trámites de licencia de construcción',
    descripcion: 'Solicito información detallada sobre los requisitos, documentos necesarios y tiempos de respuesta para obtener una licencia de construcción para vivienda unifamiliar en zona residencial.',
    fechaRadicacion: '2024-01-15',
    fechaVencimiento: '2024-02-14',
    estadoActual: {
      codigo: 'EN_PROCESO',
      nombre: 'En Proceso',
      descripcion: 'Su solicitud está siendo revisada por el área competente',
      color: 'text-blue-600 bg-blue-50',
      icono: 'Clock'
    },
    dependenciaResponsable: 'Secretaría de Planeación Municipal',
    funcionarioAsignado: 'Ing. Carlos Alberto Mendoza',
    historial: [
      {
        id: '1',
        fecha: '2024-01-15',
        hora: '09:30',
        estado: 'Radicado',
        descripcion: 'PQR radicada exitosamente en el sistema',
        funcionario: 'Sistema Automático',
        dependencia: 'Mesa de Ayuda',
        observaciones: 'Solicitud recibida y asignado número de radicado'
      },
      {
        id: '2',
        fecha: '2024-01-16',
        hora: '14:15',
        estado: 'Asignado',
        descripcion: 'PQR asignada a dependencia competente',
        funcionario: 'Ana María Castillo',
        dependencia: 'Oficina de Atención al Ciudadano',
        observaciones: 'Asignada a Secretaría de Planeación por competencia en licencias'
      },
      {
        id: '3',
        fecha: '2024-01-18',
        hora: '10:45',
        estado: 'En Revisión',
        descripcion: 'Inicio de revisión técnica de la solicitud',
        funcionario: 'Ing. Carlos Alberto Mendoza',
        dependencia: 'Secretaría de Planeación Municipal',
        observaciones: 'Se inicia revisión de documentación y análisis de requisitos'
      },
      {
        id: '4',
        fecha: '2024-01-22',
        hora: '16:20',
        estado: 'Información Adicional',
        descripcion: 'Se solicita información complementaria al ciudadano',
        funcionario: 'Ing. Carlos Alberto Mendoza',
        dependencia: 'Secretaría de Planeación Municipal',
        observaciones: 'Se envía comunicación solicitando planos actualizados del predio',
        documentos: ['Oficio-001-2024.pdf']
      },
      {
        id: '5',
        fecha: '2024-01-25',
        hora: '11:30',
        estado: 'En Proceso',
        descripcion: 'Ciudadano aporta información solicitada',
        funcionario: 'Sistema Automático',
        dependencia: 'Mesa de Ayuda',
        observaciones: 'Se reciben planos actualizados y documentos complementarios'
      }
    ],
    adjuntos: ['solicitud-inicial.pdf', 'cedula-ciudadano.pdf']
  }
};

export const estadosPQR = {
  RADICADO: {
    codigo: 'RADICADO',
    nombre: 'Radicado',
    descripcion: 'Su PQR ha sido registrada exitosamente',
    color: 'text-gray-600 bg-gray-50',
    icono: 'FileText'
  },
  ASIGNADO: {
    codigo: 'ASIGNADO',
    nombre: 'Asignado',
    descripcion: 'Su PQR ha sido asignada a la dependencia competente',
    color: 'text-yellow-600 bg-yellow-50',
    icono: 'UserCheck'
  },
  EN_PROCESO: {
    codigo: 'EN_PROCESO',
    nombre: 'En Proceso',
    descripcion: 'Su solicitud está siendo revisada por el área competente',
    color: 'text-blue-600 bg-blue-50',
    icono: 'Clock'
  },
  RESUELTO: {
    codigo: 'RESUELTO',
    nombre: 'Resuelto',
    descripcion: 'Su PQR ha sido resuelta satisfactoriamente',
    color: 'text-green-600 bg-green-50',
    icono: 'CheckCircle'
  },
  CERRADO: {
    codigo: 'CERRADO',
    nombre: 'Cerrado',
    descripcion: 'Su PQR ha sido cerrada',
    color: 'text-gray-600 bg-gray-50',
    icono: 'XCircle'
  }
};