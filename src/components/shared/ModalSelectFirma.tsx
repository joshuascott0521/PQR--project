import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FloatingSelectLP } from './FloatingSelectLP'; // Ajusta la ruta si está en otro directorio
import { showToast } from '../../utils/toastUtils';

interface SelectFirmanteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewChange: (view: 'confirm') => void;
}

export const ModalSelectFirma: React.FC<SelectFirmanteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFuncionario, setSelectedFuncionario] = useState('');

  const funcionarios = [
    'Juan Pérez - Director General',
    'María García - Subdirectora',
    'Carlos López - Jefe de Área',
    'Ana Martínez - Coordinadora'
  ];

  const options = funcionarios.map((f) => ({
    value: f,
    label: f
  }));

  if (!isOpen) return null;

  const handleSelectView = () => {
    if (selectedFuncionario) {
      showToast(`Firma solicitada a ${selectedFuncionario}`, "success")
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Seleccione el firmante correspondiente
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
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            A continuación seleccione el funcionario encargado y con facultades para firmar documento.
          </p>

          <div className="mb-8 w-full">
            <FloatingSelectLP
              value={selectedFuncionario}
              onChange={(value) => setSelectedFuncionario(value)}
              options={options}
              placeholder="Seleccione un Funcionario"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSelectView}
              disabled={!selectedFuncionario}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedFuncionario
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Solicitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
