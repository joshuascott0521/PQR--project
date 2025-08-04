import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Cargando...",
}) => {
  const sizeClasses = {
    sm: {
      container: "w-16 h-16",
      image: "w-14 h-14",
      spinner: "w-16 h-16 border-2",
      text: "text-sm",
    },
    md: {
      container: "w-24 h-24",
      image: "w-20 h-20",
      spinner: "w-24 h-24 border-3",
      text: "text-base",
    },
    lg: {
      container: "w-32 h-32",
      image: "w-28 h-28",
      spinner: "w-32 h-32 border-4",
      text: "text-lg",
    },
    xl: {
      container: "w-40 h-40",
      image: "w-36 h-36",
      spinner: "w-40 h-40 border-4",
      text: "text-xl",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Container principal con posición relativa */}
      <div
        className={`relative ${currentSize.container} flex items-center justify-center`}
      >
        {/* Spinner giratorio */}
        <div
          className={`
            absolute inset-0 
            ${currentSize.spinner} 
            border-yellow-200 
            border-t-yellow-500 
            border-r-yellow-400
            border-b-yellow-300
            border-l-yellow-200
            rounded-full 
            animate-spin
          `}
        />

        {/* Imagen estática en el centro */}
        <img
          src="/icon_prueba_pqr-removebg-preview.png"
          alt="Loading"
          className={`
            ${currentSize.image} 
            object-contain 
            z-10 
            drop-shadow-sm
            max-w-80
            h-48
            w-48
          `}
        />
      </div>

      {/* Texto de carga */}
      {text && (
        <p
          className={`
          ${currentSize.text} 
          text-gray-600 
          font-medium 
          animate-pulse
        `}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
