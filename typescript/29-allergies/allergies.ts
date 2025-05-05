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
  private readonly allergens: Allergen[];

  constructor(allergenIndex: number) {
    this.score = allergenIndex;

    this.allergens = [
      'eggs',
      'peanuts',
      'shellfish',
      'strawberries',
      'tomatoes',
      'chocolate',
      'pollen',
      'cats',
    ]
  }

  public list(): Allergen[] {
    const result: Allergen[] = [];
    for (let i = 0; i < this.allergens.length; i++) {
      if ((this.score & (1 << i)) !== 0) {
        result.push(this.allergens[i]);
      }
    }
    return result;
  }

  public allergicTo(allergen: Allergen): boolean {
    return (this.score & (1 << this.allergens.indexOf(allergen))) !== 0;
  }
}
