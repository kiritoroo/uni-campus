import { OrbitControls } from "@react-three/drei";
import { useCampusStoreInContext } from "../hooks/useCampusStoreInContext";
import { memo, useEffect, useRef } from "react";
import { OrbitControls as TOrbitControls } from "three-stdlib";

export const GLCampusControls = memo(() => {
  const setCampusControlsStore = useCampusStoreInContext().use.setCampusControls();

  const controlsRef = useRef<TOrbitControls | any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      setCampusControlsStore(controlsRef.current);
    }
  }, [controlsRef.current]);

  return <>{/* <OrbitControls ref={controlsRef} makeDefault={false} enableDamping /> */}</>;
});
