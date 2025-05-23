
import type React from "react";

interface FloatingLabelProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  id,
  label,
  type = "text",
  value,
  autoComplete,
  onChange,
  className,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        disabled={disabled}
        className={`peer w-full h-10 border border-gray-300 rounded-lg px-3 pt-4 pb-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
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
