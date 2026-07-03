import { Users } from 'lucide-react';
import type { ServerInfo } from '../../../types';
import { Card } from './Card';

export function ServerCard({ server }: { server: ServerInfo }) {
  return (
    <Card icon={Users} eyebrow="Status" title="Server">
      <div className="hcard-row">
        <span>Online</span>
        <span className="hcard-value">
          {server.onlinePlayers} / {server.maxPlayers}
        </span>
      </div>
      <div className="hcard-progress">
        <div
          className="hcard-progress-fill"
          style={{ width: `${Math.min(100, (server.onlinePlayers / server.maxPlayers) * 100)}%` }}
        />
      </div>
    </Card>
  );
}
