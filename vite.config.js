import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@public": path.resolve("public"),
      "@assets": path.resolve("src/assets"),
      "@components": path.resolve("src/components"),
      "@hooks": path.resolve("src/hooks"),
      "@pages": path.resolve("src/pages"),
      "@redux": path.resolve("src/redux"),
      "@routes": path.resolve("src/routes"),
      "@schemas": path.resolve("src/schemas"),
      "@styles": path.resolve("src/styles"),
      "@utils": path.resolve("src/utils"),
    },
  },
});
