// JSX-Typisierung fuer das <gta-v-map>-Custom-Element. Nicht Teil des
// vendorten dist/-Outputs (siehe nui/vendor/gta-v-map/VENDORED.md), daher
// hier nachgebildet (Quelle: src/jsx.d.ts im Original-Repo).
import type { GtaVMap } from 'gta-v-map';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gta-v-map': React.DetailedHTMLProps<React.HTMLAttributes<GtaVMap>, GtaVMap> & {
        zoom?: string | number;
        'default-style'?: string;
        'tile-base-url'?: string;
        'blips-url'?: string;
        'show-layer-control'?: boolean;
        'show-heatmap'?: boolean;
        'place-mode'?: boolean;
        'disable-clustering'?: boolean;
        'min-zoom'?: string | number;
        'max-zoom'?: string | number;
        'max-bounds'?: string;
        'max-bounds-viscosity'?: string | number;
        'leaflet-css-url'?: string;
        markers?: string;
        shapes?: string;
      };
    }
  }
}
