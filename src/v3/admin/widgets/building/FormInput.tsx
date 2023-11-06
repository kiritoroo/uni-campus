import { cn } from "@Utils/common.utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  dir?: "hoz" | "vez";
  child?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ dir = "vez", child = false, label, name, required, className, ...props }, ref) => {
    const inputId = `el--input-${name}`;

    return (
      <div
        className={cn("w-full", {
          "flex items-center justify-start gap-3": dir === "hoz",
        })}
      >
        <label
          htmlFor={inputId}
          className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600"
        >
          {label} {required && !child && <span className="text-red-400">*</span>}
        </label>

        <input
          className={cn(
            "h-[32px] w-full border border-[#E5E7EA] bg-[#EFEFEF] px-5 text-[14px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/20",
            className,
          )}
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          {...props}
        />
      </div>
    );
  },
);

FormInput.displayName = "UI/FormInput";
