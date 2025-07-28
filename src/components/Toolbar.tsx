import React from "react";
import "./Toolbar.css";
import { Editor } from "@tiptap/react";

type EditorState = {
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
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
  guardarContenido: () => void; // <- se ejecuta desde el botón guardar
  isEditable: boolean;
};

const Toolbar: React.FC<Props> = ({
  editor,
  editorState,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  //   toggleH1,
  //   toggleH2,
  //   toggleH3,
  toggleParrafo,
  toggleListaOrdenada,
  toggleListaPuntos,
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
        <select
          onChange={(e) => {
            (editor.chain() as any).focus().setFontSize(e.target.value).run();
          }}
          disabled={!isEditable}
          defaultValue=""
        >
          <option value="" disabled>
            Tamaño
          </option>
          <option value="12px">Pequeño</option>
          <option value="16px">Normal</option>
          <option value="20px">Grande</option>
          <option value="24px">Muy grande</option>
        </select>

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
