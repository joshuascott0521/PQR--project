import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";

interface InitialContentPluginProps {
  initialHtml: string;
}

/**
 * Este plugin carga contenido HTML en el editor de Lexical
 * cuando se inicializa por primera vez.
 */
const InitialContentPlugin = ({ initialHtml }: InitialContentPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Este efecto se ejecuta solo una vez, cuando el componente se monta.
    editor.update(() => {
      // 1. Crear un parser del DOM nativo del navegador.
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml.trim(), "text/html");

      // 2. Convertir los elementos del DOM a nodos de Lexical.
      const nodes = $generateNodesFromDOM(editor, dom);

      // 3. Limpiar el editor por si tuviera contenido previo.
      $getRoot().clear();

      // 4. Insertar los nuevos nodos en el editor.
      $insertNodes(nodes);
    });
  }, [editor, initialHtml]); // Se ejecuta si el editor o el HTML cambian

  // Este plugin no renderiza nada en la interfaz.
  return null;
};

export default InitialContentPlugin;
