import { useParams } from "react-router-dom";
import FuncionarioCreateEdit from "../features/Usuarios/EditCreateFuncionario";

const FuncionarioDetalleWrapper = () => {
    const { code } = useParams();

    const isEditing = !!code;

    return <FuncionarioCreateEdit Editing={isEditing} />;
};

export default FuncionarioDetalleWrapper;