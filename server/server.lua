-- Clientseitiges ExecuteCommand('disconnect'/'quit') ist fuer Ressourcen
-- gesperrt. Deshalb trennt der Server den Spieler, der es anfordert - und nur
-- diesen (source), damit das Event niemand anderen kicken kann.
RegisterNetEvent('neov-pause-menu:leaveServer', function()
    DropPlayer(source, 'Du hast den Server verlassen.')
end)
