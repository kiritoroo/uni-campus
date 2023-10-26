import { GLCampusScene } from "@Scripts/webgl/scene/CampusScene/GLCampusScene";
import { Fragment, useEffect, useRef, useState } from "react";
import { SoundFxProvider } from "./global/context/SoundFxContext";
import { assets } from "@Assets/assets";
import { CampusSceneStoreProxyProvider } from "@Scripts/webgl/scene/CampusScene/contexts/CampusSceneStoreProxyContext";
import { audioFadeIn } from "@Utils/common.utils";
import { UILayout } from "@Scripts/ui/UILayout";
import { Leva } from "leva";
import { UISpaceFilter } from "@Scripts/core/Campus/components/UISpaceFilter";
import { SpaceFilterStoreProxyProvider } from "@Scripts/core/Campus/contexts/SpaceFilterStoreProxyContext";

const App = () => {
  console.warn("Re: Render");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [interactive, setInteractive] = useState<boolean>(false);

  // useEffect(() => {
  //   if (interactive && audioRef.current) {
  //     audioRef.current.loop = true;
  //     audioRef.current.play();
  //     audioFadeIn(audioRef.current, 0.5);
  //   }
  // }, [interactive]);

  return (
    <Fragment>
      <UILayout>
        <SoundFxProvider>
          <div
            className="font-dinpro bg-[#F9F4FA] font-normal antialiased"
            onClick={() => {
              setTimeout(() => {
                setInteractive(true);
              }, 1000);
            }}
          >
            <div className="relative h-screen w-screen">
              <CampusSceneStoreProxyProvider>
                <SpaceFilterStoreProxyProvider>
                  <GLCampusScene />
                  <UISpaceFilter />
                </SpaceFilterStoreProxyProvider>
              </CampusSceneStoreProxyProvider>
            </div>
          </div>

          <audio ref={audioRef} autoPlay={false}>
            <source src={assets.sounds.THEME_PATH} />
          </audio>
        </SoundFxProvider>
        <Leva collapsed />
      </UILayout>
    </Fragment>
  );
};

export default App;
