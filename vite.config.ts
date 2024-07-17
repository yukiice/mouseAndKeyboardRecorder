import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath, URL} from 'url'

export default defineConfig({
  plugins: [react()],
  base: './', // 设置 base 为当前目录
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['electron'],
      output: {
        globals: {
          electron: 'require("electron")'
        }
      }
    }
  }
});
