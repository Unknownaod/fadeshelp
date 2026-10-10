// Pure search helpers, safe to use on both server and client.

export function tokenize(query) {
  return String(query || "")
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}'-]/gu, ""))
    .filter(Boolean);
}

export function scoreItem(item, words) {
  const title = item.title.toLowerCase();
  const kind = (item.kind || "").toLowerCase();
  const text = (item.text || "").toLowerCase();
  let total = 0;

  for (const w of words) {
    let s = 0;
    if (title === w) s += 12;
    if (title.startsWith(w)) s += 6;
    if (title.includes(w)) s += 5;
    if (kind.includes(w)) s += 2;
    if (text.includes(w)) s += 1;
    if (s === 0) return 0; // every word must match somewhere
    total += s;
  }

  return total;
}

export function searchItems(items, query, limit = 8) {
  const words = tokenize(query);
  if (!words.length) return [];

  return items
    .map((item) => ({ item, score: scoreItem(item, words) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
