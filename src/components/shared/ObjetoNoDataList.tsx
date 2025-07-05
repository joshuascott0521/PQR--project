import { CircleCheck   } from 'lucide-react';

interface NoMoreResultsProps {
  message?: string;
  subtitle?: string;
  showAnimation?: boolean;
  className?: string;
}

const NoMoreResults: React.FC<NoMoreResultsProps> = ({
  message = "No hay más resultados",
  subtitle = "Has revisado todos los elementos disponibles",
  showAnimation = true,
  className = "",
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center py-12 px-6 w-full h-full ${className}`}>
      {/* Fondo con gradiente */}
      <div className="
        absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-50 to-zinc-200
         
      " />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center">
        <div className={`
          relative flex items-center justify-center w-20 h-20 mb-6
          bg-slate-50 rounded-2xl shadow-lg
          ${showAnimation ? 'animate-pulse' : ''}
          transition-all duration-500 ease-out
          hover:scale-105 hover:shadow-xl
        `}>
          <div className={`
            absolute inset-0 rounded-2xl bg-slate-50 opacity-50 blur-sm
            ${showAnimation ? 'animate-ping' : ''}
          `} />
          <CircleCheck size={36} className="text-slate-500 relative z-10" />
          
        </div>

        <div className="text-center space-y-3 max-w-sm">
          <h3 className="text-lg font-bold text-slate-700 tracking-tight leading-tight">
            {message}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium opacity-90">
            {subtitle}
          </p>
        </div>

        

        
      </div>

      
    </div>
  );
};

export default NoMoreResults;
