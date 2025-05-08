export type Allergen =
  | 'eggs'
  | 'peanuts'
  | 'shellfish'
  | 'strawberries'
  | 'tomatoes'
  | 'chocolate'
  | 'pollen'
  | 'cats';

export class Allergies {
  public readonly score: number;
  public static allergens: Allergen[] = [
    'eggs',
    'peanuts',
    'shellfish',
    'strawberries',
    'tomatoes',
    'chocolate',
    'pollen',
    'cats',
  ];

  constructor(allergenIndex: number) {
    this.score = allergenIndex;
  }

  public list(): Allergen[] {
    const result: Allergen[] = [];
    for (let i = 0; i < Allergies.allergens.length; i++) {
      if ((this.score & (1 << i)) !== 0) {
        result.push(Allergies.allergens[i]);
      }
    }
    return result;
  }

  public allergicTo(allergen: Allergen): boolean {
    return (this.score & (1 << Allergies.allergens.indexOf(allergen))) !== 0;
  }
}

export function calculateScore(allergensSet: Set<Allergen>): number {
  let score = 0;

  for (let i = 0; i < Allergies.allergens.length; i++) {
    if (allergensSet.has(Allergies.allergens[i])) {
      score |= 1 << i;
    }
  }

  return score;
}

export function commonAllergies(alice: Allergies, bob: Allergies): Allergies {
  return new Allergies(alice.score & bob.score);
}
