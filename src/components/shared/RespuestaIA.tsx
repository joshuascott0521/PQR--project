import {
  ArrowRight,
  Edit3,
  FileText,
  Sparkles,
  SquarePen,
  Stamp,
  X,
} from "lucide-react";
import { useState } from "react";

// Importaciones de Lexical
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

// Importaciones de Nodos de Lexical (CORREGIDO)
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

// Importaciones de Estilos y Plugins
import { css } from "@emotion/css";
import ToolbarPlugin from "../../Plugins/ToolbarPlugin";
import type { EditorThemeClasses } from "lexical";

interface ModalRespuestaIAProps {
  isOpen: boolean;
  onClose: () => void;
  numeroRadicado?: string;
}

const RespuestaIA = ({
  isOpen,
  onClose,
  numeroRadicado,
}: ModalRespuestaIAProps) => {
  const [ajusteIA, setAjusteIA] = useState("");
  const [, setModoEdicionManual] = useState(false);

  const theme: EditorThemeClasses = {
    ltr: css({ textAlign: "left" }),
    rtl: css({ textAlign: "right" }),
    paragraph: css({ margin: "0 0 1rem 0" }),
    quote: css({
      margin: "0 0 1rem 20px",
      borderLeft: "4px solid #ccc",
      paddingLeft: "16px",
    }),
    list: {
      nested: {
        listitem: css({ listStyleType: "disc" }),
      },
      ol: css({ paddingLeft: "2rem" }),
      ul: css({ paddingLeft: "2rem" }),
    },
    text: {
      bold: css({ fontWeight: "bold" }),
      italic: css({ fontStyle: "italic" }),
      underline: css({ textDecoration: "underline" }),
      strikethrough: css({ textDecoration: "line-through" }),
      underlineStrikethrough: css({
        textDecoration: "underline line-through",
      }),
      code: css({
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: "monospace",
        padding: "1px 4px",
        borderRadius: "4px",
      }),
      highlight: css({
        backgroundColor: "yellow",
      }),
      superscript: css({
        verticalAlign: "super",
        fontSize: "smaller",
      }),
      subscript: css({
        verticalAlign: "sub",
        fontSize: "smaller",
      }),
    },
    // Estilos para la alineación del texto
    align: {
      center: css({ textAlign: "center" }),
      right: css({ textAlign: "right" }),
      left: css({ textAlign: "left" }),
      justify: css({ textAlign: "justify" }),
    },
  };

  // CONFIGURACIÓN INICIAL CORREGIDA: Se eliminó TextFormatNode y se agregaron otros nodos útiles.
  const initialConfig = {
    namespace: "RespuestaIA-1",
    theme,
    onError: (error: Error) => {
      console.error("Error en el editor Lexical:", error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pt-[10px] pr-[7px] pb-[9px] pl-[20px] border-b bg-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 text-blue-800 rounded-sm flex items-center justify-center">
                <Sparkles />
              </div>
              <h2 className="text-base font-medium text-gray-800">
                Proyectar respuesta con agente IA - No. Radicado{" "}
                {numeroRadicado}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto bg-gray-100 flex-grow">
            {/* Asunto */}
            <div className="px-6 py-4">
              <div className="bg-white p-4 rounded-full">
                <span className="font-medium text-gray-800">Asunto: </span>
                <span className="text-gray-700">Solicitud para revisión </span>
                <span className="text-gray-500">
                  prueba para que me devuelvan el dinero porque me embargaron la
                  cuenta y ya había pagado el predio.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative flex justify-center gap-40 py-6">
              <div className=" left-0 right-0 h-0.5 bg-gray-300 z-0 mx-[346px] my-0 absolute top-[52px]" />
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Proyectar
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
                  <Edit3 className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Firmar
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
                  <Stamp className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Sellar
                </span>
              </div>
            </div>

            {/* Document Content */}
            <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <LexicalComposer initialConfig={initialConfig}>
                <div className="relative">
                  <ToolbarPlugin />
                  <hr />
                  <RichTextPlugin
                    contentEditable={
                      <div className="p-4">
                        <ContentEditable
                          className={css({
                            height: 500,
                            maxHeight: 500,
                            overflowY: "auto",
                            fontSize: "15px",
                            outline: "none",
                            resize: "none",
                          })}
                        />
                      </div>
                    }
                    // placeholder={
                    //   <div
                    //     className={css({
                    //       color: "#999",
                    //       overflow: "hidden",
                    //       position: "absolute",
                    //       textOverflow: "ellipsis",
                    //       top: "55px",
                    //       left: "16px",
                    //       fontSize: "15px",
                    //       userSelect: "none",
                    //       display: "inline-block",
                    //       pointerEvents: "none",
                    //     })}
                    //   >
                    //     Escribe aquí tu respuesta...
                    //   </div>
                    // }
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                </div>
              </LexicalComposer>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={ajusteIA}
                  onChange={(e) => setAjusteIA(e.target.value)}
                  placeholder="Añadir ajuste a la IA (ej.: 'Hazlo más formal', 'Agrega artículo de notificación electrónica')"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none h-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  Enviar
                </button>
                <button
                  onClick={() => {
                    setModoEdicionManual(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                  <SquarePen className="h-4 w-4" />
                  Editar manual
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespuestaIA;
