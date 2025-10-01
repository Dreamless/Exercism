export type Codon =
  | "AUG"
  | "UUU" | "UUC"
  | "UUA" | "UUG"
  | "UCU" | "UCC" | "UCA" | "UCG"
  | "UAU" | "UAC"
  | "UGU" | "UGC"
  | "UGG"
  | "UAA" | "UAG" | "UGA";

export type AminoAcid =
  | "Methionine"
  | "Phenylalanine"
  | "Leucine"
  | "Serine"
  | "Tyrosine"
  | "Cysteine"
  | "Tryptophan"
  | "STOP";

export type CodonMap = Record<AminoAcid, Codon[]>;

export function translate(rna: string = ""): string[] {
  const groupedCodonTable: CodonMap = {
    Methionine: ["AUG"],
    Phenylalanine: ["UUU", "UUC"],
    Leucine: ["UUA", "UUG"],
    Serine: ["UCU", "UCC", "UCA", "UCG"],
    Tyrosine: ["UAU", "UAC"],
    Cysteine: ["UGU", "UGC"],
    Tryptophan: ["UGG"],
    STOP: ["UAA", "UAG", "UGA"],
  };

  const codonTable: Record<string, AminoAcid> = {};
  for (const [aminoAcid, codons] of Object.entries(groupedCodonTable)) {
    for (const codon of codons) {
      codonTable[codon] = aminoAcid as AminoAcid;
    }
  }

  const result: string[] = [];

  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    const aminoAcid = codonTable[codon];

    if (codon.length < 3 || !aminoAcid) {
      throw new Error('Invalid codon');
    }

    if (aminoAcid === "STOP") break;

    result.push(aminoAcid);
  }

  return result;
}
