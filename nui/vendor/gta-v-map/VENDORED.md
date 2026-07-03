# Vendored: gta-v-map

Source: https://github.com/RiceaRaul/gta-v-map-leaflet
Commit: `0d79130af6eca5b795fe87032ce21de17c66f800` (tag `2.0.1`)
License: MIT (see `LICENSE`)

`dist/` in this folder is the output of that repo's own `npm run build`
(`vite build && tsc --emitDeclarationOnly`), built locally and copied in as-is
- nothing here is hand-written. Vendored (instead of an `npm install
gta-v-map` from the registry) because the registry package wasn't the source
explicitly named for this integration; functionally identical, same commit.

`UPSTREAM-README.md` is the original repo's README (map style folder layout,
blip icon convention, coordinate notes).

## Updating

```
git clone https://github.com/RiceaRaul/gta-v-map-leaflet /tmp/gta-v-map-leaflet
cd /tmp/gta-v-map-leaflet && npm install && npm run build
cp -r dist <this-folder>/dist
```

Then bump the `version` in this folder's `package.json` and the commit hash
above.
