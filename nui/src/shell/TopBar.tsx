import { MapPin } from 'lucide-react';

interface TopBarProps {
  location: string;
}

export function TopBar({ location }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="topbar-brand-name">NEO</span>
        <span className="topbar-brand-suffix">V</span>
      </div>
      <div className="topbar-location">
        <MapPin size={14} />
        <span>{location}</span>
      </div>
    </header>
  );
}
