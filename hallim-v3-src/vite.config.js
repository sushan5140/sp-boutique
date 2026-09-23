import { defineConfig } from "vite";
export default defineConfig({
  base: "/sp-boutique/hallim-v3/",
  esbuild: { jsx: "automatic" },
  build: { outDir: "../hallim-v3", emptyOutDir: true, sourcemap: false }
});
