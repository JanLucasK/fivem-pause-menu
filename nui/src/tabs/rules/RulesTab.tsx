import { useEffect, useRef, useState } from 'react';
import { OverlayView } from '../../shell/OverlayView';
import { SectionNav } from '../../shell/SectionNav';
import type { RuleClause, Rulebook } from '../../types';
import regelwerk from './regelwerk.json';
import './rulesTab.css';

// Gespiegelt aus neov-homepage/regelwerk.html (scripts/sync-rules.mjs) - die
// Homepage bleibt die einzige gepflegte Fassung.
const rulebook = regelwerk as Rulebook;
const ruleCount = rulebook.chapters.reduce((sum, chapter) => sum + chapter.rules.length, 0);
const chapterCount = rulebook.chapters.filter((chapter) => chapter.rules.length > 0).length;

interface RulesTabProps {
  onBack: () => void;
}

function Clauses({ clauses }: { clauses: RuleClause[] }) {
  return (
    <ol className="rules-clauses">
      {clauses.map((clause, index) => (
        <li key={index}>
          {clause.lead && <strong>{clause.lead} </strong>}
          {clause.text}
        </li>
      ))}
    </ol>
  );
}

// Ein Kapitel pro Ansicht: links die Kapitel (Pfeil hoch/runter), rechts die
// Regeln vollstaendig ausgeschrieben. Bild auf/ab scrollt das Kapitel.
export function RulesTab({ onBack }: RulesTabProps) {
  const [chapterId, setChapterId] = useState(rulebook.chapters[0].id);
  const mainRef = useRef<HTMLElement>(null);
  const chapter = rulebook.chapters.find((entry) => entry.id === chapterId) ?? rulebook.chapters[0];
  const chapterNumber = rulebook.chapters.indexOf(chapter) + 1;

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [chapterId]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const main = mainRef.current;
      if (!main || (event.key !== 'PageDown' && event.key !== 'PageUp')) return;
      event.preventDefault();
      main.scrollBy({ top: (event.key === 'PageDown' ? 1 : -1) * main.clientHeight * 0.8, behavior: 'smooth' });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <OverlayView
      title="Regelwerk"
      onBack={onBack}
      mainRef={mainRef}
      meta={
        <>
          <span>
            {ruleCount} Regeln in {chapterCount} Kapiteln
          </span>
          {rulebook.draftNote && (
            <span className="rules-draft" title={rulebook.draftNote}>
              Entwurf
            </span>
          )}
        </>
      }
      aside={
        <SectionNav
          label="Kapitel"
          items={rulebook.chapters.map((entry) => ({
            id: entry.id,
            label: entry.title,
            count: entry.rules.length || undefined,
          }))}
          activeId={chapter.id}
          onChange={setChapterId}
        />
      }
      prompts={[
        { keys: '↑ ↓', label: 'Kapitel' },
        { keys: 'BILD ↑ ↓', label: 'Blättern' },
      ]}
    >
      <article className="rules-chapter" key={chapter.id}>
        <header className="rules-chapter-head">
          <span className="hub-overline hub-overline--brass">
            {chapter.rules.length > 0 ? `Kapitel ${chapterNumber}` : 'OOC-Regeln für Neo V'}
          </span>
          <h2 className="rules-chapter-title">{chapter.title}</h2>
          {chapterNumber === 1 && rulebook.draftNote && <p className="rules-draft-note">{rulebook.draftNote}</p>}
        </header>

        {chapter.clauses && <Clauses clauses={chapter.clauses} />}

        {chapter.rules.map((rule) => (
          <section key={rule.number} className="rules-rule">
            <span className="rules-rule-number hub-mono">§ {rule.number}</span>
            <div className="rules-rule-body">
              <h3 className="rules-rule-title">{rule.title}</h3>
              <p className="rules-rule-summary">{rule.summary}</p>
              <Clauses clauses={rule.clauses} />
              {rule.reviewNote && <p className="rules-review-note">{rule.reviewNote}</p>}
            </div>
          </section>
        ))}

        <p className="rules-source">
          Quelle: <span className="hub-mono">{rulebook.source.replace(/^https?:\/\//, '')}</span>
        </p>
      </article>
    </OverlayView>
  );
}
