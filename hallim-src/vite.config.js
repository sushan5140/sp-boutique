import { defineConfig } from "vite";
export default defineConfig({
  base: "/sp-boutique/hallim/",
  esbuild: { jsx: "automatic" },
  build: { outDir: "../hallim", emptyOutDir: true, sourcemap: false }
});
