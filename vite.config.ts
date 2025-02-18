import { defineConfig } from "vite";
import tsconfigPath from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(() => ({
  plugins: [tsconfigPath()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@react": path.resolve(__dirname, "./src/lib/react"),
      "@util": path.resolve(__dirname, "./src/lib/util") // "@util" 추가
    }
  },
  build: {
    outDir: "./dist",
    sourcemap: false
  },
  esbuild: {
    jsx: "transform",
    jsxDev: false, // "@react/jsx-dev-runtime" 미사용 관련 false 처리
    jsxFactory: "createElement",
    jsxImportSource: "@react/jsx-runtime",
    jsxInject: `import { createElement, React } from "@react/jsx-runtime"`
  },
  server: { port: 3000 }
}));
