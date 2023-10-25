import { GLCampusScene } from "@Scripts/webgl/scene/CampusScene/GLCampusScene";
import { Fragment, useEffect, useRef, useState } from "react";
import { SoundFxProvider } from "./global/context/SoundFxContext";
import { assets } from "@Assets/assets";
import { CampusSceneStoreProxyProvider } from "@Scripts/webgl/scene/CampusScene/contexts/CampusSceneStoreProxyContext";
import { audioFadeIn } from "@Utils/common.utils";
import { Layout } from "@Scripts/ui/Layout";
import { Leva } from "leva";

const App = () => {
  console.warn("Re: Render");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [interactive, setInteractive] = useState<boolean>(false);

  // useEffect(() => {
  //   if (interactive && audioRef.current) {
  //     audioRef.current.loop = true;
  //     audioRef.current.play();
  //     audioFadeIn(audioRef.current, 0.3);
  //   }
  // }, [interactive]);

  return (
    <Fragment>
      <Layout>
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
                <GLCampusScene />
              </CampusSceneStoreProxyProvider>
            </div>
          </div>

          <audio ref={audioRef} autoPlay={false}>
            <source src={assets.sounds.THEME_PATH} />
          </audio>
        </SoundFxProvider>

        <Leva collapsed />
      </Layout>
    </Fragment>
  );
};

export default App;
