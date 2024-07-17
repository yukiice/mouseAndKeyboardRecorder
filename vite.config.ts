import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './', // 设置 base 为当前目录
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
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
