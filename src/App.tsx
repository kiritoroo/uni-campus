import { CampusScene } from "@Scripts/webgl/scene/CampusScene";
import { Fragment } from "react";
import { SoundFxProvider } from "./global/context/SoundFxContext";

const App = () => {
  console.warn("Re: Render");

  return (
    <Fragment>
      <SoundFxProvider>
        <main className="font-dinpro bg-[#F9F4FA] font-normal antialiased">
          <div className="relative h-screen w-screen">
            <CampusScene />
          </div>
        </main>
      </SoundFxProvider>
    </Fragment>
  );
};

export default App;
