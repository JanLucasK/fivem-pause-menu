import L from 'leaflet';
/**
 * Creates a custom CRS for GTA V map coordinates.
 * Uses Object.assign intentionally — L.CRS.Simple is a Leaflet CRS object
 * that requires prototype chain preservation, which spread syntax cannot provide.
 */
export declare function createGtaCRS(): L.CRS;
//# sourceMappingURL=crs.utils.d.ts.map