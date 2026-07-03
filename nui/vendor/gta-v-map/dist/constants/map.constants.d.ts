import type { MapStyle, LatLngBoundsTuple } from '../types/index.js';
/** Default configuration values for the map component. */
export declare const DEFAULT_MAP_CONFIG: {
    readonly zoom: 3;
    readonly minZoom: 1;
    readonly maxZoom: 5;
    readonly center: [number, number];
    readonly maxBounds: LatLngBoundsTuple;
    readonly maxBoundsViscosity: 1;
    readonly tileBaseUrl: "mapStyles";
    readonly blipsUrl: "blips";
    readonly defaultStyle: MapStyle;
};
//# sourceMappingURL=map.constants.d.ts.map