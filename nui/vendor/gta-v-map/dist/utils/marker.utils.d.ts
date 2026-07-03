import L from 'leaflet';
import type { GtaMarker, GtaMarkerEntry } from '../types/index.js';
/** Fallback group name when a marker has no explicit group. */
export declare const DEFAULT_MARKER_GROUP = "Markers";
/**
 * Creates or updates a marker entry.
 * If an entry with the same id exists, updates it in place and returns it.
 * Otherwise creates a new entry.
 *
 * @param entries - Mutable array of existing marker entries.
 * @param marker - The consumer-provided marker to upsert.
 * @returns The resolved entry and whether it was an update.
 */
export declare function upsertMarkerEntry(entries: GtaMarkerEntry[], marker: GtaMarker): {
    entry: GtaMarkerEntry;
    isUpdate: boolean;
};
/**
 * Updates a Leaflet marker's position, icon, and popup to match the entry.
 *
 * @param entry - The marker entry whose `_leaflet` instance should be updated.
 * @param createIcon - Factory that returns a Leaflet Icon for the given icon number.
 */
export declare function updateLeafletMarker(entry: GtaMarkerEntry, createIcon: (iconNum: number) => L.Icon): void;
//# sourceMappingURL=marker.utils.d.ts.map