//import { PiUserCircleFill } from "react-icons/pi";
import ClienteCard from "../../components/shared/ClienteCard";
import UserCard from "../../components/shared/UserCard";
import type { Pqr } from "../../interfaces/pqrInterfaces";



const ClienteDetalle = () => {
    const ejemplo: Pqr = {
        id: "1",
        clienteId: "C-001",
        tipoPQRId: "T-001",
        nombreTipoPQR: "Petición",
        usuarioId: "U-001",
        documentoFuncionario: "1122334455",
        radicado: "RAD-2025-001",
        origen: "Web",
        item: "Producto defectuoso",
        estadoVencimiento: "Por vencer",

        diasRestantes: 3,
        colorHex: "#f39c12",
        consecutivo: 22222,
        asunto: "Solicito cambio de producto",
        documentoCliente: "1098765432",
        nombreCliente: "Lucía Mendoza",
        fecha: "2025-05-27",
        nombreFuncionario: "Carlos Ramírez",
        estado: "Asignado"
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-[15px]">
                {/*<PiUserCircleFill size={40} color="#7bc9a3"/>*/}
                <div className="flex font-semibold text-[33px]">
                    <p>Cliente</p>
                </div>
            </div>

            <div className="">
                <ClienteCard mostrarEditar />
            </div>
            <div className="mt-1 font-bold text-lg">
                <p>PQR Asociados (3)</p>
            </div>
            <div className="flex flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg ">
                <UserCard pqr={ejemplo} />
                <UserCard pqr={ejemplo} />
                <UserCard pqr={ejemplo} />
                <UserCard pqr={ejemplo} />
                <UserCard pqr={ejemplo} />

            </div>
        </div>
    )
}

export default ClienteDetalle;