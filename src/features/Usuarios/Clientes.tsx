import { PiUserCircleFill } from "react-icons/pi";
import ClienteCard from "../../components/shared/ClienteCard";

const Clientes = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-[15px]">
                <PiUserCircleFill size={40} />
                <div className="flex font-bold text-[33px]">
                    <p>Clientes</p>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
                <ClienteCard  />
                <ClienteCard  />
                <ClienteCard  />
                <ClienteCard  />
                <ClienteCard  />
                <ClienteCard  />
            </div>
        </div>
    )
}

export default Clientes;