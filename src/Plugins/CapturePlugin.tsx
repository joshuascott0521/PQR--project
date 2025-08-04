import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useImperativeHandle, forwardRef } from "react";
import type { EditorState } from "lexical";

/**
 * Define la forma de la ref que se expondrá al componente padre.
 */
export interface CapturePluginApi {
  getEditorState: () => EditorState;
}

/**
 * Plugin que expone una API para capturar el estado del editor.
 */
const CapturePlugin = forwardRef<CapturePluginApi, {}>((props, ref) => {
  const [editor] = useLexicalComposerContext();

  // Expone la función getEditorState a través de la ref.
  useImperativeHandle(ref, () => ({
    getEditorState: () => {
      return editor.getEditorState();
    },
  }));

  return null;
});

export default CapturePlugin;
