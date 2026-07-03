import type { MapStyle, TileConfig } from '../types/index.js';
/** Zoom range, file extension, and folder name for each map style. */
export declare const TILE_CONFIGS: Record<MapStyle, Omit<TileConfig, 'url'>>;
/** Human-readable labels shown in the layer control for each style. */
export declare const STYLE_LABELS: Record<MapStyle, string>;
/** Ordered list of all available map styles. */
export declare const MAP_STYLES: readonly MapStyle[];
//# sourceMappingURL=tile.constants.d.ts.map