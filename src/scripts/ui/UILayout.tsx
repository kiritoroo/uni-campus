import React from "react";
import { UIHeader } from "./UIHeader";
import { cn } from "@Utils/common.utils";

export const UILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div
        className={cn(
          "sr-only group-hover:bg-[#404A57]/30",
          "group-hover:bg-[#6B7FDF]/30",
          "group-hover:bg-[#F86D6D]/30",
          "group-hover:bg-[#404A57]/30",
          "group-hover:bg-[#FD9A43]/30",
          "group-hover:bg-[#6EDC6C]/30",
          "group-hover:bg-[#415E93]/30",
        )}
      />
      <UIHeader />
      {children}
    </main>
  );
};
