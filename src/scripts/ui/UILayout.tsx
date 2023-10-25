import React from "react";
import { UIHeader } from "./UIHeader";

export const UILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <UIHeader />
      {children}
    </main>
  );
};
