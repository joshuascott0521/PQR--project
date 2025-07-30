import React from 'react';
import type { HistorialItemConsulta } from '../../interfaces/pqrInterfaces';
import { 
  FileText, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Calendar,
  User
} from 'lucide-react';

interface TimelineProps {
  historial: HistorialItemConsulta[];
}

export const Timeline: React.FC<TimelineProps> = ({ historial }) => {
  const getIcon = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'radicado':
        return <FileText className="h-5 w-5" />;
      case 'asignado':
        return <UserCheck className="h-5 w-5" />;
      case 'en revisión':
      case 'en proceso':
        return <Clock className="h-5 w-5" />;
      case 'resuelto':
        return <CheckCircle className="h-5 w-5" />;
      case 'información adicional':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'radicado':
        return 'bg-gray-500 text-white';
      case 'asignado':
        return 'bg-yellow-500 text-white';
      case 'en revisión':
      case 'en proceso':
        return 'bg-blue-500 text-white';
      case 'resuelto':
        return 'bg-green-500 text-white';
      case 'información adicional':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  return (
    <div className="h-full bg-white rounded-xl shadow-lg p-5 ">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trazabilidad del PQR</h2>
      
      <div className="relative">
        {/* Línea vertical del timeline */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {historial.map((item) => (
            <div key={item.id} className="relative flex items-start space-x-4">
              {/* Icono del estado */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(item.estado)}`}>
                {getIcon(item.estado)}
              </div>
              
              {/* Contenido del timeline */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{item.estado}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(item.fecha)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(item.hora)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <span className="break-words">{item.descripcion}</span>

                  {/* Información del funcionario */}
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Funcionario:</span>
                      <span className="text-sm font-medium text-gray-900">{item.funcionario}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Dependencia:</span>
                      <span className="text-sm font-medium text-gray-900">{item.dependencia}</span>
                    </div>
                  </div>

                  {/* Observaciones */}
                  {item.observaciones && (
                    <div className="bg-white rounded-md p-3 mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Observaciones:</h4>
                      <p className="text-sm text-gray-700">{item.observaciones}</p>
                    </div>
                  )}

                  {/* Documentos */}
                  {item.documentos && item.documentos.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Documentos generados:</h4>
                      <div className="space-y-1">
                        {item.documentos.map((doc, docIndex) => (
                          <div key={docIndex} className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>Descargar</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};