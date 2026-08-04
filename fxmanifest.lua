fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'neov-pause-menu'
author 'NeoV'
description 'Custom Pause-Menu (Home/Map/Settings/Keybinds/Discord/Exit)'
version '0.1.0'

client_scripts {
    'client/keybinds.lua',
    'client/settings.lua',
    'client/client.lua',
}

ui_page 'nui/dist/index.html'

files {
    'nui/dist/index.html',
    'nui/dist/assets/*.js',
    'nui/dist/assets/*.css',
    -- Bilder, die Vite in assets/ ablegt und hasht. Die SVG-Logomark bleibt unter
    -- assetsInlineLimit und landet als data:-URI im JS-Bundle; die Wortmarke (PNG)
    -- ist zu gross dafuer und wird eine echte Datei. Ohne diese Zeile liefert FiveM
    -- sie nicht aus und die Marke fehlt im Menue, ohne Fehlermeldung.
    'nui/dist/assets/*.png',
    'nui/dist/assets/*.svg',
    'nui/dist/assets/*.webp',
    'nui/dist/fonts/*.woff2',
    -- Kachel-Artwork (public/img/, z.B. NeoV-Logomark der Einstellungen-Kachel).
    'nui/dist/img/*',
    'nui/dist/blips/*.png',
    -- Kartenkacheln (Atlas/Grid/Satellite), siehe README "Map-Tab" - leer bis
    -- echte Tiles unter nui/public/mapStyles/ abgelegt und gebaut wurden.
    'nui/dist/mapStyles/**/*',
}
