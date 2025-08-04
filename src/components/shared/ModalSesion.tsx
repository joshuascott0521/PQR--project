import React from 'react';

interface SessionExpiredModalProps {
  isOpen: boolean;
  onGoToLogin: () => void;
}

const ModalSesion: React.FC<SessionExpiredModalProps> = ({
  isOpen,
  onGoToLogin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 animate-in fade-in slide-in-from-bottom-4">

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <div className="mx-auto w-16 h-16 ">
            <img src="/PqrLogoicon.png" alt="PqrPlus Icon" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sesión Expirada
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Tu sesión ha expirado por seguridad. Por favor, inicia sesión nuevamente para continuar.
          </p>
        </div>

        {/* Action */}
        <div className="px-6 pb-6">
          <button
            onClick={onGoToLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Ir al Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSesion;