import { useParams } from "react-router-dom";
import ParametrosFrm from "../features/Usuarios/ParametrosFrm";

const ParametrosDetalleWrapper = () => {
    const { code } = useParams();

    const isEditing = !!code;

    return <ParametrosFrm Editing={isEditing} />;
};

export default ParametrosDetalleWrapper;
