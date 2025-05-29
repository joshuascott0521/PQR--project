import { useEffect, useState } from "react";
import FuncionarioCard from "../../components/shared/FuncionarioCard";
import type { Usuario } from "../../interfaces/pqrInterfaces";
import { UsersServices } from "../../services/pqrServices";

const Funcionarios = () => {

    const [funcionarios, setFuncionarios] = useState<Usuario[]>([])

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const funcionarioRes = await UsersServices.getAll();
                if (!funcionarioRes.success) throw new Error(funcionarioRes.error)

                setFuncionarios(funcionarioRes.data)


            } catch (error) {
                console.error(error)
            }
        }
        fetchClients();
    }, [])

    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-[15px]">
                <div className="flex font-bold text-[33px]">
                    <p>Funcionarios</p>
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