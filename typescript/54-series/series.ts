export class Series {
  private digits: string;

  constructor(input: string) {
    if (!/^\d*$/.test(input)) {
      throw new Error('Input must contain only digits');
    }

    this.digits = input;
  }

  slices(length: number): number[][] {
    if (length === 0) {
      throw new Error('slice length cannot be zero');
    }

    if (this.digits.length === 0) {
      throw new Error('series cannot be empty');
    }

    if (length < 0) {
      throw new Error('slice length cannot be negative');
    }

    if (length > this.digits.length) {
      throw new Error('slice length cannot be greater than series length');
    }

    const result: number[][] = [];

    for (let i = 0; i <= this.digits.length - length; i++) {
      const sliceString = this.digits.slice(i, i + length);
      const slice = Array.from(sliceString, Number);
      result.push(slice);
    }

    return result;
  }
}
