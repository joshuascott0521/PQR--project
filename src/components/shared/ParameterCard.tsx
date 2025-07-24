// Este componente es el que va a contener las categorias de los distintos parametros
import React from "react";

export interface ParameterCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface ParameterCardProps extends ParameterCardData {
  onClick: (id: string) => void;
}


export const ParameterCard: React.FC<ParameterCardProps> = ({
  id,
  title,
  description,
  icon,
  color,
  bgColor,
  onClick
}) => (
  <div
    onClick={() => onClick(id)}
    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
  >
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${bgColor} ${color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
      {icon}
    </div>

    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
      {title}
    </h3>

    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);
