import { FaEdit } from "react-icons/fa";
import ClienteForm from "../../components/shared/EditarClientefrm";


const EditarCliente = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-[15px]">
                <FaEdit size={40} />
                <div className="flex font-bold text-[33px]">
                    <p>Editar Cliente</p>
                </div>
            </div>
            <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4 relative">
                <ClienteForm />
            </div>

        </div>
    )
}

export default EditarCliente;