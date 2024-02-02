import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import path from "path";
import node from "@astrojs/node";

const __dirname = path.resolve();
// https://astro.build/config
export default defineConfig({
  alias: {
    "@components": "./src/components",
    "@assets": "./src/assets",
    "@styles": "./src/styles",
    "@layouts": "./src/layouts",
    "@store": "./src/store",
    "@hooks": "./src/hooks",
  },
  integrations: [vue({ appEntrypoint: "/src/pages/_app" })],
  vite: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "./src/components"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "api"),
        },
      },
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
