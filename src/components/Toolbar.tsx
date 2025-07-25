import React from "react";
import "./Toolbar.css";
import { Editor } from "@tiptap/react";

type EditorState = {
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isCodeBlock?: boolean;
  isHeading1?: boolean;
  isHeading2?: boolean;
  isHeading3?: boolean;
  isOrderedList?: boolean;
  isBulletList?: boolean;
  isLink?: boolean;
};

type Props = {
  editor: Editor;
  editorState: EditorState;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  toggleCodeBlock: () => void;
  toggleH1: () => void;
  toggleH2: () => void;
  toggleH3: () => void;
  toggleParrafo: () => void;
  toggleListaOrdenada: () => void;
  toggleListaPuntos: () => void;
  agregarLink: () => void;
  guardarContenido: () => void; // <- se ejecuta desde el botón guardar
  isEditable: boolean;
};

const Toolbar: React.FC<Props> = ({
  editor,
  editorState,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  toggleCodeBlock,
  toggleH1,
  toggleH2,
  toggleH3,
  toggleParrafo,
  toggleListaOrdenada,
  toggleListaPuntos,
  agregarLink,
  guardarContenido,
  isEditable,
}) => {
  if (!editor) return null;

  return (
    <nav className="toolbar">
      <div className="left">
        <button
          onClick={toggleBold}
          disabled={!isEditable}
          className={editorState.isBold ? "active" : ""}
        >
          B
        </button>
        <button
          onClick={toggleItalic}
          disabled={!isEditable}
          className={editorState.isItalic ? "active" : ""}
        >
          I
        </button>
        <button
          onClick={toggleUnderline}
          disabled={!isEditable}
          className={editorState.isUnderline ? "active" : ""}
        >
          U
        </button>
        <button
          onClick={toggleCodeBlock}
          disabled={!isEditable}
          className={editorState.isCodeBlock ? "active" : ""}
        >
          {"<>"}
        </button>
        <button
          onClick={toggleH1}
          disabled={!isEditable}
          className={editorState.isHeading1 ? "active" : ""}
        >
          H1
        </button>
        <button
          onClick={toggleH2}
          disabled={!isEditable}
          className={editorState.isHeading2 ? "active" : ""}
        >
          H2
        </button>
        <button
          onClick={toggleH3}
          disabled={!isEditable}
          className={editorState.isHeading3 ? "active" : ""}
        >
          H3
        </button>
        <button
          onClick={toggleParrafo}
          disabled={!isEditable}
          className={editor.isActive("paragraph") ? "active" : ""}
        >
          P
        </button>
        <button
          onClick={toggleListaOrdenada}
          disabled={!isEditable}
          className={editorState.isOrderedList ? "active" : ""}
        >
          OL
        </button>
        <button
          onClick={toggleListaPuntos}
          disabled={!isEditable}
          className={editorState.isBulletList ? "active" : ""}
        >
          UL
        </button>

        <button
          onClick={agregarLink}
          disabled={!isEditable}
          className={editorState.isLink ? "active" : ""}
        >
          🔗
        </button>
      </div>

      <div className="right">
        <button
          onClick={guardarContenido}
          className="btnGuardar"
          disabled={!isEditable}
        >
          <span>Guardar</span>
        </button>
      </div>
    </nav>
  );
};

export default Toolbar;
