import { useParams } from "react-router-dom";
import GeneralFrm from "../../features/Parametros/General/GeneralFrm";

const GeneralWrapper = () => {
    const { code } = useParams();

    const isEditing = !!code;

    return <GeneralFrm Editing={isEditing} />;
};

export default GeneralWrapper;