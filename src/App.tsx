import { GLCampusScene } from "@Scripts/webgl/scene/CampusScene/GLCampusScene";
import { Fragment, useState } from "react";
import { SoundFxProvider } from "./global/context/SoundFxContext";
import { assets } from "@Assets/assets";
import { CampusSceneStoreProxyProvider } from "@Scripts/webgl/scene/CampusScene/contexts/CampusSceneStoreProxyContext";

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
            <CampusSceneStoreProxyProvider>
              <GLCampusScene />
            </CampusSceneStoreProxyProvider>
          </div>
        </main>

        {/* {interactive && (
          <audio autoPlay loop>
            <source src={assets.sounds.THEME_PATH} />
          </audio>
        )} */}
      </SoundFxProvider>
    </Fragment>
  );
};

export default App;
