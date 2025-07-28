import { useParams } from "react-router-dom";
import TemplateForm from "../../features/Parametros/Plantillas/PlantillasFrm";

const TemplateWrapper = () => {
    const { code } = useParams();

    const isEditing = !!code;

    return <TemplateForm Editing={isEditing} />;
};

export default TemplateWrapper;