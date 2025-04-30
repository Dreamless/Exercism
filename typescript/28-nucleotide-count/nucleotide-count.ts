export function nucleotideCounts(dna: string): Record<'A' | 'C' | 'G' | 'T', number> {
  const nucleotides = { A: 0, C: 0, G: 0, T: 0 };

  for (const char of dna) {
    switch (char) {
      case 'A':
      case 'C':
      case 'G':
      case 'T':
        nucleotides[char]++;
        break;
      default:
        throw new Error('Invalid nucleotide in strand');
    }
  }

  return nucleotides;
}
