import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CEF (FiveM) laedt die NUI-Page ohne Server -> relative Pfade statt Root-Pfade.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Importierte Assets als data:-URI einbetten statt als eigene Datei ausliefern.
    // Ausgelieferte Asset-Dateien kamen in FiveM nicht beim Client an (der Server hat
    // die Bytes nicht ins resource.rpf gepackt) - eingebettet kann nichts fehlen.
    // Betrifft nur importierte Assets; alles unter public/ (Fonts, Blips, Map-Tiles)
    // laeuft weiter als Datei.
    // 128 KiB: die Wortmarke (~34 KiB) lag ueber der alten 32-KiB-Grenze und
    // landete als eigene Datei in dist/assets/, die FiveM nicht ausliefert
    // (Broken-Image im Spiel). Alles Importierte bleibt so sicher im Bundle.
    assetsInlineLimit: 131072,
  },
});
