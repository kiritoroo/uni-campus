import { cn } from "@Utils/common.utils";
import DotFlashing from "@v3/admin/shared/DotFlashing";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
  loading = false,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "w-fit rounded-md border border-gem-onyx bg-gem-onyx stroke-white px-4 py-2 text-white transition-colors duration-200 hover:enabled:bg-white hover:enabled:stroke-gem-onyx hover:enabled:text-gem-onyx active:enabled:bg-gem-onyx/20 disabled:cursor-not-allowed disabled:opacity-80",
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      <div className={"relative"}>
        <div className={cn("text-sm font-medium", { "opacity-0": loading })}>{children}</div>
        {loading && (
          <div className="absolute inset-0 z-[1] h-full w-full">
            <DotFlashing />
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
