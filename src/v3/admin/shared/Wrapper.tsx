import { cn } from "@Utils/common.utils";
import { HTMLProps } from "react";

export const WidgetSection = ({ className, children }: HTMLProps<HTMLDivElement>) => {
  return <section className={cn("h-auto w-full p-8", className)}>{children}</section>;
};

export const WidgetTitle = ({ className, children }: HTMLProps<HTMLDivElement>) => {
  return <div className={cn("text-2xl font-bold", className)}>{children}</div>;
};

export const FlexRow = ({ className, children, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-row items-center justify-center", className)} {...props}>
      {children}
    </div>
  );
};

export const FlexCol = ({ className, children, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)} {...props}>
      {children}
    </div>
  );
};
