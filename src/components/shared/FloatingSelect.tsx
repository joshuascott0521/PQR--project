"use client";

import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface FloatingSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void | Promise<void>;
  options: { value: string; label: string }[];
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  placeholder?: string;
}

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  loading = false,
  className = "",
  placeholder = "",
}) => {
  return (
    <div className="relative w-full">
      <SelectPrimitive.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled || loading}
      >
        <SelectPrimitive.Trigger
          className={cn(
            "peer pt-3 border border-gray-300 rounded-lg w-full h-10 px-3 text-xs bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500",
            className
          )}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              <span className="text-gray-400 text-sm">Cargando...</span>
            </div>
          ) : (
            <>
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon>
                <ChevronDown className="h-4 w-4 opacity-50 -translate-y-[1px]" />
              </SelectPrimitive.Icon>
            </>
          )}
        </SelectPrimitive.Trigger>

<<<<<<< Updated upstream
        {!loading && (
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              side="bottom"
              position="popper"
              avoidCollisions={false}
              className="z-50 mt-1 max-h-36 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md"
              style={{ width: "var(--radix-select-trigger-width)" }}
            >
              <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
                <ChevronUp className="h-4 w-4" />
              </SelectPrimitive.ScrollUpButton>
=======
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            side="bottom"
            position="popper"
            className="z-50 mt-1 max-h-36 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md"
            style={{ width: "var(--radix-select-trigger-width)" }}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
              <ChevronUp className="h-4 w-4" />
            </SelectPrimitive.ScrollUpButton>
>>>>>>> Stashed changes

              <SelectPrimitive.Viewport className="p-1">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className="relative cursor-pointer select-none rounded-sm py-1.5 pl-8 pr-2 text-sm text-gray-700 focus:bg-green-100 focus:text-green-900"
                  >
                    <span className="absolute left-2">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4 text-green-500" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>
                      {option.label}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>

              <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
                <ChevronDown className="h-4 w-4" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        )}
      </SelectPrimitive.Root>

      <label
        className={`pointer-events-none absolute left-3 text-gray-500 top-1 text-xs text-muted-foreground transition-all
          peer-placeholder-shown:top-2
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-green-500
          ${value ? "top-1 text-sm text-gray-400" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
};
