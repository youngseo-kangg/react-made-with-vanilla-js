import { defineConfig } from "vite";

export default defineConfig(() => ({
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  build: {
    outDir: "./dist",
    sourcemap: false
  },
  server: { port: 3000 }
}));
