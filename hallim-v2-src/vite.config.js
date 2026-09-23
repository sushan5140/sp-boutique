import { defineConfig } from "vite";
export default defineConfig({
  base: "/sp-boutique/hallim-v2/",
  esbuild: { jsx: "automatic" },
  build: { outDir: "../hallim-v2", emptyOutDir: true, sourcemap: false }
});
