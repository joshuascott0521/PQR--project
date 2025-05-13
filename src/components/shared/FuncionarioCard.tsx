import { FC } from "react";
import { FcBusinesswoman } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { UsuarioEdit } from "../../interfaces/pqrInterfaces";
import useUsuario from "../../hooks/useUsuario";
import NewFuncionarioFrm from "../../features/Usuarios/NewFuncionarioFrm";
import { useNavigate } from "react-router-dom";
import usePqr from "../../hooks/usePqr";
import { useParams } from "react-router-dom";


interface FuncionarCardProps {
  id: string,
  role: string,
  documento: string,
  nombre: string,
  tipo: string, 
  email: string,
  celular: string,
  estado: string,
  tipoUsuarioNombre:string
}


const FuncionarioCard: FC<FuncionarCardProps> = ({ documento, nombre, tipo, email, celular, role, estado, id, tipoUsuarioNombre }) => {
  const navigate = useNavigate();

  const { setEditUser, setOpen, setEditandUsuario, editandoUsuario, open } = useUsuario();
  const { isInPqrAsociados } = usePqr();
  const editUser = (documento: string, nombre: string, tipo: string, celular: string, email: string, cargo: string) => {
    const userEdit: UsuarioEdit = {
      documento: documento,
      nombre: nombre,
      tipoUsuarioId: tipo,
      celular: celular,
      email: email,
      role: cargo,
      estado: estado,
      tipoUsuarioNombre: tipoUsuarioNombre,
      id: id,
    }
    setEditUser([userEdit]);
    setEditandUsuario(!editandoUsuario);
  }

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    editUser(documento, nombre, tipo, celular, email, role);
    setOpen(!open)
    setEditandUsuario(!editandoUsuario)
  }
  const viewPqrAsociados = () => {
    navigate(`/dashboard/user-pqr/${id}`);
  }


  return (
    <div className="w-full   h-20 border-2 border-gray-200 rounded-lg bg-white mb-1">
      {open ? <NewFuncionarioFrm /> :
        <div className="w-full h-full flex">
          <div className=" w-28 h-full flex justify-center items-center">
            <FcBusinesswoman size={50} color="green" />
          </div>
          <div className="w-full flex justify-between">
            <div className="w-96 flex flex-col justify-center">
              <div>
                <span className="font-bold">Documento: {documento}</span>
              </div>
              <div>
                <span className="font-bold" >Nombre: {nombre}</span>
              </div>
            </div>
            <div className=" w-96 flex flex-col justify-center">
              <div className="flex flex-col">
                <div className="flex ">
                  <span className="font-bold">Tipo:</span>
                  <p>{role}</p>
                </div>
                <div className="flex ">
                  <span className="font-bold">Cargo:</span>
                  <p>{tipoUsuarioNombre}</p>
                </div>
              </div>
            </div>
            <div className="w-96 flex flex-col justify-center">
              <div className="flex">
                <span className="font-bold">Correo:</span> <p>{email} </p>
              </div>
              <div className="flex">
                <span className="font-bold">Celular:</span> <p>{celular}</p>
              </div>
            </div>

            {isInPqrAsociados ? '' :
              <div className="w-36 flex justify-between items-center">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-[rgba(1,103,155,1)]  size-3/4 flex justify-center items-center rounded-full hover:cursor-pointer" onClick={viewPqrAsociados} >
                    <FaSearch width={100} color="white" />
                  </div>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-[rgba(254,182,0,255)]  size-3/4 flex justify-center items-center rounded-full hover:cursor-pointer" onClick={handleEdit}>
                    <FaEdit width={100} height={100} color="white" />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  );
};

export default FuncionarioCard;
