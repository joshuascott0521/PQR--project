import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  ArrowRight,
  Edit3,
  FileText,
  Sparkles,
  SquarePen,
  Stamp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Toolbar from "../Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { cn } from "../../libs/utils";

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
  const [modoEdicionManual, setModoEdicionManual] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: `
    <div style="padding: 2rem;">
  <div  style="outline: none; border: 1px solid #60a5fa; border-radius: 0.375rem; padding: 0.5rem;">
    
    <!-- Header -->
    <div style="display: flex; align-items: flex-start; gap: 1.5rem; margin-bottom: 2rem;">
      <div style="flex-shrink: 0;"></div>
      <div style="padding-top: 0.5rem;">
        <h3 style="font-size: 1.5rem; font-weight: bold; color: #0f766e; line-height: 1.25;">
          Alcaldía de
        </h3>
        <h3 style="font-size: 1.5rem; font-weight: bold; color: #0f766e; line-height: 1.25;">
          Baranoa
        </h3>
        <div style="margin-top: 0.25rem; height: 1px; background-color: #0f766e; width: 100%;"></div>
        <h4 style="font-size: 1.125rem; font-weight: bold; color: #0f766e; margin-top: 0.25rem;">
          SECRETARÍA
        </h4>
        <h4 style="font-size: 1.125rem; font-weight: bold; color: #0f766e;">
          DE HACIENDA
        </h4>
      </div>
    </div>

    <!-- Cuerpo del documento -->
    <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.875rem; color: #1f2937; line-height: 1.625;">
      <p><strong>Estimado(a) Ciudadano(a),</strong></p>
      <p>Reciba un cordial saludo en nombre de [Nombre de la Entidad Pública].</p>
      <p>
        Hemos recibido su Petición, Queja o Reclamo (PQR) con número de radicado
        <strong>[NÚMERO_RADICADO]</strong>, relacionada con la solicitud de revisión de un caso
        particular y la posible procedencia de una devolución de dinero.
      </p>
      <p>
        Le informamos que su PQR ha sido debidamente radicada y se encuentra en estudio por
        parte del área competente de nuestra Entidad. Se realizará el análisis correspondiente
        de su caso particular, incluyendo la documentación o "prueba" a la que hace referencia
        en su solicitud, para determinar los pasos a seguir.
      </p>
      <div style="padding-top: 2rem;">
        <p>Atentamente,</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 3rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 3rem; height: 3rem; background: linear-gradient(to bottom right, #fb923c, #f97316); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 1.125rem; font-weight: bold;">★</span>
        </div>
        <div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #0f766e;">Baranoa</div>
          <div style="color: #f97316; font-size: 0.875rem; font-weight: 500;">
            ¡Corazón alegre del Atlántico!
          </div>
        </div>
      </div>

      <div style="text-align: right; font-size: 0.75rem; color: #4b5563; line-height: 1.25;">
        <div style="font-weight: 600; color: #0f766e;">Alcaldía Municipal de Baranoa</div>
        <div style="font-weight: 500;">Secretaría de Hacienda</div>
        <div style="margin-top: 0.25rem;">Dirección: Calle 20 No. 21-45</div>
        <div>hacienda@baranoa-atlantico.gov.co</div>
        <div>Teléfono: (605) 8789 999 ext. 108</div>
        <div>Nit. 890112371-8</div>
      </div>
    </div>

  </div>
</div>

  `,
    editable: modoEdicionManual,
  });
  useEffect(() => {
    if (editor) {
      editor.setEditable(modoEdicionManual);
    }
  }, [modoEdicionManual, editor]);

  const [editorState, setEditorState] = useState({});
  useEffect(() => {
    const updateState = () => {
      setEditorState({
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isUnderline: editor.isActive("underline"),
        isCodeBlock: editor.isActive("codeBlock"),
        isHeading1: editor.isActive("heading", { level: 1 }),
        isHeading2: editor.isActive("heading", { level: 2 }),
        isHeading3: editor.isActive("heading", { level: 3 }),
        isOrderedList: editor.isActive("orderedList"),
        isBulletList: editor.isActive("bulletList"),
        isImage: editor.isActive("image"),
        isLink: editor.isActive("link"),
      });
    };

    editor.on("update", updateState);
    updateState();

    return () => {
      editor.off("update", updateState);
    };
  }, [editor]);

  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleCodeBlock = () => editor?.chain().focus().toggleCodeBlock().run();
  const toggleH1 = () =>
    editor?.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleH2 = () =>
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () =>
    editor?.chain().focus().toggleHeading({ level: 3 }).run();
  const toggleParrafo = () => editor?.chain().focus().setParagraph().run();
  const toggleListaOrdenada = () =>
    editor?.chain().focus().toggleOrderedList().run();
  const toggleListaPuntos = () =>
    editor?.chain().focus().toggleBulletList().run();

  const agregarLink = () => {
    const url = window.prompt("URL del enlace:");
    if (url)
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  };
  const guardarContenido = () => {
    const contenido = editor?.getHTML();
    console.log("Contenido guardado:", contenido);
    editor?.setEditable(false);
    setModoEdicionManual(false); // 🔥 Oculta el Toolbar
  };

  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pt-[10px] pr-[7px] pb-[9px] pl-[20px] border-b bg-gray-100">
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
          <div className="overflow-y-auto max-h-[calc(95vh-140px)] bg-gray-100">
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
              {/* Línea de fondo */}
              <div className=" left-0 right-0 h-0.5 bg-gray-300 z-0 mx-[346px] my-0 absolute top-[52px]" />

              {/* Paso 1: Proyectar */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Proyectar
                </span>
              </div>

              {/* Paso 2: Firmar */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center group-hover:bg-gray-500 transition-colors">
                  <Edit3 className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Firmar
                </span>
              </div>

              {/* Paso 3: Sellar */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center group-hover:bg-gray-500 transition-colors">
                  <Stamp className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Sellar
                </span>
              </div>
            </div>

            {/* Document Content */}
            <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div
                className={cn(
                  "transition-all duration-300 overflow-hidden",
                  modoEdicionManual
                    ? "opacity-100 max-h-[500px]"
                    : "opacity-0 max-h-0 pointer-events-none"
                )}
              >
                <Toolbar
                  editor={editor}
                  editorState={editorState}
                  toggleBold={toggleBold}
                  toggleItalic={toggleItalic}
                  toggleUnderline={toggleUnderline}
                  toggleCodeBlock={toggleCodeBlock}
                  toggleH1={toggleH1}
                  toggleH2={toggleH2}
                  toggleH3={toggleH3}
                  toggleParrafo={toggleParrafo}
                  toggleListaOrdenada={toggleListaOrdenada}
                  toggleListaPuntos={toggleListaPuntos}
                  agregarLink={agregarLink}
                  guardarContenido={guardarContenido}
                  isEditable={modoEdicionManual}
                />
              </div>

              <EditorContent editor={editor} className="prose max-w-none p-8" />
              {/* <EditorContent editor={editor} /> */}

              {/* 
              <EditorContent editor={editor} >
              </EditorContent>  */}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t bg-white px-6 py-4">
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
                    editor?.setEditable(true);
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
