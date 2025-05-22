import UserCard from "../../components/shared/UserCard";

const Vencidos = () => {
  return (
    <>
      <div className="h-full w-full">
        <div className="flex mb-[15px] items-center gap-[15px]">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white"></div>
          <div className="flex font-bold text-[33px]">
            <p>PQRS por vencidos</p>
          </div>
        </div>
        <div className="flex justify-center bg-gray-100 p-4 flex-col max-h-[620px]  overflow-auto h-full">
          <div className="mt-5 h-full">
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
  );
};
export default Vencidos;
