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

export type CodonMap = Map<AminoAcid, Codon[]>;

export function translate(rna: string): string[] {
  const groupedCodonTable: CodonMap = new Map([
    ["Methionine", ["AUG"]],
    ["Phenylalanine", ["UUU", "UUC"]],
    ["Leucine", ["UUA", "UUG"]],
    ["Serine", ["UCU", "UCC", "UCA", "UCG"]],
    ["Tyrosine", ["UAU", "UAC"]],
    ["Cysteine", ["UGU", "UGC"]],
    ["Tryptophan", ["UGG"]],
    ["STOP", ["UAA", "UAG", "UGA"]],
  ]);

  const codonTable = new Map<Codon, AminoAcid>;
  for (const [aminoAcid, codons] of groupedCodonTable) {
    for (const codon of codons) {
      codonTable.set(codon, aminoAcid)
    }
  }

  const result: string[] = [];

  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    const aminoAcid = codonTable.get(codon as Codon);

    if (codon.length < 3 || !aminoAcid) {
      throw new Error('Invalid codon');
    }

    if (aminoAcid === "STOP") break;

    result.push(aminoAcid);
  }

  return result;
}
