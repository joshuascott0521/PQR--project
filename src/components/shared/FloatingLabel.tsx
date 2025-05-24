import type React from "react";

interface FloatingLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  id,
  label,
  type = "text",
  className,
  ...rest
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder=" "
        className={`peer w-full h-10 border border-gray-300 rounded-lg px-3 pt-4 pb-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-1 text-gray-500 text-xs transition-all pointer-events-none
          peer-placeholder-shown:top-2
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:top-1
          peer-focus:text-xs
          peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
};
