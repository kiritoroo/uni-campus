import React from "react";
import { UIHeader } from "./UIHeader";
import { cn } from "@Utils/common.utils";

export const UILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <UIHeader />
      {children}
    </main>
  );
};
