import React from 'react';
import { X } from 'lucide-react';

interface ConfirmarSelladoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: () => void;
}

export const ModalSellado: React.FC<ConfirmarSelladoModalProps> = ({
  isOpen,
  onClose,
  onBack,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            ¿Está seguro de Sellar el documento?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            A continuación, dará por finalizado el proceso de firmado, se sellará la Respuesta y este no 
            podrá ser editado más adelante y será notificado al cliente por correo electrónico y mensaje 
            de texto.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Sellar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
