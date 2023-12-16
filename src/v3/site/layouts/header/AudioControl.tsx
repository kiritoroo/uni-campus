import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import { Music, VolumeXIcon } from "lucide-react";

const AudioControl = () => {
  const globalStore = useGlobalStore();
  const enableSound = globalStore.use.enableSound();

  const handleToggleSound = () => {
    globalStore.setState({ enableSound: !enableSound });
  };

  return (
    <div
      className="group cursor-pointer bg-transparent p-3 transition-colors duration-100 hover:bg-gem-sapphire"
      onClick={handleToggleSound}
    >
      {enableSound && (
        <Music className="h-5 w-5 stroke-gem-sapphire transition-all duration-200 group-hover:stroke-white" />
      )}

      {!enableSound && (
        <VolumeXIcon className="h-5 w-5 stroke-gem-sapphire transition-all duration-200 group-hover:stroke-white" />
      )}
    </div>
  );
};

export default AudioControl;
