import React from "react";
import { UIHeader } from "./UIHeader";
import { UIFooter } from "./UIFooter";

export const UILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <UIHeader />
      {children}
      <UIFooter />
    </main>
  );
};
