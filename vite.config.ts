import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.GOOGLE_MAP_API_KEY": JSON.stringify(env.GOOGLE_MAP_API_KEY),
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      tsconfigPaths(),
      glsl({
        include: ["**/*.glsl", "**/*.vs", "**/*.fs"],
        exclude: undefined,
        warnDuplicatedImports: true,
        defaultExtension: "glsl",
        compress: false,
        watch: true,
        root: "/",
      }),
    ],
    server: {
      host: true,
      port: 3000,
    },
  };
});
