import UserCard from "../../components/shared/UserCard";
import { CgSandClock } from "react-icons/cg";

const EnEspera = () => {
    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex mb-[15px] items-center gap-[15px]">
                    <CgSandClock className="text-[32px]" />
                    <div className="flex font-bold text-[33px]">
                        <p>PQRS En Espera</p>
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

export default EnEspera;