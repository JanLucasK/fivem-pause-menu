interface SliderRowProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function SliderRow({ label, value, min = 0, max = 100, onChange }: SliderRowProps) {
  return (
    <label className="settings-row">
      <span className="settings-row-label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="settings-row-value">{value}</span>
    </label>
  );
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <label className="settings-row settings-row--toggle">
      <span className="settings-row-label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle-switch ${checked ? 'checked' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle-switch-knob" />
      </button>
    </label>
  );
}
