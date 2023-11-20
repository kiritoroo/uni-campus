import { cn } from "@Utils/common.utils";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  desc: string;
}

const DetailField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, desc, className, ...props }, ref) => {
    const elId = `el--input-${uuidv4()}`;

    return (
      <div className="rounded-md border border-gray-300 p-8 shadow-sm">
        <label htmlFor={elId} className="block cursor-pointer pb-2 text-base font-bold">
          {label}
        </label>
        <div className="text-gem-onyx/70 pb-2 text-sm font-normal">{desc}</div>
        <input
          className={cn(
            "text-gem-onyx/80 focus:focus:outline-gem-onyx/80 h-[34px] w-1/3 min-w-[300px] rounded-md rounded-r-lg border border-gray-300 bg-white px-3 text-sm font-medium focus:outline-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          id={elId}
          {...props}
        />
      </div>
    );
  },
);

DetailField.displayName = "UI/DetailField";

export default DetailField;
