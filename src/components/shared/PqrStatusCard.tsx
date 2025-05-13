import type { FC } from "react";

interface PqrStatusCardProps {
  nombrePqr: string;
  color: string;
  statusQ: {
    registrados: number;
    vencidos: number;
    porVencer: number;
    aTiempo: number;
  };
}

const PqrStatusCard: FC<PqrStatusCardProps> = ({ nombrePqr, statusQ }) => {
  const { registrados, porVencer, vencidos, aTiempo } = statusQ;

  return (
    <div
      className={`w-fit h-32  rounded-lg shadow-md p-4 flex flex-col justify-evenly mt-5 bg-gray-200`}
    >
      <h2 className="text-lg font-bold text-black">{nombrePqr}</h2>
      <div className="flex justify-center">
        <div className="flex gap-4">
          <div className="size-12 rounded-full bg-red-500 text-white flex justify-center items-center">
            {registrados}
          </div>
          <div className="size-12 rounded-full bg-red-500 text-white flex justify-center items-center">
            {vencidos}
          </div>
          <div className="size-12 rounded-full bg-yellow-400 text-white flex justify-center items-center">
            {porVencer}
          </div>
          <div className="size-12 rounded-full bg-green-500 text-white flex justify-center items-center">
            {aTiempo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PqrStatusCard;
