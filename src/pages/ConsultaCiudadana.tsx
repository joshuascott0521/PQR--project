import { useState } from "react";
import type { PQRConsulta } from "../interfaces/pqrInterfaces";
import { datosConsultaBurned } from "./datosConsultaBurned";
import { BusquedaCiudadana } from "../components/shared/BusquedaCiudadana";
import { PQRDetails } from "../components/shared/PQRDetails";
import { Timeline } from "../components/shared/Timeline";
import { ArrowLeft } from "lucide-react";


export default function ConsultaCiudadana() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pqrData, setPqrData] = useState<PQRConsulta | null>(null);

    const handleSearch = async (query: string, type: 'pqr' | 'documento') => {
        setLoading(true);
        setError(null);
        setPqrData(null);

        // Simular tiempo de carga
        await new Promise(resolve => setTimeout(resolve, 1500));

        const normalizedQuery = query.toUpperCase();
        const found = datosConsultaBurned[normalizedQuery] || datosConsultaBurned[query];

        if (found) {
            setPqrData(found);
        } else {
            setError(
                type === 'pqr'
                    ? 'No se encontró ningún PQR con el número ingresado. Verifique el número e intente nuevamente.'
                    : 'No se encontraron PQR asociados al documento ingresado. Verifique el número de documento e intente nuevamente.'
            );
        }

        setLoading(false);
    };

    const handleNewSearch = () => {
        setPqrData(null);
        setError(null);
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl px-3 py-4">
                    <div className="flex items-center justify-between">
                        <div className="w-full max-w-[400px]">
                            <img src="/public/Logo-static.png" alt="Logo" className='bg-a-baranoa' />
                        </div>
                        {pqrData && (
                            <button
                                onClick={handleNewSearch}
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span>Nueva consulta</span>
                            </button>
                        )}
                    </div>

                </div>
            </header>
            <div className="max-w-7xl mx-auto px-4  py-8">
                {!pqrData ? (
                    <BusquedaCiudadana
                        onSearch={handleSearch}
                        loading={loading}
                        error={error}
                    />
                ) : (
                    <div className="space-y-8">
                        {/* Información del PQR */}
                        <PQRDetails pqr={pqrData} />

                        {/* Timeline */}
                        <Timeline historial={pqrData.historial} />
                    </div>
                )}
            </div>
        </div>
    )
}

