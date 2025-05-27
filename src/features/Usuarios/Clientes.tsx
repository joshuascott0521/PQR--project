import { FaUserCircle } from "react-icons/fa";
import ClienteCard from "../../components/shared/ClienteCard";

const Clientes = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-[15px]">
                <FaUserCircle className="text-[32px]" />
                <div className="flex font-bold text-[33px]">
                    <p>Clientes</p>
                </div>
            </div>
            <div className="flex overflow-auto bg-gray-100 px-6 py-4 rounded-lg">
                <ClienteCard />
            </div>
        </div>
    )
}

export default Clientes;