import { HelpCircle, ScrollText } from 'lucide-react';
import type { FaqEntry, RuleSection } from '../../types';
import './rulesTab.css';

interface RulesTabProps {
  sections: RuleSection[];
  faq: FaqEntry[];
}

export function RulesTab({ sections, faq }: RulesTabProps) {
  return (
    <div className="rules-tab">
      <section className="rules-block">
        <h3 className="rules-block-title">
          <ScrollText size={16} />
          <span>Serverregeln</span>
        </h3>
        <div className="rules-sections">
          {sections.map((section) => (
            <article key={section.id} className="rules-section">
              <h4 className="rules-section-title">{section.title}</h4>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="rules-section-text">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="rules-block">
        <h3 className="rules-block-title">
          <HelpCircle size={16} />
          <span>Häufige Fragen</span>
        </h3>
        <div className="rules-faq-list">
          {faq.map((entry) => (
            <div key={entry.id} className="rules-faq-item">
              <p className="rules-faq-question">{entry.question}</p>
              <p className="rules-faq-answer">{entry.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
