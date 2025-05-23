import UserCard from "../../components/shared/UserCard";

const PorVencer = () => {
  return (
    <div className="h-full w-full">
        <div className="flex mb-[15px] items-center gap-[15px]">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-xl font-bold text-white"></div>
          <div className="flex font-bold text-[33px]">
            <p>PQRS por vencer</p>
          </div>
        </div>

      {/* Contenido scrollable interno */}
      <div className="flex-1 overflow-auto bg-gray-100 px-6 py-4">
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
  );
};

export default PorVencer;
