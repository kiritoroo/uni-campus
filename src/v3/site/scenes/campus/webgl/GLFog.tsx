import { memo } from "react";

export const GLFog = memo(() => {
  return <fog attach="fog" args={["#e9e9e9", 0, 800]} />;
});
