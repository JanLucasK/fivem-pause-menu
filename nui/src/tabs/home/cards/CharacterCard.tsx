import { UserRound } from 'lucide-react';
import type { CharacterInfo } from '../../../types';
import { Card } from './Card';

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h ${rest}m`;
}

export function CharacterCard({ character }: { character: CharacterInfo }) {
  return (
    <Card icon={UserRound} eyebrow="Personal" title="Charakter">
      <p className="hcard-name">
        {character.firstName} {character.lastName}
      </p>
      <div className="hcard-row">
        <span>Job</span>
        <span>{character.job ?? 'Ohne Beschäftigung'}</span>
      </div>
      <div className="hcard-row">
        <span>Fraktion</span>
        <span>{character.faction ?? 'Keine Fraktion'}</span>
      </div>
      <div className="hcard-row">
        <span>Spielzeit</span>
        <span>{formatPlaytime(character.playtimeMinutes)}</span>
      </div>
    </Card>
  );
}
