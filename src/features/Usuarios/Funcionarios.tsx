import { useEffect, useState } from "react";
import FuncionarioCard from "../../components/shared/FuncionarioCard";
import type { Usuario } from "../../interfaces/pqrInterfaces";
import { UsersServices } from "../../services/pqrServices";
import { ShieldUser } from "lucide-react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Funcionarios = () => {

    const [funcionarios, setFuncionarios] = useState<Usuario[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const funcionarioRes = await UsersServices.getAll();
                if (!funcionarioRes.success) throw new Error(funcionarioRes.error)

                setFuncionarios(funcionarioRes.data)


            } catch (error) {
                console.error(error)
            }
        }
        fetchFuncionarios();
    }, [])

    const handleNew = () => {
        navigate(`/dashboard/admin/funcionario/crear`);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-row mb-[15px] items-center gap-[15px]">
                <ShieldUser size={35} />
                <div className="flex font-bold text-[33px]">
                    <p>Funcionarios</p>
                </div>
                <div className="flex flex-1 justify-end">
                    <button
                        className="bg-green-500 hover:bg-green-600 mt-2 px-4 sm:px-4 py-1 rounded-lg text-white text-sm sm:text-md font-semibold flex items-center gap-2"
                        onClick={handleNew}
                    >
                        <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
                        <span>Nuevo Funcionario</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
                {funcionarios.map((funcionario) => (
                    <FuncionarioCard key={funcionario.id} funcionario={funcionario} />
                ))}
            </div>
        </div>
    )
}

export default Funcionarios;