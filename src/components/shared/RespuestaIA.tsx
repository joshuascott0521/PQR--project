import {
  ArrowLeft,
  ArrowRight,
  Edit3,
  File,
  FileText,
  Paperclip,
  Sparkles,
  SquarePen,
  Stamp,
  Trash2,
  X,
} from "lucide-react";
import { useState, useRef } from "react";

// Importaciones de Lexical
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

// Importaciones de Nodos de Lexical
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

// Importaciones de Estilos y Plugins
import { css } from "@emotion/css";
import ToolbarPlugin from "../../Plugins/ToolbarPlugin";
import type { EditorThemeClasses } from "lexical";
import EditablePlugin from "../../Plugins/EditablePlugin";
import CapturePlugin, {
  type CapturePluginApi,
} from "../../Plugins/CapturePlugin";
import { PqrServices } from "../../services/pqrServices";
import { showToast } from "../../utils/toastUtils";
import ModalOtp from "./ModalOtp";
import { ModalSelectFirma } from "./ModalSelectFirma";
import { ModalSellado } from "./ModalSellado";

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
  const [isEditable, setIsEditable] = useState(false);
  const captureRef = useRef<CapturePluginApi>(null);

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const handleNext = () => setStep((s) => (s < 2 ? (s + 1) as 0 | 1 | 2 : s));
  const handlePrev = () => setStep((s) => (s > 0 ? (s - 1) as 0 | 1 | 2 : s));

  {/* Hook de control para el modal de OTP */ }
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  {/* Hook de control para el modal de seleccion de firmantes */ }
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  {/* Hook de control para el manejo de errores en el OTP. Nota: este hook se envia por props al componente*/ }
  const [otpError, setOtpError] = useState<string | null>(null);

  {/* Hook de control para el modal de confirmación de sellado */ }
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  {/* Obtener el id del funcionario en sesion*/ }
  const userData = localStorage.getItem("userData");
  if (!userData) return null;
  const user = JSON.parse(userData);
  const usuid = user?.id;
  if (!usuid) return null;

  const [firmado, setFirmado] = useState(false);
  const [solicitudFirmaActiva, setSolicitudFirmaActiva] = useState(false);
  const [, setSolicitudFuncionario] = useState<string | null>(null);

  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  {/*
      En esta funcion se obtiene el otp que se ingresa en el modal,
      una vez se tiene se envia junto con el id del usuario en
      sesión para verificar la validez del codigo. Si es valido el
      modal se cierra y se muestra un toast de exito. En esta
      funcion en la validacion de exito de la peticion se
      ubicaria el consumo (si lo hay) para que se posicione la
      firma en el html.
  
      IMPORTANTE: esta funcion debe ser ubicada en el archivo donde
      se va a llamar el modal ya que se envia como props al 
      componente.
    */}
  const handleSign = (otp: number) => {
    const validation = async () => {
      try {
        const response = await PqrServices.validateOtp(usuid, otp);
        if (!response.success) throw new Error(response.error);
        showToast(response.data.mensaje, "success");
        setOtpError(null);
        setIsOtpModalOpen(false);
        setFirmado(true);
      } catch (err) {
        console.error("Error al validar otp:", err);
        setOtpError("El código ingresado es incorrecto.");
      }
    };
    validation();
  };

  const handleDeleteSign = () => {
    setFirmado(false)
    showToast("Firma Eliminada");
  };

  const handleRequestSignature = ({ funcionario }: { funcionario: string }) => {
    if (solicitudFirmaActiva) {
      showToast("Ya existe una solicitud de firma en curso.");
      return;
    }
    setSolicitudFirmaActiva(true);
    setSolicitudFuncionario(funcionario);
  };

  const handleCancelSignatureRequest = () => {
    if (!solicitudFirmaActiva) {
      showToast("No hay solicitud de firma para cancelar.");
      return;
    }
    setSolicitudFirmaActiva(false);
    setSolicitudFuncionario(null);
    showToast("Solicitud de firma cancelada", "success");
  };

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
    align: {
      center: css({ textAlign: "center" }),
      right: css({ textAlign: "right" }),
      left: css({ textAlign: "left" }),
      justify: css({ textAlign: "justify" }),
    },
    heading: {
      h1: css({ fontSize: "2rem", margin: "1rem 0", fontWeight: "normal" }),
      h2: css({ fontSize: "1.5rem", margin: "1rem 0", fontWeight: "normal" }),
      h3: css({ fontSize: "1.17rem", margin: "1rem 0", fontWeight: "normal" }),
      h4: css({ fontSize: "1rem", margin: "1rem 0", fontWeight: "normal" }),
      h5: css({ fontSize: "0.83rem", margin: "1rem 0", fontWeight: "normal" }),
      h6: css({ fontSize: "0.67rem", margin: "1rem 0", fontWeight: "normal" }),
    },
  };

  const initialConfig = {
    namespace: "RespuestaIA-1",
    theme,
    onError: (error: Error) => {
      console.error("Error en el editor Lexical:", error);
    },
    editable: isEditable,
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

  const handleSave = () => {
    setIsEditable(false);
    if (captureRef.current) {
      const editorState = captureRef.current.getEditorState();
      const editorStateJSON = editorState.toJSON();

      console.log("✅ Contenido del editor (Objeto JSON):", editorStateJSON);
      console.log(
        "📄 Contenido como string JSON:",
        JSON.stringify(editorStateJSON, null, 2)
      );
    }
  };

  const renderFooter = () => {
    switch (step) {
      case 0:
        return (
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="flex gap-4 items-center">
              {!isEditable && (
                <>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={ajusteIA}
                      onChange={(e) => setAjusteIA(e.target.value)}
                      placeholder="Añadir ajuste a la IA (ej.: 'Hazlo más formal')"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none h-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    Enviar
                  </button>
                </>
              )}
              {isEditable && <div className="flex-1"></div>}
              <div className="flex gap-3">
                {isEditable ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <SquarePen className="w-4 h-4" />
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
                  >
                    <SquarePen className="w-4 h-4" />
                    Editar Manual
                  </button>
                )}
                {!isEditable && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="grid grid-cols-3 items-center">
              <div className="justify-self-start">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
              </div>
              <div className="justify-self-center">
                <div className="flex gap-3">
                  {!firmado ? (
                    <button
                      onClick={() => setIsOtpModalOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Firmar
                    </button>
                  ) : (
                    <button
                      onClick={handleDeleteSign}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar Firma
                    </button>
                  )}
                  {!solicitudFirmaActiva ? (
                    <button
                      onClick={() => setIsSelectModalOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={!firmado}
                    >
                      Solicitar firma
                    </button>
                  ) : (
                    <button
                      onClick={handleCancelSignatureRequest}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar solicitud
                    </button>
                  )}
                </div>
              </div>
              <div className="justify-self-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="grid grid-cols-3 items-center">
              <div className="justify-self-start">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
              </div>
              <div className="justify-self-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 text-white py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  <Paperclip className="w-4 h-4" />
                  Agregar soporte a respuesta PDF
                </button>
                <input
                  key={inputKey}
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  className="hidden"
                  onChange={handleArchivos}

                />
              </div>
              <div className="justify-self-end">
                <button
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="bg-green-500 text-white font-semibold px-4 flex items-center gap-2 py-2 rounded-lg text-sm hover:bg-green-600 transition"
                >
                  <Stamp />
                  Sellar y finalizar
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = e.target.files ? Array.from(e.target.files) : [];
    const size = 5;
    const maxSizeBytes = size * 1024 * 1024;
    const archivosValidos = nuevos.filter((file) => {
      if (file.size > maxSizeBytes) {
        showToast(`El archivo "${file.name}" excede el límite de ${size} MB.`);
        return false;
      }
      return true;
    });

    setArchivos((prev) => [...prev, ...archivosValidos]);
    setInputKey((prev) => prev + 1);
  };

  const eliminarArchivo = (index: number) => {
    const copia = [...archivos];
    copia.splice(index, 1);
    setArchivos(copia);
  };

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
            {/* Asunto y Action Buttons */}
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
            <div className="relative flex justify-center gap-40 py-6">
              <div className=" left-0 right-0 h-0.5 bg-gray-300 z-0 mx-[346px] my-0 absolute top-[52px]" />
              {/* Paso 0: Proyección */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center
                      ${step >= 0 ? "bg-blue-600" : "bg-gray-400"} transition-colors`}>
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Proyectar
                </span>
              </div>
              {/* Paso 1: Firmado */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center
                      ${step >= 1 ? "bg-blue-600" : "bg-gray-400"} transition-colors`}>
                  <Edit3 className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Firmar
                </span>
              </div>
              {/* Paso 2: Sellado*/}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center
                      ${step >= 2 ? "bg-blue-600" : "bg-gray-400"} transition-colors`}>
                  <Stamp className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Sellar
                </span>
              </div>
            </div>

            {/* Document Content */}
            <div className="mx-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <LexicalComposer initialConfig={initialConfig}>
                <div className="relative">
                  {isEditable && (
                    <>
                      <ToolbarPlugin />
                      <hr />
                    </>
                  )}
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
                            cursor: isEditable ? "text" : "default",
                          })}
                        />
                      </div>
                    }

                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                  <EditablePlugin isEditable={isEditable} />
                  <CapturePlugin ref={captureRef} />
                </div>
              </LexicalComposer>
            </div>
            <div className="mt-0 ml-7">
              <div className="flex gap-2  flex-wrap py-2 items-center">
                {archivos.length > 0 ? (
                  archivos.map((archivo, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-full cursor-default px-3 py-1 max-w-[189px] flex-shrink-0"
                      title={archivo.name}
                    >
                      <File className="w-4 h-4 text-gray-700" />
                      <p className="text-sm text-gray-800 truncate flex-1">
                        {archivo.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => eliminarArchivo(index)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        aria-label="Eliminar archivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          {renderFooter()}
          <ModalOtp
            isOpen={isOtpModalOpen}
            onClose={() => setIsOtpModalOpen(false)}
            onSign={handleSign}
            otpError={otpError}
            setOtpError={setOtpError}
          />
          <ModalSelectFirma
            isOpen={isSelectModalOpen}
            onClose={() => setIsSelectModalOpen(false)}
            onRequestSignature={handleRequestSignature}
          />
          <ModalSellado
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onBack={() => { }}
            onConfirm={() => {
              showToast("Documento sellado exitosamente", "success")
              setIsConfirmModalOpen(false);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RespuestaIA;
