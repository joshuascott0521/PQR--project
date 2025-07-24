import {
  ArrowRight,
  Edit3,
  FileText,
  Send,
  Sparkles,
  SquarePen,
  Stamp,
  X,
} from "lucide-react";
import { useState } from "react";

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
              <div className="p-8">
                {/* Header with Logo */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0"></div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-teal-700 leading-tight">
                      Alcaldía de
                    </h3>
                    <h3 className="text-2xl font-bold text-teal-700 leading-tight">
                      Baranoa
                    </h3>
                    <div className="mt-1 h-px bg-teal-600 w-full"></div>
                    <h4 className="text-lg font-bold text-teal-600 mt-1">
                      SECRETARÍA
                    </h4>
                    <h4 className="text-lg font-bold text-teal-600">
                      DE HACIENDA
                    </h4>
                  </div>
                </div>

                {/* Document Body */}
                <div className="space-y-4 text-sm text-gray-800 leading-relaxed">
                  <p>
                    <strong>Estimado(a) Ciudadano(a),</strong>
                  </p>

                  <p>
                    Reciba un cordial saludo en nombre de [Nombre de la Entidad
                    Pública].
                  </p>

                  <p>
                    Hemos recibido su Petición, Queja o Reclamo (PQR) con número
                    de radicado <strong>**{numeroRadicado}**</strong>,
                    relacionada con la solicitud de revisión de un caso
                    particular y la posible procedencia de una devolución de
                    dinero.
                  </p>

                  <p>
                    Le informamos que su PQR ha sido debidamente radicada y se
                    encuentra en estudio por parte del área competente de
                    nuestra Entidad. Se realizará el análisis correspondiente de
                    su caso particular, incluyendo la documentación o "prueba" a
                    la que hace referencia en su solicitud, para determinar los
                    pasos a seguir.
                  </p>

                  <div className="pt-8">
                    <p>Atentamente,</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end mt-12">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">★</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-700">
                        Baranoa
                      </div>
                      <div className="text-orange-500 text-sm font-medium">
                        ¡Corazón alegre del Atlántico!
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-xs text-gray-600 leading-tight">
                    <div className="font-semibold text-teal-700">
                      Alcaldía Municipal de Baranoa
                    </div>
                    <div className="font-medium">Secretaría de Hacienda</div>
                    <div className="mt-1">Dirección: Calle 20 No. 21-45</div>
                    <div>hacienda@baranoa-atlantico.gov.co</div>
                    <div>Teléfono: (605) 8789 999 ext. 108</div>
                    <div>Nit. 890112371-8</div>
                  </div>
                </div>
              </div>
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
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium">
                  {/* <Edit3 className="w-4 h-4" /> */}
                  <SquarePen className="h-4 w-4" />
                  Editar Manual
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
