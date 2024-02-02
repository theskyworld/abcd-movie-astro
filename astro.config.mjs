import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  alias: {
    "@components": "./src/components",
    "@assets": "./src/assets",
    "@styles": "./src/styles",
  },
  integrations: [vue()],
});
