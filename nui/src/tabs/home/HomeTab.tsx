import type { HomeData } from '../../types';
import { MapPreviewCard } from './cards/MapPreviewCard';
import { CharacterCard } from './cards/CharacterCard';
import { FinanceCard } from './cards/FinanceCard';
import { ServerCard } from './cards/ServerCard';
import './homeTab.css';

interface HomeTabProps {
  data: HomeData;
  onOpenMap: () => void;
}

export function HomeTab({ data, onOpenMap }: HomeTabProps) {
  return (
    <div className="home-tab">
      <div className="home-tab-main">
        <MapPreviewCard onOpenMap={onOpenMap} />
      </div>
      <div className="home-tab-side">
        <CharacterCard character={data.character} />
        <FinanceCard finance={data.finance} />
        <ServerCard server={data.server} />
      </div>
    </div>
  );
}
