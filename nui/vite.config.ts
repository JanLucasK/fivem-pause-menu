import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CEF (FiveM) laedt die NUI-Page ohne Server -> relative Pfade statt Root-Pfade.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
