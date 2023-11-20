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
            className="text-gem-onyx/80 block w-fit cursor-pointer pb-1 text-sm font-medium"
          >
            {label}{" "}
          </label>
        )}

        <div className="flex items-stretch justify-center rounded-lg border border-gray-300">
          <div className="flex items-center justify-center rounded-l-lg border-r border-gray-300 bg-[#F5F5F5] px-4 py-3">
            {icon && icon}
          </div>
          <input
            className={cn(
              "text-gem-onyx/80 focus:focus:outline-gem-onyx/80 h-auto w-full rounded-r-lg bg-[#FAFAFA] px-3 text-sm font-medium focus:outline-2  disabled:cursor-not-allowed disabled:opacity-50",
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
