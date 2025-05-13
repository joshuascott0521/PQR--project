import type { FC } from "react";
interface filterCardProps {
  colorHex: string;
  diasRestantes: number;
  consecutivo: number;
  asunto: string;
  radicado: string;
  documentoCliente: string;
  nombreCliente: string;
  estadoVencimiento: string;
}
const FilterCard: FC<filterCardProps> = ({
  colorHex,
  diasRestantes,
  consecutivo,
  asunto,
  radicado,
  documentoCliente,
  nombreCliente,
  estadoVencimiento,
}) => {
  return (
    <div className="flex justify-between h-24 w-full">
      <div className="flex justify-center items-center  w-32">
        <div
          style={{ backgroundColor: colorHex }}
          className="size-14  rounded-full flex justify-center items-center font-bold "
        >
          {diasRestantes}
        </div>
      </div>
      <div className="flex flex-col justify-center w-2/5">
        <div className="flex gap-2">
          <span className="font-bold">Consecutivo:</span>
          <p>{consecutivo}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Asunto:</span>
          <p>{asunto}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Radicado:</span>
          <p>{radicado}</p>
        </div>
      </div>
      <div className="flex w-2/5 flex-col justify-center">
        <div className="flex gap-2">
          <span className="font-bold">Documento:</span>
          <p>{documentoCliente}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Nombre:</span>
          <p>{nombreCliente}</p>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Estado de flujo:</span>
          <p>{estadoVencimiento}</p>
        </div>
        <div className="flex gap-2"></div>
      </div>
    </div>
  );
};

export default FilterCard;
