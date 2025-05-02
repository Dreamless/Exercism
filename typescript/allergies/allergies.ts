type Allergen =
  | 'eggs'
  | 'peanuts'
  | 'shellfish'
  | 'strawberries'
  | 'tomatoes'
  | 'chocolate'
  | 'pollen'
  | 'cats';

export class Allergies {
  private readonly score: number;
  private readonly allergenMap: Map<Allergen, number>;

  constructor(allergenIndex: number) {
    this.score = allergenIndex;

    this.allergenMap = new Map<Allergen, number>([
      ['eggs', 1],
      ['peanuts', 2],
      ['shellfish', 4],
      ['strawberries', 8],
      ['tomatoes', 16],
      ['chocolate', 32],
      ['pollen', 64],
      ['cats', 128],
    ]);
  }

  public list(): Allergen[] {
    const result: Allergen[] = [];
    for (const [allergen, value] of this.allergenMap) {
      if ((this.score & value) !== 0) {
        result.push(allergen);
      }
    }
    return result;
  }

  public allergicTo(allergen: Allergen): boolean {
    return !this.allergenMap.has(allergen) ||
           (this.allergenMap.get(allergen)! & this.score) !== 0;
  }
}
