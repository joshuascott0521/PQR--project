import UserCard from "../../components/shared/UserCard";
import { CiCircleCheck } from "react-icons/ci";

const Finalizado = () => {
    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex mb-[15px] items-center gap-[15px]">
                    <CiCircleCheck className="text-[32px]" />
                    <div className="flex font-bold text-[33px]">
                        <p>PQRS Finalizados</p>
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

export default Finalizado;