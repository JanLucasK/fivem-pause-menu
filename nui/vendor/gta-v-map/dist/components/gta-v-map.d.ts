import { LitElement, type PropertyValues } from 'lit';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.heat';
import type { GtaMarker, GtaMarkerEntry, GtaShape, GtaShapeEntry, MapStyle, LatLngBoundsTuple } from '../types/index.js';
/**
 * `<gta-v-map>` -- a Lit web component that renders an interactive GTA V map
 * using Leaflet with support for markers, shapes, heatmaps, and layer controls.
 *
 * @fires map-ready - Emitted once the Leaflet map is initialized.
 * @fires map-click - Emitted when the map background is clicked.
 * @fires marker-click - Emitted when a marker is clicked.
 * @fires marker-placed - Emitted in place-mode when a position is selected.
 */
export declare class GtaVMap extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    /** URL to the Leaflet CSS stylesheet. Override to use a local copy. */
    leafletCssUrl: string;
    private _crs?;
    /** Custom Leaflet CRS. When unset, the built-in GTA V CRS is used. */
    get crs(): L.CRS | undefined;
    set crs(value: L.CRS | undefined);
    /** Base URL path for tile image folders. */
    tileBaseUrl: string;
    /** Override URL template for the satellite tile layer. */
    satelliteUrl?: string;
    /** Override URL template for the atlas tile layer. */
    atlasUrl?: string;
    /** Override URL template for the grid tile layer. */
    gridUrl?: string;
    /** Active map style (satellite, atlas, or grid). */
    defaultStyle: MapStyle;
    /** Current zoom level. */
    zoom: number;
    /** Minimum allowed zoom level. */
    minZoom: number;
    /** Maximum allowed zoom level. */
    maxZoom: number;
    /** Optional bounding box that restricts panning. Set to null to disable. */
    maxBounds: LatLngBoundsTuple | null;
    /** How strongly the map snaps back when dragged beyond max bounds (0..1). */
    maxBoundsViscosity: number;
    /** Base URL path for blip icon sprites (e.g. `blips/1.png`). */
    blipsUrl: string;
    /** When true, displays a Leaflet layer control for toggling base layers and overlays. */
    showLayerControl: boolean;
    /** When true, markers are added to plain layer groups instead of MarkerClusterGroups. */
    disableClustering: boolean;
    /** When true, clicking the map emits a `marker-placed` event with the clicked coordinates. */
    placeMode: boolean;
    /** Declarative list of markers. Changes trigger a full re-sync. */
    markers: GtaMarker[];
    /** Declarative list of shapes. Changes trigger a full re-sync. */
    shapes: GtaShape[];
    /** When true, renders a heatmap layer derived from all marker positions. */
    showHeatmap: boolean;
    private _map?;
    private readonly _markerEntries;
    private readonly _shapeEntries;
    private readonly _overlayGroups;
    private _tileLayers;
    private _layerControl?;
    private _heatLayer?;
    /**
     * Adds or updates a marker on the map.
     * @param marker - Marker definition to add or update.
     * @returns The marker's unique id.
     */
    addMarker(marker: GtaMarker): string;
    /**
     * Removes a marker by id.
     * @param id - The marker's unique id.
     * @returns `true` if the marker was found and removed.
     */
    removeMarker(id: string): boolean;
    /** Returns a snapshot of all marker entries (without internal Leaflet references). */
    getMarkers(): ReadonlyArray<Omit<GtaMarkerEntry, '_leaflet'>>;
    /** Removes all markers from the map. */
    clearMarkers(): void;
    /**
     * Adds or updates a shape on the map.
     * @param shape - Shape definition to add or update.
     * @returns The shape's unique id.
     */
    addShape(shape: GtaShape): string;
    private _removeShapeFromGroup;
    /**
     * Removes a shape by id.
     * @param id - The shape's unique id.
     * @returns `true` if the shape was found and removed.
     */
    removeShape(id: string): boolean;
    /** Returns a snapshot of all shape entries (without internal Leaflet references). */
    getShapes(): ReadonlyArray<Omit<GtaShapeEntry, '_leaflet' | '_labelMarker'>>;
    /** Removes all shapes from the map. */
    clearShapes(): void;
    render(): import("lit-html").TemplateResult<1>;
    private _onCssLoad;
    firstUpdated(): void;
    private _initMap;
    updated(changed: PropertyValues): void;
    private _bindMapEvents;
    private _getOrCreateOverlayGroup;
    private _resolveTileUrl;
    private _buildTileLayers;
    private _switchTileLayer;
    private _addLayerControl;
    private _rebuildLayerControl;
    private _toggleLayerControl;
    private _createIcon;
    private _addLeafletMarker;
    private _syncMarkers;
    private _addLeafletShape;
    private _syncShapes;
    private _getHeatmapData;
    private _enableHeatmap;
    private _disableHeatmap;
    private _updateHeatmap;
    private _dispatch;
}
declare global {
    interface HTMLElementTagNameMap {
        'gta-v-map': GtaVMap;
    }
}
//# sourceMappingURL=gta-v-map.d.ts.map