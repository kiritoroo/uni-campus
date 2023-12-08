import React from "react";
import { SoundFxProvider } from "../contexts/SoundFxContext";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalStoreProvider>
      <SoundFxProvider>{children}</SoundFxProvider>
    </GlobalStoreProvider>
  );
};

export default Provider;
