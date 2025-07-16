import ClienteCard from "../../components/shared/ClienteCard";
import { useEffect, useState } from "react";
import type { Cliente } from "../../interfaces/pqrInterfaces";
import {
  ClientesServices,
  TipoClienteServices,
} from "../../services/pqrServices";
import { Users } from "lucide-react";

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientRes = await ClientesServices.getAll();
        if (!clientRes.success) throw new Error(clientRes.error);

        const tipoClienteRes = await TipoClienteServices.getall();
        if (!tipoClienteRes.success) throw new Error(tipoClienteRes.error);

        const enrichedClientes = clientRes.data.map((cliente: Cliente) => {
          const tipo = tipoClienteRes.data.find(
            (type: any) => type.id === cliente.tipoClienteId
          );
          return {
            ...cliente,
            tiponame: tipo?.nombre || "Sin tipo",
          };
        });

        setClientes(enrichedClientes);
        console.log(enrichedClientes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-[15px] items-center gap-[15px]">
        <Users size={30} />
        <div className="flex font-bold text-[33px]">
          <p>Clientes</p>
        </div>
      </div>
      <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
        {clientes.map((client) => (
          <ClienteCard key={client.id} cliente={client} />
        ))}
      </div>
    </div>
  );
};

export default Clientes;
