// src/Plugins/CapturePlugin.tsx

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useImperativeHandle, forwardRef } from "react";
import type { EditorState } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";

export interface CapturePluginApi {
  getEditorState: () => EditorState;
  getHtml: () => string; // getHtml debe devolver string, no ser opcional.
}

const CapturePlugin = forwardRef<CapturePluginApi, {}>((props, ref) => {
  const [editor] = useLexicalComposerContext();

  // Combina ambas definiciones en una SOLA llamada a useImperativeHandle
  useImperativeHandle(ref, () => ({
    getEditorState: () => editor.getEditorState(),
    getHtml: () => {
      const editorState = editor.getEditorState();
      let html = "";

      // Es crucial ejecutar la conversión dentro de un editor.read() o editor.update()
      editorState.read(() => {
        html = $generateHtmlFromNodes(editor, null);
      });

      return html;
    },
  }));

  return null;
});

export default CapturePlugin;
