import { Paperclip, X } from "lucide-react";

export default function SolicitudFrm() {
    const archivos = [
        "Ejemplo de nombre cualquiera de archivo.pdf",
        "Ejemplo de nombre cualquiera de archivo.pdf",
    ];

    return (
        <div className="bg-white p-4 w-full flex flex-col overflow-hidden">
            {/* Encabezado */}
            {/* Encabezado */}
            <div className="w-full mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-4 max-w-6xl mx-auto">
                    {/* Banner + NIT */}
                    <div className="relative flex justify-center mb-5">
                        {/* Texto de fondo (NIT) */}
                        <div className="absolute left-[50px] top-[50%] mt-2 z-0 text-[8px] bg-yellow-200 rounded-full py-1 px-2 text-black md:text-xs text-center">
                            Alcaldía de Baranoa - NIT: 890.112.371
                        </div>

                        {/* Banner principal */}
                        <div className="bg-yellow-400 rounded-full px-6 py-2 mb-2 text-black text-[10px] md:text-xs font-bold text-center relative z-10 shadow">
                            Sistema de Gestión de solicitudes PQR+
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            className="w-[220px] md:w-[300px] h-auto"
                            src="/public/Logo-static.png"
                            alt="Logo"
                        />
                    </div>
                </div>
            </div>





            {/* Contenido desplazable */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 items-center">
                {/* Información de la solicitud */}
                <div className="border border-gray-300 rounded-md p-4 w-full max-w-4xl text-sm font-sans">
                    <div className="flex flex-wrap gap-4">
                        <p><span className="font-bold">No. de Solicitud:</span> 2025-0010</p>
                        <p>
                            <span className="font-bold">Fecha Solicitud:</span> 10/01/2025{" "}
                            <span className="text-red-600 font-semibold">(15 días sin responder)</span>
                        </p>
                    </div>
                    <p className="mt-2">
                        <span className="font-bold">Asunto:</span> Solicitud de información para responder PQR No. 2024034434099
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2">
                        <p><span className="font-bold">Solicitante:</span> Maria Pérez Gonzalez</p>
                        <p><span className="font-bold">Cargo Solicitante:</span> Abogada Secretaria Hacienda</p>
                    </div>
                    <div className="mt-4">
                        <div className="w-full max-h-[120px] border border-gray-300 rounded-lg p-3 overflow-y-auto whitespace-pre-wrap text-black bg-white">
                            Buenas tardes<br />
                            Sr. Contador<br />
                            Le solicito listado de ingresos de predial vigencia 2025 del contribuyente x
                        </div>
                    </div>
                </div>

                {/* Respuesta */}
                <div className="border border-gray-300 rounded-md p-4 w-full max-w-4xl text-sm font-sans">
                    <p className="font-bold mb-2">Responder</p>

                    <textarea
                        id="respuesta"
                        placeholder="Responda a la solicitud"
                        className="w-full border border-gray-300 rounded-md p-2 h-[120px] resize-none"
                    ></textarea>

                    <div className="mt-4 mb-2">
                        <button className="flex items-center gap-2 bg-emerald-300 text-white px-4 py-1 rounded-full font-medium">
                            <Paperclip size={18} />
                            <span className="text-black">Subir archivos</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        {archivos.map((archivo, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 rounded-full px-4 py-1 flex justify-between items-center text-sm"
                            >
                                <span className="truncate">{archivo}</span>
                                <button className="ml-2 text-black hover:text-red-600">
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
