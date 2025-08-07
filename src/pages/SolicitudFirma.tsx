import { useState, useRef } from "react";
import { showToast } from "../utils/toastUtils";

export default function SolicitudFirma() {
    const data = {
        solicitud: "20250010",
        fechaSolicitud: "10/01/2025 (15 días sin responder)",
        asunto: "Solicitud de firma para responder PQR No. 2024034434099",
        solicitante: "Maria Pérez Gonzalez",
        cargoSolicitante: "Abogada Secretaria Hacienda",
        descripcion: "Le solicito firmar la respuesta del PQR. No. 202506040301 con el Asunto: Solicitud de prescripcion. Para responder al cliente: Juan Perez Soto",
    }

    const [, setSelectedHtmlFile] = useState<File | null>(null);
    const [previewHtml, setPreviewHtml] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".html")) {
            showToast("Por favor selecciona un archivo HTML válido.", "error");
            return;
        }

        setSelectedHtmlFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const htmlContent = e.target?.result as string;
            setPreviewHtml(htmlContent); // 🔥 para mostrar vista previa en vivo
        };
        reader.readAsText(file);
    };

    return (
        <div className="w-full h-full min-h-screen overflow-x-hidden">
            <div className="block md:hidden relative w-full h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/Login44.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 h-full overflow-y-auto p-4">
                    <div className="bg-gray-50 rounded-lg shadow-lg p-4">
                        <div className="bg-gray-50 p-4 w-full flex flex-col overflow-hidden shadow-xl rounded-xl">
                            <div className="w-full mb-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-4 max-w-6xl mx-auto">
                                    <div className="relative flex justify-center mb-5">
                                        <div className="absolute left-[50px] top-[50%] mt-2 z-0 text-[8px] bg-yellow-200 rounded-full py-1 px-2 md:text-xs text-center">
                                            Alcaldía de Baranoa - NIT: 890.112.371
                                        </div>
                                        <div className="bg-yellow-400 text-black font-bold text-[10px] xl:text-xs px-6 md:px-8 py-2 rounded-full text-center whitespace-nowrap shadow">
                                            Sistema de Gestión de solicitudes PQR+
                                        </div>
                                    </div>
                                    <div className="flex justify-center md:justify-end">
                                        <img
                                            src="/Logo-static.png"
                                            alt="Logo Alcaldia"
                                            className="w-[220px] md:w-[300px] h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-center">
                                <div className="bg-white rounded-xl p-4 w-full max-w-4xl text-sm font-sans shadow">
                                    <div className="flex flex-wrap gap-2">
                                        <p>
                                            <span className="font-bold">No. de Solicitud: </span>
                                            {data.solicitud}
                                        </p>
                                        <p>
                                            <span className="font-bold">Fecha Solicitud: </span>
                                            {data.fechaSolicitud}
                                        </p>
                                        <p className="mt-2">
                                            <span className="font-bold">Asunto: </span>{" "}
                                            {data.asunto}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <p>
                                                <span className="font-bold">Solicitante:</span>{" "}
                                                {data.solicitante}
                                            </p>
                                            <p>
                                                <span className="font-bold">Cargo Solicitante:</span>{" "}
                                                {data.cargoSolicitante}
                                            </p>
                                        </div>
                                        <div className="">
                                            <span className="font-bold">Información Solicitada:</span>
                                            <div className="w-full mt-1 h-fit whitespace-pre-wrap text-black bg-white">
                                                {data.descripcion}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full max-w-4xl text-sm font-sans">
                                    <span className="font-bold">Respuesta para firmar</span>
                                    <div className="bg-gray-50 mt-1">
                                        <iframe
                                            title="Vista Previa respuesta"
                                            className="w-full min-h-[200px] border rounded"
                                            srcDoc={`
                                            <style>
                                                a {
                                                    pointer-events: none !important;
                                                    cursor: default !important;
                                                    text-decoration: none !important;
                                                    color: inherit !important;
                                                }
                                            </style>${previewHtml}`
                                            }
                                        />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept=".html"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-full hover:bg-red-800 bg-red-700 text-white flex justify-end"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Hola
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex w-full h-screen">
                <div className="w-1/2 h-full right-0 top-0 backdrop-blur-sm bg-image px-6 py-10 flex  z-10">
                    <div className="w-full flex flex-col">
                        <div className="flex flex-row items-center justify-between gap-2 px-4 max-w-6xl">
                            <div className="relative flex justify-center mb-5">
                                <div className="absolute left-[50px] top-[50%] mt-2 z-0 text-[8px] bg-yellow-200 rounded-full py-1 px-2 md:text-xs text-center">
                                    Alcaldía de Baranoa - NIT: 890.112.371
                                </div>
                                <div className="bg-yellow-400 text-black font-bold text-[10px] xl:text-xs px-6 md:px-8 py-2 rounded-full text-center whitespace-nowrap shadow">
                                    Sistema de Gestión de solicitudes PQR+
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <img
                                    src="/Static-new.png"
                                    alt="Logo Alcaldia"
                                    className="w-[300px] h-auto"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-5xl text-center mb-4 font-bold font-sans text-white">
                                Firmado Inteligente de Respuestas PQR+
                            </p>
                            <div className="bg-white/60 rounded-xl p-4 w-full max-w-4xl text-sm font-sans shadow">
                                <div className="flex flex-wrap gap-2">
                                    <p>
                                        <span className="font-bold">No. de Solicitud: </span>
                                        {data.solicitud}
                                    </p>
                                    <p>
                                        <span className="font-bold">Fecha Solicitud: </span>
                                        {data.fechaSolicitud}
                                    </p>
                                    <p>
                                        <span className="font-bold">Asunto: </span>{" "}
                                        {data.asunto}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <p>
                                            <span className="font-bold">Solicitante:</span>{" "}
                                            {data.solicitante}
                                        </p>
                                        <p>
                                            <span className="font-bold">Cargo Solicitante:</span>{" "}
                                            {data.cargoSolicitante}
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-col mt-2 p-2 rounded-md h-fit whitespace-pre-wrap text-black bg-white">
                                        <span className="font-bold">Información Solicitada:</span>
                                        {data.descripcion}
                                    </div>
                                </div>
                            </div>
                            <p className="text-lg mb-4 text-center text-white mt-3">
                                Transforma la gestión de solicitudes en una experiencia ágil y sin complicaciones.
                            </p>
                            <div className="w-16 h-[5px] bg-white mx-auto my-4"></div>
                            <input
                                type="button"
                                value="Conócenos"
                                onClick={() =>
                                    window.open("https://www.creapptech.com/", "_blank")
                                }
                                className="bg-emeraldBright rounded-3xl mb-10 w-36 h-8 text-white text-lg font-bold flex mx-auto cursor-pointer"
                            />
                            <p className="text-md px-2 text-center text-white">
                                © Creapptech S.A.S - Soluciones integrales basadas en tecnología.
                            </p>

                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-screen flex flex-col p-2 bg-gray-50">
                    <div className="flex-1 p-2 w-full max-w-4xl text-sm font-sans flex flex-col">
                        <span className="font-bold text-center">Respuesta para firmar</span>
                        <div className="bg-white mt-1 flex-1 p-4 border border-gray-300 rounded-xl">
                            <iframe
                                title="Vista Previa respuesta"
                                className="w-full h-full"
                                srcDoc={`<style>
                                            a {
                                            pointer-events: none !important;
                                            cursor: default !important;
                                            text-decoration: none !important;
                                            color: inherit !important;
                                            }
                                        </style>${previewHtml}`}
                            />
                        </div>
                    </div>

                    <input
                        type="file"
                        accept=".html"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-full mx-auto my-4 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Firmar
                    </button>
                </div>

            </div>
        </div>
    )
}