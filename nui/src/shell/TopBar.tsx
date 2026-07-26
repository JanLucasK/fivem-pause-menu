import { MapPin } from 'lucide-react';
import { BrandMark } from '../components/BrandMark';

interface TopBarProps {
  location: string;
}

export function TopBar({ location }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <BrandMark size={34} />
      </div>
      <div className="topbar-location">
        <MapPin size={14} />
        <span>{location}</span>
      </div>
    </header>
  );
}
