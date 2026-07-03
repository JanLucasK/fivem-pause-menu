import L from 'leaflet';
import type { GtaShape, GtaShapeEntry, ShapeLabel } from '../types/index.js';
/**
 * Normalizes a GtaShape into a full GtaShapeEntry with defaults applied.
 *
 * @param shape - The consumer-provided shape definition.
 * @returns A fully-resolved shape entry.
 */
export declare function createShapeEntry(shape: GtaShape): GtaShapeEntry;
/**
 * Upserts a shape entry into the entries array.
 *
 * @param entries - Mutable array of existing shape entries.
 * @param shape - The consumer-provided shape to upsert.
 * @returns The resolved entry and whether it was an update.
 */
export declare function upsertShapeEntry(entries: GtaShapeEntry[], shape: GtaShape): {
    entry: GtaShapeEntry;
    isUpdate: boolean;
};
/**
 * Computes the centroid (arithmetic mean) of a set of [x, y] points.
 *
 * @param points - Array of [x, y] coordinate pairs.
 * @returns The centroid as [x, y]. Returns [0, 0] for an empty array.
 */
export declare function computeCentroid(points: [number, number][]): [number, number];
/**
 * Creates a Leaflet DivIcon for a shape label at the centroid.
 *
 * @param label - Label configuration (text, color, font size, etc.).
 * @returns A zero-size DivIcon containing the styled label text.
 */
export declare function createLabelIcon(label: ShapeLabel): L.DivIcon;
//# sourceMappingURL=shape.utils.d.ts.map