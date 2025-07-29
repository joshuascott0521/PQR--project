import React from 'react';
import type { PQRConsulta } from '../../interfaces/pqrInterfaces';
import {
    FileText,
    User,
    Calendar,
    Clock,
    Building,
    UserCheck,
    Flag,
    Phone,
    Mail,
    Paperclip
} from 'lucide-react';

interface PQRDetailsProps {
    pqr: PQRConsulta;
}

export const PQRDetails: React.FC<PQRDetailsProps> = ({ pqr }) => {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgente': return 'text-red-600 bg-red-50 border-red-200';
            case 'Alta': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'Media': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Baja': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case 'Peticion': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'Queja': return 'text-red-600 bg-red-50 border-red-200';
            case 'Reclamo': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'Sugerencia': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateDaysRemaining = (vencimiento: string) => {
        const today = new Date();
        const dueDate = new Date(vencimiento);
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysRemaining = calculateDaysRemaining(pqr.fechaVencimiento);

    return (
        <div className="space-y-6 border-blue-500">
            {/* Estado Actual */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Estado Actual</h2>
                    <div className={`px-4 py-2 rounded-full border ${pqr.estadoActual.color}`}>
                        <span className="font-medium">{pqr.estadoActual.nombre}</span>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 text-lg">{pqr.estadoActual.descripcion}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Vencimiento:</span>
                        <span className="font-medium">{formatDate(pqr.fechaVencimiento)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Días restantes:</span>
                        <span className={`font-medium ${daysRemaining < 5 ? 'text-red-600' : daysRemaining < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {daysRemaining > 0 ? `${daysRemaining} días` : `Vencido hace ${Math.abs(daysRemaining)} días`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Información General */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información General</h2>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Datos del PQR */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Datos del PQR</h3>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Número:</span>
                                    <p className="font-semibold text-lg">{pqr.numero}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Flag className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Tipo:</span>
                                    <div className={`inline-block px-3 py-1 rounded-full border text-sm font-medium mt-1 ${getTipoColor(pqr.tipo)}`}>
                                        {pqr.tipo}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Fecha de radicación:</span>
                                    <p className="font-medium">{formatDate(pqr.fechaRadicacion)}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Flag className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Prioridad:</span>
                                    <div className={`inline-block px-3 py-1 rounded-full border text-sm font-medium mt-1 ${getPriorityColor(pqr.prioridad)}`}>
                                        {pqr.prioridad}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Datos del Ciudadano */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Datos del Ciudadano</h3>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Nombre:</span>
                                    <p className="font-medium">{pqr.ciudadano.nombre}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Documento:</span>
                                    <p className="font-medium">{pqr.ciudadano.documento}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Teléfono:</span>
                                    <p className="font-medium">{pqr.ciudadano.telefono}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm text-gray-600">Email:</span>
                                    <p className="font-medium text-blue-600">{pqr.ciudadano.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asunto y Descripción */}
                <div className="mt-8 space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Asunto</h3>
                        <p className="text-gray-700 text-lg font-medium">{pqr.asunto}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed">{pqr.descripcion}</p>
                        </div>
                    </div>
                </div>

                {/* Responsable */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5 text-gray-500" />
                        <div>
                            <span className="text-sm text-gray-600">Dependencia responsable:</span>
                            <p className="font-medium">{pqr.dependenciaResponsable}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <UserCheck className="h-5 w-5 text-gray-500" />
                        <div>
                            <span className="text-sm text-gray-600">Funcionario asignado:</span>
                            <p className="font-medium">{pqr.funcionarioAsignado}</p>
                        </div>
                    </div>
                </div>

                {/* Adjuntos */}
                {pqr.adjuntos && pqr.adjuntos.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Documentos Adjuntos</h3>
                        <div className="space-y-2">
                            {pqr.adjuntos.map((archivo, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Paperclip className="h-5 w-5 text-gray-500" />
                                    <span className="text-gray-700">{archivo}</span>
                                    <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Descargar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};