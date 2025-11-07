export function isIsogram(word: string): boolean {
  const cleaned = word.toLowerCase().replace(/[-\s]/g, '');
  const uniqueLetters = new Set(cleaned);

  return uniqueLetters.size === cleaned.length;
}
