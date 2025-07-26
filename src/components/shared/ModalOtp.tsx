import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { PqrServices } from '../../services/pqrServices';

interface AuthorizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSign: (code: number) => void;
}

const ModalOtp: React.FC<AuthorizationModalProps> = ({
    isOpen,
    onClose,
    onSign,
}) => {
    const [code, setCode] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Timer countdown
    useEffect(() => {
        if (!isOpen || timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, timeLeft]);


    const generate = async () => {
        try {
            const userData = localStorage.getItem("userData");
            if (!userData) {
                console.error("Usuario no encontrado");
                return;
            }
            const user = JSON.parse(userData);
            const usuid = user?.id;
            if (!usuid) {
                console.error("ID de usuario inválido");
                return;
            }

            const call = await PqrServices.generateOtp(usuid);
            if (!call.success) throw new Error(call.error);

        } catch (err) {
            console.error("Error al generar otp:", err);
        }
    }

    useEffect(() => {
        if (!isOpen) return;
        generate();
    }, [isOpen])

    // Reset timer when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeLeft(300);
            setCode(['', '', '', '']);
        }
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleInputChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only take the last character
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'Enter') {
            handleSign();
        }
    };

    const handleSign = () => {
        const fullCode = code.join('');
        if (fullCode.length === 4) {
            onSign(Number(fullCode)); // Convertimos el string a número
        }
    };


    const handleCancel = () => {
        setCode(['', '', '', '']);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-5 max-w-xl w-full mx-4 relative animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Autorización para firmar
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                    Ingrese el código que enviamos a su Email o Celular para autorizar firmar la respuesta, tiene{' '}
                    <span className="font-semibold text-blue-600">
                        {formatTime(timeLeft)}
                    </span>
                </p>

                {/* Code Input Fields */}
                <div className="flex justify-center gap-4 mb-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}

                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                            disabled={timeLeft === 0}
                        />
                    ))}
                </div>

                {/* Timer expired message */}
                {timeLeft === 0 && (
                    <div>
                        <p className="text-red-500 font-bold text-center text-sm ">
                            El código ha expirado. Solicite uno nuevo.
                        </p>
                        <div className="text-center my-3">
                            <button
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors"
                                onClick={() => {
                                    generate();
                                    setTimeLeft(300);
                                    setCode(['', '', '', '']);
                                }}

                            >
                                Reenviar código
                            </button>
                        </div>
                    </div>
                )}

                {/* Resend code link */}


                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleCancel}
                        className="flex-1 py-3 px-6 bg-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-400 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSign}
                        disabled={code.join('').length !== 4 || timeLeft === 0}
                        className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Firmar
                    </button>
                </div>


            </div>
        </div>
    );
};

export default ModalOtp;