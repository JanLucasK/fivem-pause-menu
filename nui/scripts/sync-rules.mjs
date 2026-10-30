// Spiegelt das Regelwerk der Homepage (neov-homepage/regelwerk.html) als JSON
// ins Menü. Die Homepage ist die einzige gepflegte Fassung; dieses Skript wird
// nach jeder Regeländerung ausgeführt und das Ergebnis mit committet:
//   node scripts/sync-rules.mjs [pfad/zu/regelwerk.html]
// Standard-Pfad: ../../neov-homepage/regelwerk.html (Repos nebeneinander).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(process.argv[2] ?? resolve(here, '../../../neov-homepage/regelwerk.html'));
const target = resolve(here, '../src/tabs/rules/regelwerk.json');
const html = readFileSync(source, 'utf8');

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '' };
const decode = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
const plain = (fragment) => decode(fragment.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

function fail(message) {
  console.error(`[sync-rules] ${message}`);
  process.exit(1);
}

// Eine Klausel darf mit einem fetten Stichwort beginnen ("<b>Freigabeverfahren:</b> ...").
function clause(fragment) {
  const lead = fragment.match(/^\s*<b>([\s\S]*?)<\/b>\s*/);
  if (!lead) return { text: plain(fragment) };
  return { lead: plain(lead[1]), text: plain(fragment.slice(lead[0].length)) };
}

const chapters = [];
for (const [, id, body] of html.matchAll(/<section class="rules-chapter" id="([^"]+)">([\s\S]*?)<\/section>/g)) {
  const title = plain(body.match(/<h2>([\s\S]*?)<\/h2>/)?.[1] ?? '');
  const rules = [];
  for (const [, ruleBody] of body.matchAll(/<details class="rule"[^>]*>([\s\S]*?)<\/details>/g)) {
    const number = plain(ruleBody.match(/<span class="rule__id">([\s\S]*?)<\/span>/)?.[1] ?? '');
    const titleHtml = ruleBody.match(/<span class="rule__t">([\s\S]*?)<span class="rule__short">([\s\S]*?)<\/span><\/span>/);
    const clausesHtml = ruleBody.match(/<ol class="rule__clauses">([\s\S]*?)<\/ol>/)?.[1] ?? '';
    const reviewNote = ruleBody.match(/<p class="rule__review-note">([\s\S]*?)<\/p>/)?.[1];
    if (!number || !titleHtml) fail(`Regel ohne Nummer oder Titel in Kapitel "${title}"`);
    rules.push({
      number,
      title: plain(titleHtml[1]),
      summary: plain(titleHtml[2]),
      clauses: [...clausesHtml.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, li]) => clause(li)),
      ...(reviewNote ? { reviewNote: plain(reviewNote) } : {}),
    });
  }
  chapters.push({ id, title, rules });
}

const charter = html.match(/<section id="geltung"[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?<ol>([\s\S]*?)<\/ol>/);
if (charter) {
  chapters.push({
    id: 'geltung',
    title: plain(charter[1]),
    rules: [],
    clauses: [...charter[2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, li]) => clause(li)),
  });
}

const ruleCount = chapters.reduce((sum, chapter) => sum + chapter.rules.length, 0);
const expected = (html.match(/<details class="rule"/g) ?? []).length;
if (ruleCount === 0 || ruleCount !== expected) fail(`${ruleCount} von ${expected} Regeln gelesen - Markup der Homepage geändert?`);
for (const chapter of chapters) {
  for (const rule of chapter.rules) {
    if (rule.clauses.length === 0) fail(`§ ${rule.number} hat keine Absätze`);
  }
}

const draftNote = html.match(/<p class="draft-note">([\s\S]*?)<\/p>/)?.[1];
const result = {
  source: 'https://neov.gg/regelwerk.html',
  draftNote: draftNote ? plain(draftNote) : null,
  chapters,
};
writeFileSync(target, `${JSON.stringify(result, null, 2)}\n`);
console.log(`[sync-rules] ${ruleCount} Regeln in ${chapters.length} Abschnitten -> ${target}`);
