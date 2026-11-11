// Turns the free-text program dates from data.json ("26th - 28th June 2026",
// "4th & 8th March 2026") into real dates so the site can show what's coming up.
// A program whose description lists sub-events ("20th Dec: Carol Night (6pm).")
// is split into one event per line.

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const monthIndex = (word) => MONTHS.indexOf(String(word).slice(0, 3).toLowerCase());

const EMOJI_RE = /(?:\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]|️|‍)/gu;

export function getEmoji(name = '') {
  const found = name.match(/(\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]{2})/u);
  return found ? found[0] : '';
}

export function cleanTitle(name = '') {
  return name.replace(EMOJI_RE, '').replace(/\s+20\d\d\b/, '').replace(/\s{2,}/g, ' ').trim();
}

// Returns { start, end } Date objects, or null when the text can't be read.
export function parseDateRange(text = '') {
  const yearMatch = text.match(/\b(20\d\d)\b/);
  const year = yearMatch ? Number(yearMatch[1]) : new Date().getFullYear();

  const days = [...text.matchAll(/\b(\d{1,2})(?:st|nd|rd|th)?\b(?!\d)/g)]
    .map((m) => Number(m[1]))
    .filter((d) => d >= 1 && d <= 31);
  const months = [...text.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b/gi)]
    .map((m) => monthIndex(m[1]));

  if (!days.length || !months.length) return null;

  const start = new Date(year, months[0], days[0]);
  const end = new Date(year, months[months.length - 1], days[days.length - 1], 23, 59);
  return { start, end: end < start ? start : end };
}

// Splits "6th Dec: Special Service (Dress Code: X). 20th Dec: Carol Night (6pm)." into items.
function splitSubEvents(program, year) {
  const re = /(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*:\s*([^.]+)/gi;
  const items = [...(program.description || '').matchAll(re)];
  if (items.length < 2) return null;

  return items.map((m, i) => {
    const raw = m[3].trim();
    const paren = raw.match(/\(([^)]*)\)\s*$/);
    const title = paren ? raw.slice(0, paren.index).trim() : raw;
    const detail = paren ? paren[1].trim() : '';
    const start = new Date(year, monthIndex(m[2]), Number(m[1]));
    return {
      id: `${program.id}_${i}`,
      parentId: program.id,
      title,
      detail,
      start,
      end: new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 59),
      emoji: getEmoji(program.name),
      venue: program.venue,
      time: /\d\s*(am|pm)/i.test(detail) ? detail : '',
    };
  });
}

export function expandPrograms(programs = []) {
  const events = [];
  programs.forEach((p) => {
    const range = parseDateRange(p.date);
    if (!range) return;
    const subs = splitSubEvents(p, range.start.getFullYear());
    if (subs) {
      events.push(...subs);
      return;
    }
    events.push({
      id: p.id,
      parentId: p.id,
      title: cleanTitle(p.name),
      detail: p.description || '',
      start: range.start,
      end: range.end,
      emoji: getEmoji(p.name),
      venue: p.venue,
      time: (p.time || '').replace(/\(?\s*Nig(?:eria)?\s*Time\s*\)?/gi, '').replace(/\s{2,}/g, ' ').trim(),
    });
  });
  return events.sort((a, b) => a.start - b.start);
}

export function upcomingEvents(programs, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return expandPrograms(programs).filter((e) => e.end >= today);
}

export function formatEventDate(event) {
  const opts = { weekday: 'short', day: 'numeric', month: 'short' };
  const startStr = event.start.toLocaleDateString('en-GB', opts);
  const sameDay = event.start.toDateString() === new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate()).toDateString();
  if (sameDay) return startStr;
  return `${event.start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${event.end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
}
