import type { FC } from "react";
import { FaRegUserCircle } from "react-icons/fa";

interface clienteCardProps {
  documento: string;
  nombre: string;
  direccion: string;
  tipoClienteId: string;
  correo: string;
  celular: string;
}

const ClienteCard: FC<clienteCardProps> = ({
  documento,
  nombre,
  direccion,
  tipoClienteId,
  correo,
  celular,
}) => {
  return (
    <div className="w-11/12 h-20 border-2 border-gray-200 rounded-lg bg-white mb-1">
      <div className="w-full h-full flex">
        <div className=" w-28 h-full flex justify-center items-center">
          <FaRegUserCircle size={50} color="green" />
        </div>
        <div className="w-full flex justify-between">
          <div className="w-96 flex flex-col justify-center">
            <div className="flex ">
              <span className="font-bold">Documento:</span> <p>{documento}</p>
            </div>
            <div className="flex">
              <span className="font-bold">Nombre:</span>
              <p>{nombre}</p>
            </div>
          </div>
          <div className=" w-96 flex flex-col justify-center">
            <div className="flex">
              <span className="font-bold">Direccion:</span> <p>{direccion}</p>
            </div>
            <div className="flex itemc">
              <div>
                <p className="font-bold">Tipo:{tipoClienteId}</p>
              </div>
              <div>
                <select name="" id="" className="rounded-lg">
                  <option value="">Contribuyente</option>
                  <option value="">Abogado</option>
                  <option value="">Contador</option>
                  <option value="">Ingeniero</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-96 flex flex-col justify-center">
            <div className="flex">
              <span className="font-bold">Correo:</span> <p>{celular}</p>
            </div>
            <div className="flex">
              <span className="font-bold">Celular:</span> <p>{correo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteCard;
