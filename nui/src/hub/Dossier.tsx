import type { HomeData } from '../types';
import { identityLabel } from '../state/identityLabels';
import { initials } from './format';

interface DossierProps {
  data: HomeData;
  avatarUrl: string | null;
}

// Charakter-Dossier: Headshot, Overline, Name, Job-/Fraktions-Chips, Telefon.
export function Dossier({ data, avatarUrl }: DossierProps) {
  const { character } = data;
  const fullName = `${character.firstName} ${character.lastName}`.trim() || 'Unbekannt';
  const job = identityLabel(character.job, character.jobLabel);
  const faction = identityLabel(character.faction, character.factionLabel);

  return (
    <div className="hub-dossier">
      <div className="hub-avatar">
        {avatarUrl ? (
          <img className="hub-avatar-img" src={avatarUrl} alt="" />
        ) : (
          <span className="hub-avatar-initials">{initials(character.firstName, character.lastName)}</span>
        )}
        {character.serverId != null && <span className="hub-avatar-id hub-mono">ID {character.serverId}</span>}
      </div>
      <div className="hub-dossier-text">
        <span className="hub-overline hub-overline--brass">Charakter</span>
        <h1 className="hub-name">{fullName}</h1>
        <div className="hub-chips">
          <span className="hub-chip hub-chip--brass">{job ?? 'Ohne Job'}</span>
          <span className="hub-chip">{faction ?? 'Keine Fraktion'}</span>
          {character.phone && (
            <span className="hub-phone">
              Tel. <span className="hub-mono">{character.phone}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
