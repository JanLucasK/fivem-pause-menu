import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface CardProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

// Gemeinsames Karten-Geruest fuer die Home-Seite. Neue Karten (z.B. spaetere
// "Letzte Aktivitaet") implementieren nur ihren Inhalt, nicht das Rahmen-Layout.
export function Card({ icon: Icon, eyebrow, title, children, footer }: CardProps) {
  return (
    <section className="hcard">
      <div className="hcard-head">
        <div className="hcard-icon">
          <Icon size={18} />
        </div>
        <div>
          <p className="hcard-eyebrow">{eyebrow}</p>
          <h3 className="hcard-title">{title}</h3>
        </div>
      </div>
      <div className="hcard-body">{children}</div>
      {footer && <div className="hcard-footer">{footer}</div>}
    </section>
  );
}
