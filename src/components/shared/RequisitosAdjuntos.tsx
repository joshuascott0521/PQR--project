import { AlertTriangle } from "lucide-react";

export default function RequisitosAdjuntos() {
    return (
        <div className="flex items-start bg-yellow-100 p-4 rounded-lg border border-yellow-400 mb-1">
            <AlertTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" size={24} />
            <div className="text-xs text-gray-800">
                <p className="mb-2">
                    <strong>Los documentos que debe anexar a la petición son los siguientes</strong>, recuerde que puede anexar un máximo de <strong>5 archivos por solicitud</strong>:
                </p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Documento de Identidad</li>
                    <li>Solicitud, derecho de petición, oficio, queja (Adjuntado)</li>
                    <li>Copia de las pruebas (Recibos, soportes de pago, paz y salvo, etc.)</li>
                    <li>Si va en representación de una persona Jurídica RUT.</li>
                    <li>Si es un apoderado, poder firmado.</li>
                </ul>
                <p className="mb-1">
                    El peso de cada archivo <strong>no</strong> debe exceder <strong>5MB</strong>
                </p>
            </div>
            
        </div>
    );
}