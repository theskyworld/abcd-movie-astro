import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  alias: {
    "@components": "./src/components",
    "@assets": "./src/assets",
    "@styles": "./src/styles",
    "@layouts": "./src/layouts",
  },
  integrations: [vue()],
  vite: {
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
});
