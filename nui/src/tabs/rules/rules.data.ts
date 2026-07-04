import type { FaqEntry, RuleSection } from '../../types';

// Beispielhafter Inhalt - bitte an die tatsächlichen Serverregeln anpassen.
// Anders als Keybinds/Settings gibt es hier keine registrierende Resource,
// diese Liste wird direkt im Frontend gepflegt.
export const ruleSections: RuleSection[] = [
  {
    id: 'grundregeln',
    title: 'Grundregeln',
    paragraphs: [
      'Realismus geht vor Spielmechanik: Verhalte dich so, wie es deine Figur in der jeweiligen Situation tatsächlich tun würde.',
      'Kein Powergaming (anderen Spielern Handlungen aufzwingen, gegen die sie sich nicht wehren können) und kein Metagaming (Wissen aus OOC-Quellen wie Discord oder Streams ohne IC-Grund verwenden).',
      'New-Life-Rule: Nach dem Tod deiner Figur erinnert sie sich nicht an die Umstände, die zum Tod geführt haben.',
      'Fail-RP (unrealistisches, spielunterbrechendes Verhalten) ist zu vermeiden - das gilt insbesondere für Situationen mit anderen Spielern.',
    ],
  },
  {
    id: 'kommunikation',
    title: 'Kommunikation',
    paragraphs: [
      'Der OOC-Chat ist für kurze organisatorische Hinweise gedacht, nicht für Rollenspiel-relevante Absprachen.',
      'Stream-Sniping (das gezielte Verfolgen von Streams anderer Spieler, um Vorteile zu erlangen) ist nicht gestattet.',
      'Behandle andere Spieler und das Serverteam respektvoll - auch dann, wenn eine Situation In-Character eskaliert.',
    ],
  },
  {
    id: 'konsequenzen',
    title: 'Verstöße & Konsequenzen',
    paragraphs: [
      'Regelverstöße werden je nach Schwere mit Verwarnung, temporärem Kick oder Bann geahndet.',
      'Wiederholte Verstöße führen zu stärkeren Konsequenzen, unabhängig vom Einzelfall.',
      'Entscheidungen des Serverteams lassen sich über ein Ticket im Discord anfechten.',
    ],
  },
];

export const faqEntries: FaqEntry[] = [
  {
    id: 'melden',
    question: 'Wie melde ich einen Regelverstoß?',
    answer: 'Eröffne ein Ticket im Discord-Server (Link über die Discord-Aktion in der Seitenleiste) mit Beschreibung, Zeitpunkt und möglichst einem Beweis (Clip/Screenshot).',
  },
  {
    id: 'new-life-rule',
    question: 'Was genau bedeutet die New-Life-Rule?',
    answer: 'Stirbt deine Figur, gilt der Vorfall danach als vergessen - du darfst weder Täter noch Umstände des Vorfalls weiter verfolgen oder dich daran "erinnern".',
  },
  {
    id: 'charaktername',
    question: 'Darf ich meinen Charakter frei umbenennen?',
    answer: 'Namensänderungen sind über ein Support-Ticket möglich, aber nicht ohne Grund beliebig oft - wende dich dafür an das Serverteam.',
  },
  {
    id: 'discord',
    question: 'Wo finde ich den Discord-Server?',
    answer: 'Über die Discord-Aktion unten in der Seitenleiste - sie öffnet den offiziellen Server-Discord in deinem Browser.',
  },
];
