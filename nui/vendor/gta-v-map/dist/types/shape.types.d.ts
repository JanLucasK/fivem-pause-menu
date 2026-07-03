import type L from 'leaflet';
/** Configuration for a text label displayed at a shape's centroid. */
export interface ShapeLabel {
    text: string;
    className?: string;
    fontSize?: number;
    color?: string;
}
/** Input shape definition provided by the consumer. */
export interface GtaShape {
    type: 'polyline' | 'polygon';
    points: [number, number][];
    color?: string;
    weight?: number;
    opacity?: number;
    fillColor?: string;
    fillOpacity?: number;
    popup?: string;
    group?: string;
    id?: string;
    label?: ShapeLabel;
}
/** Internal shape entry with defaults applied and optional Leaflet instances. */
export interface GtaShapeEntry extends Required<Pick<GtaShape, 'type' | 'points' | 'id' | 'group'>> {
    color: string;
    weight: number;
    opacity: number;
    fillColor: string;
    fillOpacity: number;
    popup?: string;
    label?: ShapeLabel;
    _leaflet?: L.Polyline | L.Polygon;
    _labelMarker?: L.Marker;
}
/** Default style values applied to shapes when the consumer omits them. */
export declare const SHAPE_DEFAULTS: {
    readonly color: "#3388ff";
    readonly weight: 3;
    readonly opacity: 1;
    readonly fillColor: "#3388ff";
    readonly fillOpacity: 0.2;
    readonly group: "Shapes";
};
//# sourceMappingURL=shape.types.d.ts.map