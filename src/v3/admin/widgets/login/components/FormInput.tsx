import { cn } from "@Utils/common.utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  dir?: "hoz" | "vez";
  child?: boolean;
  icon?: React.ReactElement;
}

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ dir = "vez", child = false, icon, label, name, required, className, ...props }, ref) => {
    const inputId = `el--input-${name}`;

    return (
      <div
        className={cn("w-full", {
          "flex items-center justify-start gap-3": dir === "hoz",
        })}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="block w-fit cursor-pointer pb-1 text-sm font-semibold text-slate-400"
          >
            {label} {required && dir === "vez" && !child && <span className="text-red-400">*</span>}
          </label>
        )}

        <div className="flex items-stretch justify-center border border-slate-300">
          <div className="flex items-center justify-center border-r border-slate-300 bg-white p-3">
            {icon && icon}
          </div>
          <input
            className={cn(
              "h-auto w-full bg-white px-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/20 disabled:cursor-not-allowed disabled:bg-[#EFEFEF]/50 disabled:text-gray-700",
              className,
            )}
            ref={ref}
            id={inputId}
            name={name}
            required={required}
            {...props}
          />
        </div>
      </div>
    );
  },
);

FormInput.displayName = "UI/FormInput";
