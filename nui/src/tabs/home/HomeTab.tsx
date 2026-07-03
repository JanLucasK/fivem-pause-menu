import type { MapStyle } from 'gta-v-map';
import type { HomeData, MapBlip, MapPlayerPosition } from '../../types';
import { MapPreviewCard } from './cards/MapPreviewCard';
import { CharacterCard } from './cards/CharacterCard';
import { FinanceCard } from './cards/FinanceCard';
import { ServerCard } from './cards/ServerCard';
import './homeTab.css';

interface HomeTabProps {
  data: HomeData;
  playerPosition: MapPlayerPosition;
  blips: MapBlip[];
  mapStyle: MapStyle;
  onOpenMap: () => void;
}

export function HomeTab({ data, playerPosition, blips, mapStyle, onOpenMap }: HomeTabProps) {
  return (
    <div className="home-tab">
      <div className="home-tab-main">
        <MapPreviewCard playerPosition={playerPosition} blips={blips} mapStyle={mapStyle} onOpenMap={onOpenMap} />
      </div>
      <div className="home-tab-side">
        <CharacterCard character={data.character} />
        <FinanceCard finance={data.finance} />
        <ServerCard server={data.server} />
      </div>
    </div>
  );
}
