import { cn } from "@Utils/common.utils";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  dir?: "hoz" | "vez";
  child?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ dir = "vez", child = false, label, name, required, className, ...props }, ref) => {
    const elId = `el--input-${uuidv4()}`;

    return (
      <div
        className={cn("w-full", {
          "flex items-center justify-start gap-3": dir === "hoz",
        })}
      >
        {label && (
          <label htmlFor={elId} className="block w-fit cursor-pointer pb-1 text-sm font-medium">
            {label}
          </label>
        )}

        <input
          className={cn(
            "h-[32px] w-full rounded-md rounded-r-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gem-onyx/80 focus:outline-2 focus:focus:outline-gem-onyx/80 disabled:cursor-not-allowed disabled:opacity-80",
            className,
          )}
          ref={ref}
          id={elId}
          name={name}
          required={required}
          {...props}
        />
      </div>
    );
  },
);

FormInput.displayName = "UI/FormInput";
