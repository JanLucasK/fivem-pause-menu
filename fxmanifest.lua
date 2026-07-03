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
    'nui/dist/fonts/*.woff2',
    'nui/dist/blips/*.png',
    -- Kartenkacheln (Atlas/Grid/Satellite), siehe README "Map-Tab" - leer bis
    -- echte Tiles unter nui/public/mapStyles/ abgelegt und gebaut wurden.
    'nui/dist/mapStyles/**/*',
}
