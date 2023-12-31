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
          <label
            htmlFor={elId}
            className="block w-fit cursor-pointer pb-2 text-sm font-semibold text-gem-onyx/80"
          >
            {label}
          </label>
        )}

        <input
          className={cn(
            "h-[32px] w-full rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gem-onyx/80 focus:outline-2 focus:focus:outline-gem-onyx/80 disabled:cursor-not-allowed disabled:opacity-80",
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
