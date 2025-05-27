import { PiUserCircleFill } from "react-icons/pi";


const ClienteCard = () => {
  return (
    <div className="space-y-4 bg-white p-4  rounded-lg shadow-md border-gray-200 flex items-center gap-6 sm:p-6">
      <div className="flex-shrink-0">
        <PiUserCircleFill  size={50} color="#7bc9a3" />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-y-1 text-gray-700 text-sm items-center gap-2.5">
        <div className="flex">
          
        </div>
      </div>
    </div>
  );
};

export default ClienteCard;
