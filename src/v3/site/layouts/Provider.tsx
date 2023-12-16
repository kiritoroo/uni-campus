import React from "react";
import { SoundFxProvider } from "../contexts/SoundFxContext";
import { GlobalStoreProvider } from "../contexts/GlobalStoreContext";
import { SpacesStoreProvider } from "./widgets/spaces/contexts/SpacesStoreContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalStoreProvider>
      <SoundFxProvider>
        <SpacesStoreProvider>{children}</SpacesStoreProvider>
      </SoundFxProvider>
    </GlobalStoreProvider>
  );
};

export default Provider;
