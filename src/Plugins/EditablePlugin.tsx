import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

interface EditablePluginProps {
  isEditable: boolean;
}

/**
 * Este plugin controla el estado de "solo lectura" del editor de Lexical.
 * Escucha los cambios en la prop `isEditable` y actualiza el editor.
 */
const EditablePlugin = ({ isEditable }: EditablePluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Sincroniza el estado de edición del editor con nuestro estado de React.
    editor.setEditable(isEditable);
  }, [editor, isEditable]);

  // Este componente no renderiza nada en el DOM.
  return null;
};

// Se cambia a una exportación por defecto para resolver el error de importación.
export default EditablePlugin;
