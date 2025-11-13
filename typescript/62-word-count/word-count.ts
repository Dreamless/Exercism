export function count(text: string): Map<string, number> {
  const lower = text.toLowerCase();
  const words: RegExpMatchArray | [] = lower.match(/[a-z0-9]+(?:'[a-z0-9]+)*/g) ?? [];

  const counts = new Map<string, number>();

  for (const word of words) {
    const current = counts.get(word) ?? 0;
    counts.set(word, current + 1);
  }

  return counts;
}
