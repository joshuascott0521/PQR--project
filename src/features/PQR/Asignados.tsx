import UserCard from "../../components/shared/UserCard";
import { AiOutlineFolderView } from "react-icons/ai";

const Asignado = () => {
    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex mb-[15px] items-center gap-[15px]">
                    <AiOutlineFolderView className="text-[32px]" />
                    <div className="flex font-bold text-[33px]">
                        <p>PQRS Asignados</p>
                    </div>
                </div>
                <div className="flex-1 overflow-auto bg-gray-100 px-6 py-4 rounded-lg">
                    <div className="space-y-4">
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Asignado;