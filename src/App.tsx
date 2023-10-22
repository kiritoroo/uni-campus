import { CampusScene } from "@Scripts/webgl/scene/CampusScene";
import { Fragment, useState } from "react";
import { SoundFxProvider } from "./global/context/SoundFxContext";
import Sound from "react-sound";

const App = () => {
  console.warn("Re: Render");

  const [interactive, setInteractive] = useState<boolean>(false);

  return (
    <Fragment>
      <SoundFxProvider>
        <main
          className="font-dinpro bg-[#F9F4FA] font-normal antialiased"
          onClick={() => {
            setTimeout(() => {
              setInteractive(true);
            }, 1000);
          }}
        >
          <div className="relative h-screen w-screen">
            <CampusScene />
          </div>
        </main>

        {interactive && <Sound url="/sounds/theme.mp3" playStatus={"PLAYING"} loop volume={50} />}
      </SoundFxProvider>
    </Fragment>
  );
};

export default App;
