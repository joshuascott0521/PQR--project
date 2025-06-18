import AsignadosCard from "../../components/shared/AsginadosCard";
import DonutGraphic from "../../components/shared/DonutGraphic";
import Grafico from "../../components/shared/LinearGraphic";
import PolarGraphic from "../../components/shared/PolarGraphic";

const Metricas = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-x-5">
                <div className="font-bold  text-2xl">
                    <p>Inicio</p>
                </div>
            </div>
            <div className="flex flex-wrap justify-center 2xl:gap-6 xl:gap-4 ">
                <AsignadosCard
                    titulo="Registrados"
                    total={6}
                    estados={[
                        { valor: 2, colorClass: "bg-red-600" },
                        { valor: 1, colorClass: "bg-yellow-300" },
                        { valor: 3, colorClass: "bg-green-500" },
                    ]}
                    fondo="registrado"
                />
                <AsignadosCard
                    titulo="Asignados"
                    total={6}
                    estados={[
                        { valor: 2, colorClass: "bg-red-600" },
                        { valor: 1, colorClass: "bg-yellow-300" },
                        { valor: 3, colorClass: "bg-green-500" },
                    ]}
                    fondo="asignado"
                />
                <AsignadosCard
                    titulo="En proceso"
                    total={6}
                    estados={[
                        { valor: 2, colorClass: "bg-red-600" },
                        { valor: 1, colorClass: "bg-yellow-300" },
                        { valor: 3, colorClass: "bg-green-500" },
                    ]}
                    fondo="proceso"
                />
                <AsignadosCard
                    titulo="En espera"
                    total={6}
                    estados={[
                        { valor: 2, colorClass: "bg-red-600" },
                        { valor: 1, colorClass: "bg-yellow-300" },
                        { valor: 3, colorClass: "bg-green-500" },
                    ]}
                    fondo="espera"
                />
                <AsignadosCard
                    titulo="Finalizados"
                    total={6}
                    estados={[
                        { valor: 2, colorClass: "bg-red-600" },
                        { valor: 1, colorClass: "bg-yellow-300" },
                        { valor: 3, colorClass: "bg-green-500" },
                    ]}
                    fondo="finalizado"
                />
                <AsignadosCard
                    titulo="Anulados"
                    total={6}
                    estados={[
                        { valor: 2, colorClass: "bg-red-600" },
                        { valor: 1, colorClass: "bg-yellow-300" },
                        { valor: 3, colorClass: "bg-green-500" },
                    ]}
                    fondo="anulado"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-3">
                <div className="bg-white rounded-xl shadow-md p-4 flex justify-center items-center min-h-[300px]">
                    <Grafico />
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 flex justify-center items-center min-h-[300px]">
                    <DonutGraphic />
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 flex justify-center items-center min-h-[300px] max-h-[450px]  mb-2">
                    <PolarGraphic />
                </div>
            </div>

        </div>
    )
}

export default Metricas;