// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from '@vitejs/plugin-react'
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  server: {
    port: process.env.PORT || 3563
  },
  build: {
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "StorageHub",
      // the proper extensions will be added
      fileName: "index"
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    react(),
    dts(),
    // legacy({
    //   "targets": {
    //     'ie': 9
    //   },
    // })
  ],
});
