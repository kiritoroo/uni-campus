import React from "react";
import { SoundFxProvider } from "../contexts/SoundFxContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <SoundFxProvider>{children}</SoundFxProvider>;
};

export default Provider;
