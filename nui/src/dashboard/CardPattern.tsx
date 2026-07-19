// Dezente, thematische SVG-Hintergründe für die Aktions-Kacheln, damit die große
// Fläche nicht leer wirkt. Bewusst monochrom (Messing) + niedrige Deckkraft (CSS),
// als reine Deko hinter dem Karteninhalt (aria-hidden, pointer-events: none).

interface CardPatternProps {
  kind: 'map' | 'settings';
}

// Höhenlinien (Topografie) + eine gestrichelte Route mit Zielpunkt → "Karte".
function MapPattern() {
  return (
    <g stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
      <path d="M-20 70 C 60 40 120 96 200 74 S 360 44 430 78" />
      <path d="M-20 112 C 70 84 130 142 210 118 S 360 88 430 122" />
      <path d="M-20 154 C 60 128 128 186 205 162 S 360 132 430 168" />
      <path d="M-20 198 C 70 170 132 228 214 204 S 360 174 430 210" />
      <path d="M-20 242 C 60 216 128 272 205 248 S 360 218 430 254" />
      <path d="M64 252 L 150 172 L 240 202 L 332 98" strokeDasharray="5 8" strokeWidth={1.7} />
      <circle cx={332} cy={98} r={7} />
      <circle cx={332} cy={98} r={2.6} fill="currentColor" stroke="none" />
    </g>
  );
}

// Zwei ineinandergreifende Zahnräder → "Einstellungen".
function Gear({ cx, cy, r, teeth }: { cx: number; cy: number; r: number; teeth: number }) {
  const spokes = Array.from({ length: teeth }, (_, i) => {
    const a = (i / teeth) * Math.PI * 2;
    return {
      x1: cx + Math.cos(a) * r,
      y1: cy + Math.sin(a) * r,
      x2: cx + Math.cos(a) * (r + 9),
      y2: cy + Math.sin(a) * (r + 9),
    };
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r * 0.44} />
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
      ))}
    </g>
  );
}

function SettingsPattern() {
  return (
    <g stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <Gear cx={302} cy={112} r={58} teeth={12} />
      <Gear cx={206} cy={214} r={38} teeth={10} />
    </g>
  );
}

export function CardPattern({ kind }: CardPatternProps) {
  return (
    <svg
      className="action-card-pattern"
      viewBox="0 0 400 300"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {kind === 'map' ? <MapPattern /> : <SettingsPattern />}
    </svg>
  );
}
